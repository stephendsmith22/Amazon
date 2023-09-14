export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, quantity){
  let matchingItem;
  //find out if the product is already in our cart
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
      return;
    }
  });
  if(matchingItem)
    matchingItem.quantity += quantity;
  else
    cart.push({productId, quantity});
  //now write the cart to localstorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCartQuantity(element){
  //always grab from localstorage to make sure our cart is up to date
  cart = JSON.parse(localStorage.getItem("cart"));
  const cartQuantity = cart.reduce((total, cur) => total + cur.quantity, 0);
  element.innerText = cartQuantity;
}