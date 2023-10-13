import { apiRuntime } from "../api/Api";
var htmlspecialchars = require('htmlspecialchars');

export async function parsePagesButtonHandleClick(evt) {

  evt.preventDefault();

  const url = evt.target.dataset.url;
  const taskid = evt.target.dataset.taskid;

  await apiRuntime.parsePages(url, taskid);

  window.location.replace(`/seoparser/renderpages?sitemap=${url}&taskid=${taskid}`);

}

export const parseTagsButtonHandleClick = async (evt) => {

  evt.preventDefault();

  const id = evt.target.dataset.id;
  const cardNode = evt.target.parentElement.parentElement;

  const preloaderNode = cardNode.querySelector('.page__card_preloader');

  if (preloaderNode) {
    apiRuntime.showPreloader(preloaderNode);
  }

  const { title, h1, description } = await apiRuntime.parseTags(Number(id));


  if (!cardNode) {
    return ;
  }

  if (title) {
    cardNode.querySelectorAll('.page__card_title').forEach( el => el.innerHTML = htmlspecialchars(title) );
  }

  if (h1) {
    cardNode.querySelectorAll('.page__card_h1').forEach( el => el.innerHTML = htmlspecialchars(h1) );
  }

  if (description) {
    cardNode.querySelectorAll('.page__card_description').forEach( el => el.innerHTML = htmlspecialchars(description) );
  }

  if (preloaderNode) {
    apiRuntime.hidePreloader(preloaderNode);
  }

}


export const parsePagesFromSitemap = () => {
  const parseButton = document.querySelectorAll('.button__parse-pages').forEach((button) => {
    button.addEventListener('click', parsePagesButtonHandleClick);
  })
}

export const parseTagsFromPage = () => {
  document.querySelectorAll('.button__parse-tags').forEach((button) => {
    button.addEventListener('click', parseTagsButtonHandleClick);
  })
}