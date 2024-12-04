const API_KEY = '47449658-8a4a698e6c3e0bfab17519f95'; 
const PER_PAGE = 12;
let currentPage = 1;

async function fetchImages(page) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&editors_choice=true&image_type=photo&per_page=${PER_PAGE}&page=${page}`);
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    images.forEach(image => {
        const imgCard = document.createElement('div');
        imgCard.classList.add('image-card');
        imgCard.innerHTML = `
            <img src="${image.webformatURL}" alt="${image.tags}">
        `;
        gallery.appendChild(imgCard);
    });
}

document.getElementById('loadMore').addEventListener('click', async () => {
    const images = await fetchImages(currentPage);
    displayImages(images);
    currentPage++;
});


fetchImages(currentPage).then(images => displayImages(images));