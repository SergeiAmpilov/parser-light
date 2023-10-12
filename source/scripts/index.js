import '../styles/index.css';
import { initForms } from './init/forms';
import { parsePagesFromSitemap } from './init/parsePages';
import { initYear } from './init/year.js';

const init = () => {
  initYear();
  initForms();
  parsePagesFromSitemap();
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
