//Task1 - Product Card Design
let apicard = document.querySelector(".apicard");
let allProducts = [];
fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(jsData => {
        allProducts = jsData;
        //Task2 - Show only 5 Products
        let firstFiveproducts = jsData.slice(0, 5);
        //Task3 - Price filter
        let expensiveproducts = jsData.filter(c => c.price > 50);
        //Task4 - Category filter
        let mensProducts = jsData.filter(
            c => c.category === "men's clothing"
        );
        //Task5 - Product Count
        let productCount = document.createElement("h2");
        productCount.innerText = `Total Products: ${jsData.length}`;
        document.body.insertBefore(productCount, apicard);
        //Display Products
        displayProducts(mensProducts);
        //Task8 - Dynamic Category Buttons
        let categories = [
            "All" ,
            ...new Set(jsData.map(product => product.category))
        ];
        let categoryButtons = document.querySelector("#categoryButtons");
        categories.forEach(category => {
            let button = document.createElement("button");
            button.innerText = category;
            button.addEventListener("click", () => {
                if (category === "All") {
                    apicard.innerHTML = "";
                    displayProducts(allProducts);
                } else {
                    let filteredProducts = allProducts.filter(
                        product => product.category === category
                    );
                    apicard.innerHTML = "";
                    displayProducts(filteredProducts);
                }
            });
            categoryButtons.appendChild(button);
        });
    })
    .catch(error => {
        apicard.innerHTML = "<p>Failed to load products.</p>";
    });

// Display Products Function
function displayProducts(products) {
    products.forEach(product => {
        let card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p><b>Category:</b> ${product.category}</p>
            <p><b>Price:</b> $${product.price}</p>
            <p>${product.description}</p>
            <button>View Product</button>
        `;
        apicard.appendChild(card);
    });
}
//Task6 - Search Product
function searchProduct() {
    let searchValue = document
        .querySelector("#searchInput")
        .value
        .toLowerCase();
    let matchingProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchValue)
    );
    apicard.innerHTML = "";
    displayProducts(matchingProducts);
}
//Task7 - Sort Products
function sortLowToHigh() {
    let sortedProducts = [...allProducts];
    sortedProducts.sort((a, b) => a.price - b.price);
    apicard.innerHTML = "";
    displayProducts(sortedProducts);
}
function sortHighToLow() {
    let sortedProducts = [...allProducts];
    sortedProducts.sort((a, b) => b.price - a.price);
    apicard.innerHTML = "";
    displayProducts(sortedProducts);
}