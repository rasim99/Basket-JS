let table = document.querySelector(".table");
let totalP = document.getElementById("p");
let totalPriceDiv = document.querySelector(".total-price");

if (localStorage.getItem("basket") != null) {
  let basketArr = JSON.parse(localStorage.getItem("basket"))
  basketArr.forEach(product => {
    table.classList.remove("d-none");
    totalPriceDiv.classList.remove("d-none")

    let tr = `
        <tr>
        <td data-id=${product.id}> 
           <img src="${product.imgUrl}" alt="" width="140px" height="100px">
        </td>
        <td> ${product.name} </td>
         <td> ${product.price.slice(0, product.price.length - 1)}   </td>
       
           <td>
               <i class="fa-solid fa-minus"></i>
               </td>
                 <td>  ${product.count} </td>
               <td> <i class="fa-solid fa-plus"></i> <td>
            
                 <td> 
                      <i class="fa-solid fa-trash" style="cursor:pointer"></i>
                   </td>
        </tr>

        `
    table.lastElementChild.innerHTML += tr;
    
  });
    
  TotalPrice(basketArr)
  Plus(basketArr)
  Minus(basketArr)
  // Delete(basketArr)

}

function TotalPrice(basketArr) {
  let sum = basketArr.reduce((prev, next) => {
    return prev + next.price.slice(0, next.price.length - 1) * next.count;
  }, 0)

  totalP.innerText = sum + "$"
}


 let removeIcon = document.querySelectorAll(".fa-trash");
removeIcon.forEach(r=>{
  r.addEventListener("click",function () {
    let data=JSON.parse(localStorage.getItem("basket"));
    let id=r.parentNode.parentNode.firstElementChild.getAttribute("data-id");
    let existData=data.find(f=>f.id==id);
    let dataIndex=data.indexOf(existData);
    data.splice(dataIndex,1);
    localStorage.setItem("basket",JSON.stringify(data))
    if (data<1) {
      localStorage.removeItem("basket")
    }
    TotalPrice(data)
  })
})


//  function Delete(basketArr) {
//   let removeIcon = document.querySelectorAll(".fa-trash");
//   removeIcon.forEach(r=>{
//     r.addEventListener("click",function () {
//       let data=JSON.parse(localStorage.getItem("basket"));
//       let id=r.parentNode.parentNode.firstElementChild.getAttribute("data-id");
//       let existData=data.find(f=>f.id==id);
//       let dataIndex=data.indexOf(existData);
//       data.splice(dataIndex,1);
//       localStorage.setItem("basket",JSON.stringify(data))
//       if (data<1) {
//         localStorage.removeItem("basket")
//       }
//       TotalPrice(data)
      
//     })
//   })
//  }

function Plus(basketArr) {
  let items=JSON.parse(localStorage.getItem("basket"));
  let plusItem=document.querySelectorAll(".fa-plus")
plusItem.forEach(plus=>{
  plus.addEventListener("click",function () {
    
    let id=this.parentNode.parentNode.firstElementChild.getAttribute("data-id");
    let existitem=items.find(i=>i.id==id);

     let itemCount=existitem.count
      itemCount++
    existitem.count=itemCount
   
    plus.parentNode.previousElementSibling.innerText=existitem.count
TotalPrice(items)

  })
})
}


function Minus(basketArr) {
  let items=JSON.parse(localStorage.getItem("basket"));
  let MinusItem=document.querySelectorAll(".fa-minus")
   MinusItem.forEach(minus=>{
  minus.addEventListener("click",function () {
    
    let id=this.parentNode.parentNode.firstElementChild.getAttribute("data-id");
    let existitem=items.find(i=>i.id==id);
   
    let itemCount=existitem.count
   if (itemCount>0) {
    
    itemCount--
  existitem.count=itemCount

  minus.parentNode.nextElementSibling.innerText=existitem.count

   }
    else{
      alert("Basket Is Empty")
    }
    
  TotalPrice(items)
 
  })


})
}

