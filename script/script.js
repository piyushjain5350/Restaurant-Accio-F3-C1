const addContainer = document.getElementsByClassName("items-container")[0];

let itemsData = {};
fetchData();
async function fetchData() {
  try {
    const responseData = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
    itemsData = await responseData.json();
    getMenu();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function getMenu() {
  for (const itemKey in itemsData) {
    const item = itemsData[itemKey];
    addContainer.innerHTML += `
      <div class="cards">
        <div class="card-image">
          <img src="${item.imgSrc}" alt="itemImage">
        </div>
        <div class="card-details">
          <div class="card-details-left">
            <h2>${item.name}</h2>
            <p>$${item.price}/-</p>
          </div>
          <div class="card-details-right">
            <a src="#"><img src="./assets/add.png" alt="add"></a>
          </div>
        </div>
      </div>
    `;
  }
}

function takeOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const foodItem=["Pasta", "Burger", "Maggi"];
            const order = {
                food: [foodItem[Math.floor(Math.random() * 3)], foodItem[Math.floor(Math.random() * 3)], foodItem[Math.floor(Math.random() * 3)]]
            };
            resolve(order);
            
        },2500);
    });
}

function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{    
            const orderStatus={
                order_status:true,
                paid:false
            }
            resolve(orderStatus);
        },1500);
    })
}

function payOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const payStatus={
                order_status:true,
                paid:true
            }
            resolve(payStatus);
        },1000);
    })
}

function thankyouFnc(){
    alert("Thankyou for eating with us today!");
}   


const placeOrder=document.getElementById("orderPlace");

placeOrder.addEventListener("click" , async ()=>{
    try{
        const order= await takeOrder();
        console.log("Order Placed :- "+ order.food);

        const prepare=await orderPrep();
        console.log("Order Prepration :- "+prepare.order_status);

        const payment=await payOrder();
        console.log("Payment Status :- "+payment.paid);

        if(payment.paid){
            thankyouFnc();
        }
    }catch(error){
        console.error("Error is :-"+error);
    }
})