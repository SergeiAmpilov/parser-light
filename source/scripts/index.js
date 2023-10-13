import '../styles/index.css';
import { initForms } from './init/forms';
import { parsePagesFromSitemap, parseTagsFromPage } from './init/parsePages';
import { initYear } from './init/year.js';

const init = () => {
  initYear();
  initForms();
  parsePagesFromSitemap();
  parseTagsFromPage();
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
