import {html} from '../lib.js';
import {createArticle} from '../api/data.js';

const createTemplate = (onSubmit) => html`
    <section id="create-page" class="content">
        <h1>Create Article</h1>

        <form @submit=${onSubmit} id="create" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>

                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>

            </fieldset>
        </form>
    </section>
`;

export async function createPage(context) {
    context.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        try {
            if (!title || !category || !content) {
                throw new Error('All fields are required!');
            }

            if (category !== 'JavaScript' & category !== 'C#' &
                category !== 'Java' & category !== 'Python') {
                throw new Error('The category must be on of "JavaScript", "C#", "Java", or "Python".');
            }

            await createArticle({
                title,
                category,
                content
            });
            context.page.redirect('/');

        } catch (e) {
           return  window.alert(e.message)
        }
    }
}