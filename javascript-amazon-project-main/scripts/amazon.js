import {addToCart, updateCartQuantity} from "../data/cart.js";
import {products} from "../data/products.js";

let productsHTML = '';
const addedMessageTimeouts = {};


//displaying all the products
function displayGrid(){
  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img
          class="product-image"
          src=${product.image}
        />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img
          class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png"
        />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>

      <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

      <div class="product-quantity-container">
        <select class="selection">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary"
      data-product-id="${product.id}">Add to Cart</button>
    </div>`;
  });
  //now set our html in our product grid to the html we have created above
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
  //now display the cart quantity
  const cartQuantityElement = document.querySelector(".cart-quantity");
  updateCartQuantity(cartQuantityElement);
}

function addedMessage(element, productId){
  element.style.opacity = 1;
  //display for 2 seconds, then remove it
  const prevTimoutId = addedMessageTimeouts[productId];
  // Check if a previous timeoutId exists. If it does,
  // we will stop it.
  if (prevTimoutId) {
    clearTimeout(prevTimoutId);
  }
  
  const timeoutId = setTimeout(() => {
    element.style.opacity = 0;
  }, 2000);
  
  // Save the timeoutId so we can stop it later.
  addedMessageTimeouts[productId] = timeoutId;
}

//main
displayGrid();
const itemGrid = document.querySelector(".products-grid");
itemGrid.addEventListener('click', function(event) {
let buttonElement = event.target;
  //looks for the specific add to cart button 
  if(buttonElement.classList.contains('add-to-cart-button')){
    const productId = buttonElement.getAttribute("data-product-id");
    //find the closest div to our specific add to cart button, then find the quantity
    const parent = buttonElement.closest('.product-container');
    let quantity = Number(parent.querySelector(".selection").value);
    addToCart(productId, quantity);
    const cartQuantityElement = document.querySelector(".cart-quantity");
    updateCartQuantity(cartQuantityElement);
    //create added message
    const addedElement = parent.querySelector(".added-to-cart");
    addedMessage(addedElement, productId);
  }
});

