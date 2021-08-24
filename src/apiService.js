export default class GalleriesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
     }
    
    fetchArticles() {
        console.log(this);
        const key = '23013902-f53df9bcd1cd3c8e660b93280';
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${key}`;
        
    return fetch(url)
        .then(responce => responce.json())
        .then(data => {
            this.incrementPage();

            return data.hits;
        }).catch(error => console.warn(error));
    }

    incrementPage() {
        this.page += 1;
    }    

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    
}