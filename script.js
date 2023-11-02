const accessKey = "2xSCdj6Yss8uSF2OoEjdXhPai-pVw00lt2mvr8hP2o0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        // imageLink.href = result.links.html;
        // imageLink.target = "_blank";

        // Add a click event listener to open the image in a new div
        image.addEventListener("click", () => {
            openImageInNewDiv(result.urls.full);
        });

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";
}

function openImageInNewDiv(imageUrl) {
    // Create a new div for displaying the image
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-popup");
    imageDiv.style.background = "rgba(0, 0, 0, 0.8)";
    imageDiv.style.position = "fixed";
    imageDiv.style.top = "0";
    imageDiv.style.left = "0";
    imageDiv.style.width = "100%";
    imageDiv.style.height = "100%";
    imageDiv.style.display = "flex";
    imageDiv.style.justifyContent = "center";
    imageDiv.style.alignItems = "center";

    // Create an image element in the div
    const fullImage = document.createElement("img");
    fullImage.src = imageUrl;
    fullImage.style.maxWidth = "90%";
    fullImage.style.maxHeight = "90%";
    fullImage.style.border = "2px solid #fff";

    // Add the image to the div
    imageDiv.appendChild(fullImage);

    // Add the div to the body
    document.body.appendChild(imageDiv);

    // Close the image when clicked on the div
    imageDiv.addEventListener("click", () => {
        document.body.removeChild(imageDiv);
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
