

//to show loading spinner when click lesson button
const manageSpinner = (status) => {
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("category-buttons").classList.add("hidden");
    }else {
        document.getElementById("category-buttons").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

// Global variable jate bar bar fetch korte na hoy (Optional optimization)
let allProductsData = [];

// 1. Initial Load: Page load hole shob product niye ashbe
const loadProducts = async () => {
    manageSpinner(true);
    const url = ('https://fakestoreapi.com/products')
    const res = await fetch(url);
    allProductsData = await res.json();
    displayProducts(allProductsData);
};

// 2. Display Function: Card gulo render korbe
const displayProducts = (products) => {
    const container = document.getElementById('product-container');
    container.innerHTML = ""; // Container clear kora

    

    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = "card bg-base-100 shadow-sm border border-gray-100";
        card.innerHTML = `
          

        <div class="gap-6" >
            <div class="card bg-base-100  shadow-sm">
                <figure>
                    <img
                    src="${product.image}" class="h-40 object-contain w-full" />
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-center text-xs font-bold">
                        <span class="bg-gray-200 rounded-full p-1 "> ${product.category} </span>
                        <span class=""><span class="text-yellow-400"><i class="fa-solid fa-star"></i></span> ${product.rating.rate}<span class="px-2">${product.rating.count}</span></span>
                    </div>
                    <h2 class="font-bold text-sm h-10">${product.title.slice(0, 30)}...</h2>
                    <p class="font-bold text-lg">$${product.price}</p>
                    <div class="card-actions flex justify-between py-2">
                        <button class="btn btn-outline px-10 p-0"> <span><i class="fa-regular fa-eye"></i></span>Details</button>
                        <button class="btn btn-outline btn-primary px-10 p-0"><span><i
                                class="fa-solid fa-cart-arrow-down"></i></span> Add</button>
                        <!-- <div class="badge badge-outline">Products</div> -->
                    </div>
                </div>
            </div>
        </div>
          
        `;
        container.appendChild(card);
        
    });
    manageSpinner(false);
};

// 3. Filter and Active Button Logic
const filterProducts = (category, clickedBtn) => {
    // ---- Active Button Style Change ----
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.add('btn-outline'); // Shob gulo outline kore dao
    });
    clickedBtn.classList.remove('btn-outline'); // Sudhu click kora button-er outline soraw (Active dekha-be)

    // ---- Data Filtering ----
    if (category === 'all') {
        displayProducts(allProductsData);
    } else {
        const filtered = allProductsData.filter(item => item.category === category);
        displayProducts(filtered);
    }
};

// Shuru-te load kora
loadProducts();