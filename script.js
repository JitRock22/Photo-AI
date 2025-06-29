const input = document.querySelector('.search-input');
const searchForm = document.querySelector('form');
const imgContainer = document.querySelector('.images-container');
const akey = 'jlFjCLGKKX3ZVqFGBrFBhxI7g235XaEN4cwnjNZOG28';
const loadBtn = document.querySelector('.load-more');
let page = 1;//for load more button
const fetchImages =
    async (query, pageNo) => {
        try {


            if (pageNo === 1) {
                imgContainer.innerHTML = '';
            }

            const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&page=${pageNo}&client_id=${akey}`;
            // console.log(query);

            const response = await fetch(url);
            const data = await response.json();

            // showing error message if use enter wrong thing
            if (data.results.length > 0) {
                data.results.forEach(element => {

                    // create image div
                    const imageElement = document.createElement('div');
                    imageElement.classList.add('imageDiv');
                    // imageElement.innerHTML = `<img src="${element.urls.regular}"/>`;
                    imageElement.innerHTML = `
                    <img src="${element.urls.regular}" alt="${element.alt_description || 'AI Image'}"/>
                    `;


                    // creating overlay effect
                    const overlayElement = document.createElement('div');
                    overlayElement.classList.add('overlay');
                    imageElement.appendChild(overlayElement);
                    // creating overlay text
                    const overlayText = document.createElement('h3');
                    overlayText.innerText = `${element.alt_description}`;
                    overlayElement.appendChild(overlayText);
                    imageElement.appendChild(overlayElement);

                    imgContainer.appendChild(imageElement);
                });

                //for display the load more button
                if (data.toal_pages === page) {
                    loadBtn.style.display = "none";
                } else {
                    loadBtn.style.display = "block";
                }
            } else {
                imgContainer.innerHTML = `<h2>No images Found...</h2>`;
                if (loadBtn.style.display == "block") {
                    loadBtn.style.display = "none";
                }

            }
        } catch (error) {
            imgContainer.innerHTML = `<h2>Failed to fetch images....</h2>`;
        }

    }

// adding event listner to search for 
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent auto form submission

    const inputText = input.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText, page);
    } else {
        imgContainer.innerHTML = `<h2>Please Enter a Search topic...</h2>`;
        if (loadBtn.style.display == "block") {
            loadBtn.style.display = "none";
        }
    }
});
//for load more button this function usd
loadBtn.addEventListener('click', () => {
    const inputText = input.value.trim();
    fetchImages(inputText, ++page);
    console.log(page);
});