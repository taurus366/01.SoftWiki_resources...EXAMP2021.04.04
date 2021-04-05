import {html} from '../lib.js';
import {getArticleByTitle} from '../api/data.js';

const searchTemplate = (onClick,article,searchInput) => html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form @submit=${onClick} id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search" .value=${searchInput ? searchInput : ''}>
            </p>
            <p class="field submit">
                <input  class="btn submit" type="submit" value="Search">
            </p>
        </form>
        <div class="search-container">
            ${article.length > 0 ? article.map(articleTemplate) : html`<h3 class="no-articles">No matching articles</h3>`}
        </div>
    </section>
    `;

const articleTemplate = (article) => html`
    <a class="article-preview" href="#">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>
`;

export async function searchPage(context) {
    const searchInput = context.querystring.split('=')[1];
    const article = searchInput !== undefined ? await getArticleByTitle(searchInput): [];

    context.render(searchTemplate(onClick,article,searchInput));

    async function onClick(ev) {
        ev.preventDefault();
        const value = ev.target.parentNode.querySelector('.field > input').value;
       try {
           if (!value){
               throw new Error('Search fields is empty.');
           }
           context.page.redirect('/search?query=' + value);
       }catch (e) {
            return window.alert(e.message)
       }
    }
}