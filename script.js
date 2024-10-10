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


