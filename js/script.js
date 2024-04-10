const pageState = {
    currentPage: window.location.pathname
};

const moviesDiv = document.querySelector('#popular-movies');
const showsDiv = document.querySelector('#popular-shows');
const spinnerDiv = document.querySelector('#spinner');
const movieDetailsEL = document.getElementById('movie-details');
const showDetailsEL = document.getElementById('show-details');

const searchForm = document.querySelector('.search-form');
const inputField = document.querySelector('#search-term');
    







//init App


function init()
{
    switch(pageState.currentPage)
    {
        case '/':
        case '/index.html':
            spinnerDiv.classList.add('show');
            initSwiper();
            getNowPlayingMovies();
            getPopularMovies('movie/popular');
            searchValidation();
            
            break;
        case '/movie-details.html':
            spinnerDiv.classList.add('show');
            getMovieDetails()
            break;
        case '/tv-details.html':
            spinnerDiv.classList.add('show');
            getShowDetails()
            break;
        case '/search.html':
            spinnerDiv.classList.add('show');
            searchValidation();
            getSearchResult();
            
            
            break;
        case '/shows.html':
             spinnerDiv.classList.add('show');
             getPopularShows('tv/popular');
            break;
    }
   
highlightActiveLink();




}


function highlightActiveLink()
{
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link)=>
    {
        if (link.getAttribute('href') === pageState.currentPage){
            link.classList.add('active')
        }
    })    
}


async function getNowPlayingMovies () {
    const apiKey = '792c4db65d881e09f8e9280d23813bca';
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
    const {results}= await response.json();
    const parentDiv = document.querySelector('.swiper-wrapper');
    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.className= 'swiper-slide';
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="${movie.title}" /> </a> <h4 class="swiper-rating"> <i class="fas fa-star text-secondary"></i> ${movie.vote_average}/ 10</h4>`;
      parentDiv.appendChild(div);

    })   
}

function initSwiper()
{
    const swiper = new Swiper
    ('.swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay:
         {
            delay: 4000,
            disableOnInteraction: false 
        },
                breakpoints:
                 {
                            500: {
                            slidesPerView: 2
                                },
                            700: {
                            slidesPerView: 3
                            },
                            1200: {
                            slidesPerView: 5
                            }
                }
        
    });
}


async function getPopularMovies(endpoint){
    
    const apiKey = '792c4db65d881e09f8e9280d23813bca';
    const url = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${url}${endpoint}?api_key=${apiKey}`);
    const data = await response.json();
    const movies = data.results;
    movies.forEach((movie)=>{
        const title = movie.original_title;
        const releaseDate = movie.release_date;
        const imgSrc = movie.poster_path;
        const newMovieCard = document.createElement('div')
        newMovieCard.classList.add('card');
        newMovieCard.setAttribute('data-id', movie.id )

        newMovieCard.innerHTML = 
        `<a href="movie-details.html?id=${movie.id}">
        ${imgSrc ?
             `<img src= 'https://image.tmdb.org/t/p/original${imgSrc}'` 
             : '<img src= "images/no-image.jpg"'} 
              
        class="card-img-top" 
        alt="${movie.title}"/> 
        </a>
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${releaseDate}
        </small></p></div>`
        

        moviesDiv.appendChild(newMovieCard);
        
    }
     )
    spinnerDiv.classList.remove('show');
 
}


