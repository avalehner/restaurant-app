import { menuArray } from "./data.js"

// global variables 

const orderPrices = []
const paymentForm = document.getElementById('payment-form')
let totalPrice = 0 
let totalPriceHtml = ``


// menu html

let menuHtml = menuArray.map(item => `
    <section class= "menu-card">
      <div class="item-img-container">  
        <img class="item-image" src=${item.image}> 
      </div>
      <div class="item-text">
        <h2 class="item-name">${item.name}</h2>
        <p class="item-description">${item.ingredients}</p>
        <p class="item-price">$${item.price}</p>
      </div>
      <div class="add-btn-container">
        <img class="add-btn" 
        id="${item.uuid}" 
        data-add="${item.uuid}"
        src="/images/add-btn.png">
      </div>
    </section>
    <div class="menu-card-border"></div>
  `).join('')

document.getElementById('menu-container').innerHTML = menuHtml 

// event listeners 

document.addEventListener('click', function(e){
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add)
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove)
  } else if (e.target.dataset.complete){
    handleCompleteOrderBtnClick ()
  } else if (e.target.dataset.reload){
    handleReloadClick()
  }
})

// menu add button

function handleAddBtnClick(itemId){
  const targetItemObj = menuArray.filter(function(item){
    return item.uuid === itemId
  })[0]

  const yourOrderHtml = `<h2 class="your-order">Your order</h2>`

  orderPrices.push(targetItemObj.price)

  let orderHtml = ``

  for (let i=0; i<orderPrices.length; i++){
    orderHtml = `
    <div class="order-card" id="${itemId}-${i}">
      <h2 class="order-item-name">${targetItemObj.name}</h2>
      <p class="remove-btn" data-remove="${itemId}-${i}">remove</p>
      <p class="order-item-price" id="price-${itemId}-${i}">$${targetItemObj.price}</p>
    </div>`
  }

  totalPrice = orderPrices.reduce((total, currentPrice) => 
    total + currentPrice
   )
  
  const totalPriceBorderHtml = `<div class="total-price-border-inner"></div>`

  totalPriceHtml =`
  <div class="total-price-card">
    <h2 class="total-price-title">Total Price:</h2>
    <p class="total-price-amount">$${totalPrice}</p>
  </div>
  `

  const completeOrderBtnHtml = `
  <button 
  class="green-btn" 
  id="complete-order-btn" 
  data-complete="complete-order-btn">Complete Order</button>
  `

// innerHTML
  document.getElementById('your-order-title-container').innerHTML = yourOrderHtml
  document.getElementById('order-container').innerHTML += orderHtml
  document.getElementById('total-price-border-outer').innerHTML = totalPriceBorderHtml
  document.getElementById('total-price-container').innerHTML = totalPriceHtml
  document.getElementById('complete-order-btn-container').innerHTML = completeOrderBtnHtml
}

// order remove button

function handleRemoveBtnClick (itemId) {
  //hides removed item
  document.getElementById(`${itemId}`).classList.add('hidden')

  //change total price
  const removedItemPrice = document.getElementById(`price-${itemId}`).textContent
  const removedItemPriceNumber = Number(removedItemPrice.replace("$", ""))
  const removedItemPriceNumberIndex = orderPrices.indexOf(removedItemPriceNumber)
  orderPrices.splice(removedItemPriceNumberIndex,1)

  if (orderPrices.length === 0){
    totalPrice = 0 
  } else {
    totalPrice = orderPrices.reduce((total, currentPrice) => 
      total + currentPrice)
  }
  
   totalPriceHtml =`
   <section class="total-price-card">
     <h2 class="total-price-title">Total Price:</h2>
     <p class="total-price-amount">$${totalPrice}</p>
   </section>
   `

   document.getElementById('total-price-container').innerHTML = totalPriceHtml
  console.log(totalPrice)
}

// modal complete order button 
function handleCompleteOrderBtnClick (){
  document.getElementById('modal').style.display = 'inline'
}

// pay button click 
paymentForm.addEventListener('submit', function (e){
  e.preventDefault()
  document.getElementById('modal').style.display = 'none'

  const fullName = document.getElementById('full-name')

  const thankYouHtml = `
  <div class="thank-you-card" id="thank-you-card">
    <h1>Thanks, ${fullName.value}! Your order is on its way!</h1>
  </div>
  <button class="green-btn" id="another-order-btn" data-reload="reload-btn">Place another order</button>`


  document.getElementById('your-order-title-container').innerHTML = thankYouHtml
  document.getElementById('order-container').style.display = 'none'
  document.getElementById('total-price-border-outer').style.display = 'none'
  document.getElementById('total-price-container').style.display = 'none'
  document.getElementById('complete-order-btn-container').style.display = 'none'
  
  const allAddBtn = document.querySelectorAll('.add-btn-container')
  allAddBtn.forEach(btn => btn.style.display="none")
})

function handleReloadClick() {
  window.location.reload()
}








