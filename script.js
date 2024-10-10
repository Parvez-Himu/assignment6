// Category section
async function fetchCategory() {
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data = await res.json();
    displayCategories(data.categories);
}

// Remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
        btn.classList.remove('current');
    }
}

// Load category images
const loadCategoryImages = (category) => {
    const createVideoContainer = document.getElementById('bestDeal');
    createVideoContainer.classList.remove('grid');
    createVideoContainer.innerHTML = `
        <div class="flex justify-center items-center mt-[300px] w-full">
            <span class="loading loading-bars loading-lg"></span>
        </div>
    `;

    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                removeActiveClass();
                const activeBtn = document.getElementById(`btn-${category}`);
                activeBtn.classList.add("current");
                createVideoContainer.classList.add('grid');
                displayLoadImages(data.data);
            })
            .catch((error) => console.log(error));
    }, 1000);
}

// Display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category");
    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.addEventListener('click', () => loadCategoryImages(category.category));
        categoryDiv.classList.add("border", "p-5", "rounded-3xl", "gap-4", "flex", "justify-center", "items-center", "category-btn");
        categoryDiv.id = `btn-${category.category}`;
        categoryDiv.innerHTML = `
            <img src=${category.category_icon} alt=""> 
            <p class="text-2xl font-bold text-center">${category.category}</p>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
}

fetchCategory();

// Load images
async function loadImages() {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await res.json();
    displayLoadImages(data.pets);
}

// Display loaded images
const displayLoadImages = (items) => {
    const cardContainer = document.getElementById('bestDeal');
    cardContainer.innerHTML = "";

    if (items.length === 0) {
        cardContainer.classList.remove('grid');
        cardContainer.innerHTML = `
            <div class="min-h-[600px] w-full flex flex-col gap-5 justify-center items-center">
                <img src="images/error.webp"/>
                <h2 class="text-center text-xl font-bold">No Content Here in this Category.</h2>
            </div>
        `;
        return;
    } else {
        cardContainer.classList.add('grid');
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList = "max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4";
        card.innerHTML = `
            <img class="w-full h-48 object-cover" src=${item.image} alt=${item.pet_name}>
            <div class="px-4 py-4">
                <h3 class="font-bold text-lg">${item.pet_name}</h3>
                <ul class="text-sm text-gray-700 space-y-1">
                    <li><i class="fa fa-paw"></i> Breed: ${item.breed || "Not Available"}</li>
                    <li><i class="fa fa-calendar"></i> Birth: ${item.date_of_birth || "Not Available"}</li>
                    <li><i class="fa fa-venus"></i> Gender: ${item.gender || "Not Available"}</li>
                    <li><i class="fa fa-dollar-sign"></i> Price: ${item.price || "Not Available"}$</li>
                </ul>
                <div class="flex space-x-4 mt-4">
                    <button onclick="AddToCart('${item.image}')" class="text-primary border px-3">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button id="adoptBtn-${item.petId}" onclick="adoptPet('${item.petId}', this)" class="text-emerald-500 font-bold px-4 py-2 border rounded">Adopt</button>
                    <button onclick="openModal('${item.petId}')" class="border border-emerald-500 text-emerald-500 px-4 py-2 rounded">Details</button>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

