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
      item.qty = 0
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
        arr.forEach((el,index)=>{
            str+=`
            <tr class="">
            <td scope="row">`+(++index)+`</td>
            <td>`+el.name+`</td>
            <td>`+el.price+`</td>
            <td>`+el.qty+`</td>
            <td>`+(el.qty*el.price)+`</td>
            <td> <button class="btn btn-info btn-sm">Xóa</button></td>
          </tr>`
        });
        document.getElementById('resultcart').innerHTML=str;
    }
}
