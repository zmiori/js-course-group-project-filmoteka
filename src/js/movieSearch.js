// import { paginateFilms, paginateOnClick } from './pagination';
// import genres from './decodingJenres';
// import { showSpinner, hideSpinner } from './spinner';
// import apiServise from './api-servise';

// const refs = {
//   filmsGallery: document.querySelector('#films-gallery'),
//   searchForm: document.querySelector('#search-form'),
//   notice: document.querySelector('.header-search-warning-show'),
// };

// const path = 'https://api.themoviedb.org/3';
// const key = 'ffddee44025dd24685ea61d637d56d24';

// function listenSearchFormSubmit(event) {
//     event.preventDefault();

//     apiServise.resetPage();
//     // console.log('apiServise.page: ', apiServise.page);

//     refs.notice.classList.add('is-hidden');

//     const form = event.currentTarget;
//     const input = form.elements.query;

//     if (input.value === '') {
//       refs.notice.classList.remove('is-hidden');
//       refs.notice.textContent =
//         'Unable to make a search query. Please enter any text!';

//       return;
//     }

//     apiServise.setQuery(input.value);
//     // console.log('apiServise.query: ', apiServise.query);

//     showSpinner();
//     setPagination().catch(console.log).finally(hideSpinner);

//   form.reset();
// };

// function setPagination() {
//   return renderFilmsGallery().then(({ totalAmountOfFilms }) => {
//     // console.log('totalAmountOfFilms: ', totalAmountOfFilms);

//     paginateFilms(totalAmountOfFilms);
//     paginateOnClick(totalAmountOfFilms);
//   });
// }

// function renderFilmsGallery() {
//   return fetchMoviesByKeyword().then(({ results, total_results }) => {
//     // console.log(results);
//     // console.log(total_results);

//     if (results.length === 0) {
//       refs.notice.classList.remove('is-hidden');
//       refs.notice.textContent =
//         'Your search did not match any films. Please clarify the request!';

//       return;
//     }

//     refs.filmsGallery.innerHTML = '';

//     updateFilmsGalleryMarkup(results);

//     const data = {
//       totalAmountOfFilms: total_results,
//     };

//     return data;
//   });
// }

// function fetchMoviesByKeyword() {
//   return fetch(
//     `${path}/search/movie?api_key=${key}&language=en-US&page=${apiServise.page}&include_adult=false&query=${apiServise.query}`,
//   ).then(response => response.json());
// }

// function updateFilmsGalleryMarkup(films) {
//   // console.log('genres: ', genres);

//   films.map(({ id, poster_path, title, release_date, genre_ids }) => {
//     const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
//     // console.log('filteredGenres: ', filteredGenres);

//     const mapedGenres = filteredGenres.map(({ name }) => name);
//     // console.log('mapedGenres: ', mapedGenres);

//     let slicedMapedGenres = [];

//     if (mapedGenres.length < 3) {
//       slicedMapedGenres = mapedGenres;
//     } else {
//       slicedMapedGenres = mapedGenres.slice(0, 2);
//       slicedMapedGenres.push('Other');
//     }
//     // console.log('slicedMapedGenres: ', slicedMapedGenres);

//     const markup = `
// <li class="films-gallery-item" data-id="${id}">
//   <img
//     class="films-gallery-item-image"
//     src="https://image.tmdb.org/t/p/w342${poster_path}"
//     alt="«${title}» film poster"
//   >
//   <p class="films-gallery-item-title">${title.toUpperCase()}</p>
//   <p class="films-gallery-item-info">${slicedMapedGenres.join(', ')} | ${
//       release_date.split('-')[0]
//     }</p>
// </li>
// `;

//     refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
//   });
// }

// refs.searchForm.addEventListener('submit', listenSearchFormSubmit);
// // export default listenSearchFormSubmit;


import refs from './refs.js'
import decGenres from './decodingJenres.js'
import paginationjs from 'paginationjs'
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

let pageNumbers = 1
let currentPage = 1;
let inputValue = ''
let listenerIsActive = false

export default function searchFilm() {
 
  const headerSearchForm = document.querySelector('.header-search-form')


  headerSearchForm.addEventListener('submit', (e) => {
    // e.preventDefault()
    const filmsgallery = document.querySelector('#films-gallery');
    console.log(filmsgallery);
    filmsgallery.innerHTML = ''
    currentPage =1
    const liFilmsGalleryItem = document.querySelector('.films-gallery-item')
    const listMovie = document.querySelector('.films-gallery')
    inputValue = e.target[0].value 
    if (liFilmsGalleryItem) {
      listMovie.innerHTML = ''
    }
    e.preventDefault()
    fetchApiSearch()

    e.target[0].value = ''
 
    
    const filmsGalleryId = document.querySelector('#films-gallery');
    filmsGalleryId.innerHTML = ''
    console.log(filmsGalleryId);

  })

}

