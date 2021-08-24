import GalleriesApiService from './apiService';
import cardTpl from './templates/card.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { error, defaultModules, } from "@pnotify/core";

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
    galleriesApiService.fetchArticles().then(data => {
        errorResult(data);
    });
    galleriesApiService.fetchArticles().then(appendCardsMarkup);
};

function errorResult(data) {    
        if (data.length === 0) {
            error({
                text: 'Image not found',
                delay: 2000
            });
    }
    return;
};

function onLoadMore() {     
    galleriesApiService.fetchArticles().then(appendCardsMarkup);       
};

function scrollList() {
    refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    })
};

function appendCardsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(hits));
    scrollList();
};

function clearCardContainer() {
    refs.galleryContainer.innerHTML = '';
};