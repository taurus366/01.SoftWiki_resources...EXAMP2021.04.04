import {html} from '../lib.js';
import {getArticleById,editArticleById} from '../api/data.js';

const editTemplate = (onSubmit, article) => html`
    <section id="edit-page" class="content">
        <h1>Edit Article</h1>

        <form @submit=${onSubmit} id="edit" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
                </p>

                <p class="field category">
                    <label for="category">Category:</label>
                    <input type="text" name="category" id="category" placeholder="Enter article category" .value=${article.category}>
                </p>
                <p class="field">
                    <label for="content">Content:</label>
                    <textarea name="content" id="content" .value=${article.content}></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Save Changes">
                </p>

            </fieldset>
        </form>
    </section>
`;
export async function editPage(context) {
    const articleId = context.params.id;
    const article = await getArticleById(articleId);
    context.render(editTemplate(onSubmit, article));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        try {
            if (!title || !category || !content){
                throw new Error('All fields are required!');
            }
            if (category !== 'JavaScript' & category !== 'C#' &
                category !== 'Java' & category !== 'Python'){
                throw new Error('The category must be on of "JavaScript", "C#", "Java", or "Python".');
            }

            await editArticleById(articleId,{
                title,
                category,
                content
            })

            context.page.redirect(`/details/${articleId}`);

        }catch (e) {
          return  window.alert(e.message);
        }
    }
}