async function getPopularShows(endpoint){
    const apiKey = '792c4db65d881e09f8e9280d23813bca';
    const url = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${url}${endpoint}?api_key=${apiKey}`);
    const data = await response.json();
    const shows = data.results;
    shows.forEach((show)=>{
        const title = show.original_name;
        const releaseDate = show.first_air_date;
        const imgSrc = show.poster_path;
        const newShowCard = document.createElement('div')
        newShowCard.classList.add('card');
        newShowCard.setAttribute('data-id', show.id)
        newShowCard.innerHTML = 
        `<a href="tv-details.html?id=${show.id}">
        ${imgSrc ?
             `<img src= 'https://image.tmdb.org/t/p/original${imgSrc}'` 
             : '<img src= "images/no-image.jpg"'} 
              
        class="card-img-top" 
        alt="${title}"/> 
        </a>
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">
        <small class="text-muted">Aired: ${releaseDate}
        </small></p></div>`
        

        showsDiv.appendChild(newShowCard);   
    })
    spinnerDiv.classList.remove('show');
}

function getUrlID(){
    const urlID = window.location.search.split('=')
    return urlID[1];
}

const getMovieDetails = async ()=>{
    const titleEL = document.getElementById('movie-title');
    const releaseDateEL = document.getElementById('releaseDate');
    const overviewEL = document.getElementById('overview');
    const ratingEL = document.getElementById('rating');
    const genreEL = document.getElementById('genre-list');
    const movieInfoEL = document.getElementById('movie-info');
    const companyNamesEL = document.getElementById('company-names');
    const imgEL = movieDetailsEL.querySelector('img');
    const homePageEL = document.querySelector('#home');
    const movieID = getUrlID();
    const apiKey = '792c4db65d881e09f8e9280d23813bca';
    const url = `https://api.themoviedb.org/3/movie/${movieID}`;
    const response = await fetch(`${url}?api_key=${apiKey}`);

    //getting all required data from API
    
    const data = await response.json();
    const title = data.original_title;
    const releaseDate = data.release_date;
    const overview = data.overview;
    const budget = data.budget;
    const revenue = data.revenue;
    const runtime = data.runtime;
    const status = data.status;
    const img = data.poster_path;
    const genres = data.genres;
    const backdropPath = data.backdrop_path;
    let genreArr = [];
    genres.forEach((el)=>{
        genreName = el.name;
        genreArr.push(genreName);
    })
    const production = data.production_companies;
    let productionArr = [];
    production.forEach((el)=>{
        let companyName = el.name;
        productionArr.push(companyName)
    })
    let rating = Math.round(data.vote_average);

    //Updating the dom elements with fetched data

    displaybackdrop('movie', backdropPath);
    titleEL.textContent = title;
    releaseDateEL.textContent =`Release Date: ${releaseDate}`;
    overviewEL.textContent= overview;
    ratingEL.textContent = `${rating}/10`;
    homePageEL.setAttribute('href', data.homepage)

    //Adding array of genres to DOM
    if (genreArr.length > 0){
        genreArr.forEach((el)=> {
           const  genreLi = document.createElement('li');
            genreLi.textContent = el;
            genreEL.appendChild(genreLi);
        })
    }

    else{
        const genreLi = document.createElement('li');
        genreLi.textContent = 'Genres not available'
        genreEL.appendChild(genreLi)
    }

movieInfoEL.innerHTML = 
`<li><span class="text-secondary">Budget:</span> ${addCommas(budget)}</li>
<li><span class="text-secondary">Revenue:</span> ${addCommas(revenue)}</li>
<li><span class="text-secondary">Runtime:</span> ${addCommas(runtime)}</li>
<li><span class="text-secondary">Status:</span> ${status}</li>`

//adding list of production companies to DOM

if (productionArr.length > 0){
    productionArr.forEach((el)=>{
        if (productionArr.indexOf(el) === productionArr.length - 1){
            let company = document.createTextNode(el);
            companyNamesEL.appendChild(company)

        }

        else {let company = document.createTextNode(el + ',  ');
        companyNamesEL.appendChild(company)}
    })

}

else {
    let company = document.createTextNode('N/A');
    companyNamesEL.appendChild(company) }


if (img){imgEL.setAttribute('src', `https://image.tmdb.org/t/p/original${img}`)}

else {
    imgEL.setAttribute('src', 'images/no-image.jpg')
}
spinnerDiv.classList.remove('show');


}

