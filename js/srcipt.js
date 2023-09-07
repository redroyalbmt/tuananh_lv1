const productnames=document.querySelectorAll('.name');
const productprices=document.querySelectorAll('.price');
const buttons=document.querySelectorAll('.addtocarbtn');
var arr=[];
buttons.forEach((el,index) => {
    el.addEventListener('click',() =>{
      var item=new Object();
      item.id=index;
      item.name=productnames[index].innerText;
      item.price=productprices[index].innerText;
      item.qty =1
      var check=false;
      arr.forEach(el1 => {
        if(el1.id==index){
            el1.qty++;
            check=true;
        }
      });
      if(check==false){
        arr.push(item);
      }
    //   console.log(arr);
    fetch()
    })
       
});
function fetch(){
    if(arr.length>0){
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
            <td> <button class="btn btn-info btn-sm"onclick="deleteCart(`+index+`)">Xóa</button></td>
          </tr>`
        });
        document.getElementById('resultcart').innerHTML=str;
    }else{
        str=`
        <tr class="">
        <td colspan=6 scope="row">chua co gio hang</td>
        </tr>
        `;
        document.getElementById('resultcart').innerHTML=str;
    }
}
function deleteCart(x){
    if(arr.length>1){
        arr=arr.filter(item => item.id!=x);
    }else(
        arr=[]
    )
    console.log(arr);
    fetch()
}
