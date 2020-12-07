let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Grey Tshhirt', 
        tag: 'greytshirt',
        price: 15, 
        inCart: 0
    },
    {
        name: 'Grey Hoddie', 
        tag: 'greyhhoddie',
        price: 20, 
        inCart: 0
    },
    {
        name: 'Black Tshhirt', 
        tag: 'blacktshirt',
        price: 10, 
        inCart: 0
    },
    {
        name: 'Black Hoddie', 
        tag: 'blackhoddie',
        price: 25, 
        inCart: 0
    }

];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbrs() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;    //pour laisser le nombre de produit séléctionner a jours ne revien pas a zéro 
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1)    //le calcule des produits a chaque fois add to card
        document.querySelector('.cart span').textContent = productNumbers + 1;    //le calcule des produit dans l'icon du pannier

    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);   // l'appel a la function setItems
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else { 
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    /*
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);
    */

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);   
    } 
    else { 
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    console.log(cartItems);
    if ( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-ligne">
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <span>${item.name}</span>
            </div>
            <div class="product-price"> $${item.price},00</div>
            <div class="product-quantity">
                <ion-icon class="decrease" name="add-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="remove-circle"></ion-icon>
            </div>
            <div class="product-total">
                $${item.inCart * item.price},00
            </div>
            </div>
            `;
            
        });

        productContainer.innerHTML += `
        <div class= "basket-product">
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                     Total Basket
                </h4>
                <h4 class="basketTotal">
                     $${cartCost},00
                </h4>
            </div>
        </div>
            `;
    }

}




onLoadCartNumbrs();
displayCart()