const getShowDetails = async ()=>{
    const titleEL = document.getElementById('showTitle');
    const releaseDateEL = document.getElementById('showReleaseDate');
    const overviewEL = document.getElementById('showOverview');
    const ratingEL = document.getElementById('showRating');
    const genreEL = document.getElementById('showGenre');
    const showInfoEL = document.getElementById('show-info');
    const companyNamesEL = document.getElementById('showCompany');
    const imgEL = showDetailsEL.querySelector('img');
    const homePageEL = document.querySelector('#showHome');
    const showID = getUrlID();
    const apiKey = '792c4db65d881e09f8e9280d23813bca';
    const url = `https://api.themoviedb.org/3/tv/${showID}`;
    const response = await fetch(`${url}?api_key=${apiKey}`);

    //getting all required data from API
    
    const data = await response.json();
    const title = data.original_title;
    const releaseDate = data.first_air_date;
    const overview = data.overview;
    const status = data.status;
    const img = data.poster_path;
    const genres = data.genres;
    const backdropPath = data.backdrop_path;
    const epNum = data.number_of_episodes;
    const lastEp = data.last_episode_to_air.name;
    let genreArr = [];
    genres.forEach((el)=>{
        genreName = el.name;
        genreArr.push(genreName);
    })
    const production = data.production_companies;
    let productionArr = [];
    production.forEach((el)=>{
        let companyName = el.name;
        productionArr.push(companyName)
    })
    let rating = Math.round(data.vote_average);

    //Updating the dom elements with fetched data

    displaybackdrop('show', backdropPath);
    titleEL.textContent = title;
    releaseDateEL.textContent =`Release Date: ${releaseDate}`;
    overviewEL.textContent= overview;
    ratingEL.textContent = `${rating}/10`;
    homePageEL.setAttribute('href', data.homepage)

    //Adding array of genres to DOM
    if (genreArr.length > 0){
        genreArr.forEach((el)=> {
           const  genreLi = document.createElement('li');
            genreLi.textContent = el;
            genreEL.appendChild(genreLi);
        })
    }

    else{
        const genreLi = document.createElement('li');
        genreLi.textContent = 'Genres not available'
        genreEL.appendChild(genreLi)
    }

    

showInfoEL.innerHTML = 
`<li><span class="text-secondary">Number Of Episodes:</span>  ${epNum}</li>
<li>
  <span class="text-secondary">Last Episode To Air:</span> ${lastEp}
</li>
<li><span class="text-secondary">Status:</span> ${status}</li>`

//adding list of production companies to DOM

if (productionArr.length > 0){
    productionArr.forEach((el)=>{
        if (productionArr.indexOf(el) === productionArr.length - 1){
            let company = document.createTextNode(el);
            companyNamesEL.appendChild(company)

        }

        else {let company = document.createTextNode(el + ',  ');
        companyNamesEL.appendChild(company)}
    })

}

else {
    let company = document.createTextNode('N/A');
    companyNamesEL.appendChild(company) }


if (img){imgEL.setAttribute('src', `https://image.tmdb.org/t/p/original${img}`)}

else {
    imgEL.setAttribute('src', 'images/no-image.jpg')
}
spinnerDiv.classList.remove('show');


}

function addCommas(number) {
    // Convert number to string
    let numStr = String(number);
    
    // Split the string into parts for integer and decimal parts
    let parts = numStr.split('.');
    
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Join integer and decimal parts and return
    return parts.join('.');
}

function displaybackdrop(type, path){

    const div = document.createElement('div');
    div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.height = '100vh';
    div.style.width = '100vw';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.zIndex = '-1';
    div.style.opacity = '0.2';

    if (type === 'movie'){
        movieDetailsEL.appendChild(div)
    }
    else{
        showDetailsEL.appendChild(div)
    }
    
}

function searchItems (){
    const div = document.querySelector('#alert');
    console.log(global.searchTerm)
    if (!global.searchTerm ){
        div.textContent= 'Please Try Again';
        div.classList.add('error')
        setTimeout(() => {
            div.remove()
            
        },2000);
    } 

}


function searchValidation (){
    searchForm.addEventListener('submit', (e)=>{
        if (!inputField.value){
            e.preventDefault();
            const div = document.querySelector('#test');
            div.style.display = 'inline-block';
            div.textContent = 'Please Try Again';
            div.classList.add('error')
            setTimeout(() => {
                div.style.display = 'none';
                
            },2000);
        }     
    
        }
    )

}

async function getSearchResult(){
    const searchDiv = document.querySelector('#search-results');
    const url =  window.location.search;
    const searchParams = new URLSearchParams(url);
    const category =  searchParams.get('type');
    const title = searchParams.get('search-term');
    console.log(category, title)
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTJjNGRiNjVkODgxZTA5ZjhlOTI4MGQyMzgxM2JjYSIsInN1YiI6IjY2MTBiNDUzYjMzOTAzMDE2MjZkZjhlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KCQlqcWshlr-BmgTBVStgD2ksvpG92oDmVz4LdpYByg'
        }
      };
    if (category=== 'movie'){

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}`, options);
        const data = await response.json();
        const movieArr = data.results; 
        movieArr.forEach((movie)=>{
            const div = document.createElement('div');
            div.classList.add('card')
            div.innerHTML= `<a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}"`: '<img src="images/no-image.jpg"'}class="card-img-top" alt="${movie.title}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.original_title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
          searchDiv.appendChild(div);
        })  
        spinnerDiv.classList.remove('show');
    }

    else {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${title}`, options);
        const data = await response.json();
        const tvArr = data.results; 
        tvArr.forEach((tv)=>{
            const div = document.createElement('div');
            div.classList.add('card')
            div.innerHTML= `<a href="tv-details.html?id=${tv.id}">
            ${tv.poster_path ? `<img src="https://image.tmdb.org/t/p/original${tv.poster_path}"` : '<img src="images/no-image.jpg"'}class="card-img-top" alt="${tv.original_name}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${tv.first_air_date}</small>
            </p>
          </div>`;
          searchDiv.appendChild(div);
        }) 

        spinnerDiv.classList.remove('show');

    }

    

       

    
}
   

document.addEventListener('DOMContentLoaded', init);




