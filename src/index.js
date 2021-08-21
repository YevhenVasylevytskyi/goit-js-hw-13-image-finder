import GalleriesApiService from './apiService';
import cardTpl from './templates/card.hbs';

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),

};

const galleriesApiService = new GalleriesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
    event.preventDefault();

    clearCardContainer();
    galleriesApiService.query = event.currentTarget.elements.query.value;
    galleriesApiService.resetPage();
    galleriesApiService.fetchArticles().then(appendCardsMarkup);
}

function onLoadMore() {
     
    galleriesApiService.fetchArticles().then(appendCardsMarkup);
}

function appendCardsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearCardContainer() {
    refs.galleryContainer.innerHTML = '';
}


