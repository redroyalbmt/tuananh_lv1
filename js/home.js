$(document).ready(function () {
    login();getData();loadData();showMore();
  
});
const url= "https://students.trungthanhweb.com/api/";
const urlimage= "https://students.trungthanhweb.com/images/";
var link = url+'home';

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

function login(){
    $("#loginbtn").click(function (e) { 
        e.preventDefault();
        $("#LoginModal").modal('show')
        $("#submitloginbtn").click(function (e) { 
            e.preventDefault();
            var email=$("#email").val().trim() ;
            if(email==``){
                Toast.fire({
                    icon: 'error',
                    title: 'chưa nhập email'
                  })
            }else{
                $.ajax({
                    type: "post",
                    url: "https://students.trungthanhweb.com/api/checkLoginhtml",
                    data:{
                        email:email,
                    },
                    dataType: "JSON",
                    success: function (res) {
                        if(res.check==true){
                            localStorage.setItem('token',res.apitoken);
                            Toast.fire({
                                icon: 'success',
                                title: 'Đăng nhập thành công'
                              }).then(()=>{
                                    window.location.reload();
                              })
                        }else{
                            Toast.fire({
                                icon: 'Error',
                                title: 'Tài khoản chưa được đăng kí'
                              })
                        }
                    }
                });
            }
          
        });
    });
}
// function loadData(){
//     $("#logoutbtn").hide();
//     if(localStorage.getItem('token') && localStorage.getItem('token') !=null){
//         $("#loginbtn").hide();
//         $("#logoutbtn").show();
//         $("#showmorebtn").click(function (e) { 
//             e.preventDefault();
//             showMore();
            
//         });
//     }
// }
function getData(){
    
    $.ajax({
        type: "GET",
        url: url+"home",
        // tuong duong nhu url
        data: {
            apitoken:localStorage.getItem('token')
        },
        dataType: "JSON",
        success: function (res) {
            console.log(res.products.data);
            if(res.categrories.length>0){
                var str=``;
                res.categrories.forEach(el => {
                    str+=`
                    <li><a class="dropdown-item" href="#">`+el.name+`</a></li>
  
                    `
                });
                $("#loaispUL").html(str);
                str=``;
                res.brands.forEach(el => {
                    str+=`
                    <li><a class="dropdown-item" href="#">`+el.name+`</a></li>
  
                    `
                });
                $("#brandsUL").html(str);
            }
            if(res.products.data.length>0){
                var str=``;
                res.products.data.forEach(el => {
                    str+=`
                    <div class="col-md-3">
                    <div class="card" style="width: 18rem;">
                      <img src="`+urlimage+el.images+`" class="card-img-top" alt="...">
                      <div class="card-body productinfo">
                        <h5 class="card-title">`+el.name+`</h5>
                        <span class="card-text"> `+el.name+`</span><br>
                        <span class="card-text">Giá :`+Intl.NumberFormat('en-US').format(Number(el.price))+`</span><br>
                        <span class="card-text">Thương Hiệu :`+el.brandname+`</span><br><br>
                        <a href="#" class="btn btn-primary">Xem Thêm</a>
                        <a href="#" class="btn btn-warning ms-3">Đặt Hàng</a>
                      </div>
                    </div>
                  </div>

                    `;
                });
                $("#productfetch").html(str);
            }
        }
    });
}
function showMore(){
    $.ajax({
        type: "GET",
        url: link,
        data: {
            apitoken:localStorage.getItem('token'),
        },
        dataType: "JSON",
        success: function (res) {
            const brands=res.brands;
            const categrories=res.categrories;
            const products = res.products.data;
            if(brands.length>0){
                var str=``;
                brands.forEach(el => {
                    str +=`
                    <li><a class="dropdown-item" href="brands.html?id=`+el.id+`">`+el.name+`</a></li>
                    `
                });
                $("#brandUL").html(str);
            }
            if(categrories.length > 0){
                var str =``;
                categrories.forEach(el => {
                    str +=`
                    <li><a class="dropdown-item" href="categrories.html?id=`+el.id+`">`+el.name+`</a></li>
                    `
                });
                $("#cateUL").html(str);
            }
            if(products.length >0){
                var str=``;
                products.forEach(el => {
                    str+=`
                    <div class="col-md-3">
                    <div class="card" style="width: 100%;">
                      <img class="productImage" src="https://students.trungthanhweb.com/images/"`+el['images']+`">
                      <div class="card-body ">
                      <a href="#">
                        <h5 class="card-title">`+el.name+`</h5></a>
                     
                        <p class="card-text">Giá :`+Intl.NumberFormat('en-US').format(Number(el.price))+`</p>
                        <p>Loai San pham:`+el.catename+`</p>
                        <p>Thuong hieu:`+el.brandname+`</p>
                        <a href="detail.html?id=`+el.id+`" class="btn btn-primary chitietBtn"data-id:"`+el.id+`">Chi Tiet</a>
                        <button class="btn btn-success addtocartBtn" data-id=`+el.id+`>Them</button>
                      </div>
                    </div>
                  </div> 
                    `;
                });
                $("#resultProduct").append(str);
                if(res.products.next_page_url !=null){
                    link=res.products.next_page_url;
                }else{
                    $("#showmorebtn").hide();
                }
            }

        }
    });
}