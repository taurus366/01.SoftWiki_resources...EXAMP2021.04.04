import {html} from '../lib.js';
import {getRecentlyArticles} from '../api/data.js';

const homeTemplate = (articles) => html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            <h2>JavaScript</h2>
            ${articles.filter(item => item.category === 'JavaScript').length > 0  ? articles.filter(item => item.category === 'JavaScript').map(technologyTemplate): html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent csharp">
            <h2>C#</h2>
            ${articles.filter(item => item.category === 'C#').length > 0  ? articles.filter(item => item.category === 'C#').map(technologyTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent java">
            <h2>Java</h2>
            ${articles.filter(item => item.category === 'Java').length > 0 ? articles.filter(item => item.category === 'Java').map(technologyTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent python">
            <h2>Python</h2>
            ${articles.filter(item => item.category === 'Python').length > 0  ?
                    articles.filter(item => item.category === 'Python').map(technologyTemplate) : html`<h3 class="no-articles">No articles yet</h3>` }
        </section>
    </section>
`;

const technologyTemplate = (technology) => html`
        ${technology.title ? html`<article>
            <h3>${technology.title}</h3>
            <p>${technology.content}</p>
            <a href="/details/${technology._id}" class="btn details-btn">Details</a>
        </article>` : html`<h3 class="no-articles">No articles yet</h3>`}
        
`;

export async function homePage(context) {
    const articles = await getRecentlyArticles();
    context.render(homeTemplate(articles));
}