$(document).ready(function () {
    addtocart(); render()
});

function addtocart(){
    if(localStorage.getItem('cart') && localStorage.getItem('cart')!=null){
        var result = localStorage.getItem('cart');
        
    }else{
        var arr=[];
    
    }
$('#addtocarbtn').click(function (e) { 

    e.preventDefault();
       var index=$(this).attr('data-id');
       var name=$(this).attr('data-name');
       var price=Number($(this).attr('data-price'));
        var item=new Object;
        item.id=index;
        item.name=name;
        item.price=price;
        item.qty=1;
        var check=false;
        arr.forEach(el => {
            if(el1.id==index){
                el1.qty++;
                check=true;
            }
          });
          if(check==false){
            arr.push(item);
          } 
          localStorage.setItem('cart',JSON.stringify(arr));
          render()
          
});
         

}
function render(){
    var result=fetch();
    if(result==false){
        var  str=`
        <tr class="">
        <td colspan=6 scope="row">chua co gio hang</td>
        </tr>
        `;
        $("#cartressult").html(str)
        

    }else{
        $("#cartressult").html(result)
        deleteCart();
        fetch();
    }
        
    
}
function fetch(){
    if(localStorage.getItem('cart') && localStorage.getItem('cart')!=null){
        var result = localStorage.getItem('cart');
        var arr = JSON.parse(result);
        var str=``;
        var i=1;
        arr.forEach((el,index)=>{
            str+=`
            <tr class="">
            <td scope="row">`+(i++)+`</td>
            <td>`+el.name+`</td>
            <td>`+Intl.NumberFormat('en-US').format(el.price)+`</td>
            <td>`+el.qty+`</td>
            <td>`+Intl.NumberFormat('en-US').format(el.qty*el.price)+`</td>
            <td> <button class="btn btn-info btn-sm deleteCartItem" data-id="`+index+`">Xóa</button></td>
          </tr>`
        });
        return str;
    }else{
        return false
        
    }
}
function deleteCart(){
    if(localStorage.getItem('cart') && localStorage.getItem('cart')!=null){
        var result = localStorage.getItem('cart');
        var arr = JSON.parse(result);
    }else{
        var arr=[];
    
    }

   $('.deleteCartItem').click(function (e) { 
    e.preventDefault();
    var id=$(this).attr('data-id');
    var check=confirm("xoa san pham");
    if(check==true){
        if(arr.length>1){
            arr=arr.filter(item => item.id!=id);
        }else{
            arr=[];
        }
            if(arr.length==0){
                localStorage.removeItem('cart')
            }else{
                localStorage.setItem('cart',JSON.stringify(arr));
            }
            alert("Da Xoa");
            render()
    }
   });
}
