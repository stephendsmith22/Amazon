import { products } from "../data/products.js";
import { updateCartQuantity } from "../data/cart.js";
//import {updateCartQuantity} from "../scripts/amazon.js";

const cart = JSON.parse(localStorage.getItem("cart"));
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const headerQuantity = document.getElementById('item-quantity');

function updateItem(productId){
    const updateElement = document.querySelector(".update-quantity-link");
}

function deleteItem(productId){
    const itemIndex = cart.findIndex(p => p.productId === productId);
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

//display all products in our cart
function displayCheckout(){
    updateHeaderQuantity();
    //display the number of items in the header
    let checkoutHTML = ``;
    //add all proudcts in cart to our order grid
    //if cart is empty, show view products button
    if(cart.length == 0){
        checkoutHTML = `
            <p>Your cart is empty</p>
            <a href="amazon.html"
                ><button id="view-products-button">View products</button></a
            >`;
    }
    else{
        cart.forEach(cartItem => {
            //find the current product based on our productID
            const curProduct = products.find(item => item.id === cartItem.productId);
            checkoutHTML += `
            <div class="cart-item-container">
                <div class="delivery-date">Delivery date: Tuesday, June 21</div>

                <div class="cart-item-details-grid">
                <img
                    class="product-image"
                    src="${curProduct.image}"
                />

                <div class="cart-item-details">
                    <div class="product-name">
                    ${curProduct.name}
                    </div>
                    <div class="product-price">$${(curProduct.priceCents / 100).toFixed(2)}</div>
                    <div class="product-quantity">
                    <span> Quantity: <span class="quantity-label">${cartItem.quantity}</span> </span>
                    <input class="new-quantity-input" type="number" min="0" max="99">
                    <span class="update-quantity-link link-primary"
                            data-product-id="${curProduct.id}">
                        Update
                    </span>
                    <span class="save-quantity-link link-primary"
                            data-product-id="${curProduct.id}">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary"
                            data-product-id="${curProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        checked
                        class="delivery-option-input"
                        name="delivery-option-${curProduct.id}"
                    />
                    <div>
                        <div class="delivery-option-date">${displaydeliveryDate(11)}</div>
                        <div class="delivery-option-price">FREE Shipping</div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${curProduct.id}"
                    />
                    <div>
                        <div class="delivery-option-date">${displaydeliveryDate(5)}</div>
                        <div class="delivery-option-price">$4.99 - Shipping</div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input
                        type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${curProduct.id}"
                    />
                    <div>
                        <div class="delivery-option-date">${displaydeliveryDate(1)}</div>
                        <div class="delivery-option-price">$9.99 - Shipping</div>
                    </div>
                    </div>
                </div>
                </div>
            </div>`;
        })
    }
    document.querySelector(".order-summary").innerHTML = checkoutHTML;
}

function displaydeliveryDate(shippingDays){
    const currentDate = new Date();
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + shippingDays));
    const day = dayNames[newDate.getDay()], month = monthNames[newDate.getMonth()];
    const result = day + ", " + month + " " + newDate.getDate();
    return result;
}

function updateHeaderQuantity(){
    updateCartQuantity(headerQuantity);
    if(headerQuantity.innerText === '1')
        headerQuantity.innerText += " item";
    else
        headerQuantity.innerText += " items";
}

displayCheckout();
//dealing with delete and update buttons
const orderGrid = document.querySelector(".order-summary");
orderGrid.addEventListener('click', function(event) {
    
    const productId = event.target.getAttribute("data-product-id");
    const parent = event.target.closest('.cart-item-container');
    const save = parent.querySelector(".save-quantity-link");
    //save.style.display = "none";
    
    //handling delete button
    if(event.target.classList.contains('delete-quantity-link')){
        //delete the item from the cart
        deleteItem(productId);
        displayCheckout();
    }
    //handling update button
    else if(event.target.classList.contains('update-quantity-link')){
        console.log("update");
        //if(save.style.display === "none")
            //console.log(save.style.display);
        /*
        1. quantity number and update button go away
        2. input box and save appear
        3. we put the number in the box and click save
        4. store number, update quantity, and display checkout
        */ 
        updateItem(productId);
        displayCheckout();
    }
    else if(event.target.classList.contains('save-quantity-link')){
        console.log("save");
        const quantity = parent.querySelector(".new-quantity-input").innerHTML;
        //updateCartQuantity(quantity);
    }
});

function testFunction(element){
    element.style.display = "none"; 
}