function fetchApiSearch() {
// // const startingUrl = 'https://image.tmdb.org/t/p/original'
const path = 'https://api.themoviedb.org/3/search/movie?';
const key = 'ffddee44025dd24685ea61d637d56d24';
// console.log(inputValue);
  // const query = inputValue
//   console.log(query);
// const API = `${path}api_key=${key}&language=en-US&query=${query}&page=${pageNumbers}&include_adult=false`
// fetch(API)
// .then(res => res.json())
//   .then(data => {
     
    // makeNewObjectFilms(data)
    // pagination(data)
  

    // })   

function renderFilmsGallery(page) {
  fetchTrends(page)
    .then(({ results }) => {
  // showMoveNotFound(films)
      fetchGenres().then(({ genres }) => {
        updateFilmsGalleryMarkup(results, genres);
      });
    })
    .catch(console.log);
}


function fetchTrends(page) {
  return fetch(
   `${path}api_key=${key}&language=en-US&query=${inputValue}&page=${page}&include_adult=false`,
  ).then(response => response.json());
}
function fetchGenres() {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`).then(response =>
    response.json(),
  );
}
function updateFilmsGalleryMarkup(films, genres) {
  // console.log('genres: ', genres);
 
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    // console.log("filteredGenres: ", filteredGenres);
    const mapedGenres = filteredGenres.map(({ name }) => name);
    // console.log("mapedGenres: ", mapedGenres);
    const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${mapedGenres.slice(0, 3).join(', ')} | ${
      release_date.split('-')[0]
    }</p>
</li>
`;
    refs.ulListMovie.insertAdjacentHTML('beforeend', markup);
    
  });
}

renderFilmsGallery(currentPage);
const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="#" class="tui-page-btn qwerty">{{page}}</a>`,
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination('pagination', options);
const paginationContainer = document.querySelector('#pagination');
// console.log(paginationContainer);
  if (listenerIsActive === false) {
    paginationContainer.addEventListener('click', handleOnPaginationContainerClick);
    listenerIsActive = true
    
  } else {
    paginationContainer.removeEventListener('click', handleOnPaginationContainerClick);
    listenerIsActive = false
  }

  if (currentPage !== 1) {
    paginationContainer.removeEventListener('click', handleOnPaginationContainerClick);
    console.log("elfkztv");

  }
  function handleOnPaginationContainerClick(event) {
    paginationContainer.removeEventListener('click', handleOnPaginationContainerClick);
    paginationContainer.addEventListener('click', handleOnPaginationContainerClick);
    const ulListMovie = document.querySelector('.list-movie-search-js')
   const filmsGallery = document.querySelector('.films-gallery')
    ulListMovie.innerHTML = '';
    filmsGallery.innerHTML = '';
    
      if (event.target.nodeName === 'STRONG') {
    return
  }
    
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'SPAN') {
      return;
    }
    
    console.log('stong ЛИ ЭТО',event.target.nodeName);

  const button = +event.target.textContent
  // const button
  if (Number.isInteger(button)) {
    currentPage = button
    renderFilmsGallery(currentPage)
  }

    
  //  
    const clickOnSpan = event.target
    console.dir(event.target);
    if (event.target.nodeName==='A') {
       if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-next') {
         currentPage += 1
         renderFilmsGallery(currentPage)
  console.log(currentPage);
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-prev') {
    currentPage-=1
    renderFilmsGallery(currentPage)
     console.log(currentPage);
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-first') {
    currentPage = 1
    renderFilmsGallery(currentPage)
     console.log(currentPage);
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-last') {
    currentPage = 1000
    renderFilmsGallery(currentPage)
     console.log(currentPage);
  }
    } else {
      paginationContainer.removeEventListener('click', handleOnPaginationContainerClick);
      paginationContainer.addEventListener('click', handleOnPaginationContainerClick);
      if (event.target.className === 'tui-ico-next') {
        currentPage += 1
        console.log('ssdfsdfsdf');
        renderFilmsGallery(currentPage)
        //    const filmsgallery = document.querySelector('#films-gallery');
        // filmsgallery.innerHTML = ''
      }
       if (event.target.className === 'tui-ico-prev') {
         currentPage-=1
         renderFilmsGallery(currentPage)
          console.log(currentPage);
      }
      if (event.target.className === 'tui-ico-first') {
    currentPage = 1
        renderFilmsGallery(currentPage)
        const filmsgallery = document.querySelector('#films-gallery');
        console.log('filmsgallery', filmsgallery);
        filmsgallery.innerHTML = ''
         console.log(currentPage);
      }
      if (event.target.className === 'tui-ico-last') {
    currentPage = 1000
    renderFilmsGallery(currentPage)
  }
     console.log(event.target.className);
    }
    
  }
}

function showMoveNotFound(data) {
   if (data.results.length === 0) {
        refs.headerSearchWarningShow().classList.add('header-search-warning-show')
    }
    else {
       refs.headerSearchWarningShow().classList.remove('header-search-warning-show')
    }
}
