import '../styles/index.css';
import { initForms } from './init/forms';
import { initYear } from './init/year.js';

const init = () => {
  initYear();
  initForms();
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
