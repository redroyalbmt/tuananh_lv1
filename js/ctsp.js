$(document).ready(function () {
    logout();
    getData();

});
var w = window.innerWidth;
const api = 'https://students.trungthanhweb.com/api/';
const imageURL = 'https://students.trungthanhweb.com/images/';
const params = new URLSearchParams(window.location.search);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
//   get data
function getData(){
    $("#logoutbtn").hide();
    if (localStorage.getItem('token') && localStorage.getItem('token') != null) {
        $("#loginBtn").hide();
        $("#logoutbtn").show();
        
        if(!params.has('id')){
            window.location.replace('index.html');
        }
        var id=params.get('id');
       $.ajax({
        type: "GET",
        url: api+'single',
        data: {
            apitoken:localStorage.getItem('token'),
            id:id
        },
        dataType: "JSON",
        success: function (res) {
            const brands = res.brands;
            const categrories = res.categrories;
            if (brands.length > 0) {
                var str = ``;
                brands.forEach(el => {
                    str += `
                        <li><a class="dropdown-item" href="brands.html?id=`+el.id+`">`+ el.name + `</a></li>
                        `
                });
                $("#brandsUL").html(str);
            }
            if (categrories.length > 0) {
                var str = ``;
                categrories.forEach(el => {
                    str += `
                        <li><a class="dropdown-item" href="categrories.html?id=`+el.id+`">`+ el.name + `</a></li>
                        `
                });
                $("#cateUL").html(str);
            }
            const gallery= res.gallery;
            var str=``;
            gallery.forEach(el => {
                str=`
                <div class="item"><img class="pointer sliderimage" src="`+el+`" alt=""><div>
                `;
                $("#carousel").append(str);
            });
            const products=res.products[0];
            var image=imageURL+products.images;
            $("#productImage").attr("src",image);
            const name = products.name;
            //Giá = Giá * (100-discount) %;
            const price =  Intl.NumberFormat('en-US').format((products.price*(100-products.discount)/100));
            const discount= products.discount +" %";
            const brand = products.brandname;
            const cate = products.catename;
            $("#productname").html(name);
            $("#discount").text(discount);
            $("#price").text(price);
            $("#catename").text(cate);
            $("#brandname").text(brand);
            sliderImageChange();
            const content = products.content;
            $("#content").html(content);
            //Đi lấy sản phẩm cùng loại
            const cateProducts = res.cateproducts;
            const brandproducts = res.brandproducts;
            var str=``;
            cateProducts.forEach(el => {
                str=`
                <div class="item">
                        <div class="card" style="width: 100%; box-shadow: 1px 1px 1px 1px rgb(130, 130, 130);
                 
                        margin-bottom: 20px;
                        border-radius: 7px;">
                        <a href="ctsp.html?id=`+ el.id + `">    
                            <img class="pt-2" style="height: auto;
                            width: 100%;
                      
                            margin: 0px auto;" src="`+(imageURL+el.image)+`" alt="">
                            </a>
                            <div class="card-body">
                            <div class="card-content">
                            <h5 class="card-title">`+el.name+`</h5>
                            <p class="card-text">`+ Intl.NumberFormat('en-US').format(el.price)+`</p>
                            </div>
                            <a href="ctsp.html?id=`+ el.id + `" class="btn btn-primary">Chi tiết</a>

                            </div>
                          </div>
                </div>
                `;
                $("#sameCateProduct").append(str);
            });
            brandproducts.forEach(el => {
                str=`
                <div class="item">
                        <div class="card" style="width: 100%; box-shadow: 1px 1px 1px 1px rgb(130, 130, 130);
                 
                        margin-bottom: 20px;
                        border-radius: 7px; ">
                        <a href="ctsp.html?id=`+ el.id + `">    
                        <img class="pt-2" style="height: auto;
                        width: 100%;
                        margin: 0px auto;" src="`+(imageURL+el.image)+`" alt="">
                        </a>
                            <div class="card-body">
                              <div class="card-content">
                              <h5 class="card-title">`+el.name+`</h5>
                              <p class="card-text">`+ Intl.NumberFormat('en-US').format(el.price)+`</p>
                              <a href="ctsp.html?id=`+ el.id + `" class="btn btn-primary">Chi tiết</a>
                              </div>
                            </div>
                          </div>
                </div>
                `;
                $("#sameBrandProduct").append(str);
            });
            const contentHeight=$(".contentrow")[0].offsetHeight;
            var height=300;
            $("#content").css("height",height+'px');
            $("#content").css('overflow','hidden');
            $("#xemThem").click(function (e) { 
                e.preventDefault();
                $("#content").css("height",contentHeight+'px');
                $("#xemThem").hide();
            });
            Owl();
            addToCart();
        }
       });


    }
}
//   slider

function sliderImageChange(){
    $('.sliderimage').click(function (e) { 
        e.preventDefault();
        var src = $(this).attr('src');
        $("#productImage").attr("src",src);
    });
}
//  owl

function Owl(){
    $('#carousel').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass:true,
        items:1 ,
        responsive:{
            0:{
                items:3
            },
            1200:{
                items:4
            },


        }
        
    })
    $('#sameCateProduct').owlCarousel({
        loop:true,
        margin:20,

        responsiveClass:true,
        items:6,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
        
    })
    $('#sameBrandProduct').owlCarousel({
        loop:true,
        margin:20,
        responsiveClass:true,
        items:6, 
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
        
    })
}
// addtocart
function addToCart(){
    $("#addTocartBtn").click(function (e) { 
        e.preventDefault();
        var id=params.get('id');

        if(localStorage.getItem('cart')&&localStorage.getItem('cart')!=null){
            var cart =localStorage.getItem('cart');
            var arr = JSON.parse(cart);
        }else{
            var arr=[];
        }
        var check=false;
        arr.forEach(el => {
            if(el[0]==id){
              
                el[1]++;
                check=true;
            }
        });
        if(check==false){
            var item=[id,1];
            arr.push(item);
        }
        localStorage.setItem('cart',JSON.stringify(arr));
        Toast.fire({
            icon: 'success',
            title: 'Đã thêm thành công'
          
        });
    });
}

//123

// log out
function logout() {

    if (!localStorage.getItem("token") && localStorage.getItem("token") == null) {
      $("#logoutbtn").hide();
      $("#showmorebtn").hide();
    } else {
      $("#loginbtn").hide();
    }
    $("#logoutbtn").click(function (e) {
      
      e.preventDefault();;
      if (!localStorage.removeItem("token") && localStorage.removeItem("token") == null) {
        localStorage.removeItem('token');
        Toast.fire({
          icon: 'success',
          title: 'Tạm Biệt',
        }).then(() => {
            window.location.assign("index.html");
        });
    
      }
    });
    }
  