import {render,page} from './lib.js';
import {logout} from './api/data.js';

import {loginPage} from "./sample/login.js";
import {registerPage} from "./sample/register.js";
import {homePage} from "./sample/home.js";
import {detailsPage} from "./sample/details.js";
import {editPage} from "./sample/edit.js";
import {createPage} from "./sample/create.js";
import {catalogPage} from "./sample/catalog.js";
import {searchPage} from "./sample/search.js";

const main = document.querySelector('main');
document.querySelector('#user').children[1].addEventListener('click',onLogoutBtn)

setUserNav();

page('/' , decorateContext, homePage);
page('/login' , decorateContext, loginPage);
page('/register' , decorateContext, registerPage);
page('/details/:id' , decorateContext, detailsPage);
page('/edit/:id' , decorateContext, editPage);
page('/create' , decorateContext, createPage);
page('/catalog' , decorateContext, catalogPage);
page('/search' , decorateContext, searchPage);

page.start();





function decorateContext(context,next) {
    context.render = (content)=> render(content, main);
    context.setUserNav = setUserNav;
    next();
}


function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token !== null){
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user').style.display = 'block';
    }else {
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#user').style.display = 'none';
    }
}

async function onLogoutBtn() {
    await logout();
    setUserNav();
    page.redirect('/');
}