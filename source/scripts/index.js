import '../styles/index.css';
import { initYear } from './init/year.js';

const init = () => {
  initYear();
}


document.addEventListener('DOMContentLoaded', function () {
  init();
});
