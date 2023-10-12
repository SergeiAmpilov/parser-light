import { apiRuntime } from "../api/Api";

export const handleSubmitDownDetector = (event) => {

  event.preventDefault();

  const url = new FormData(event.target).get('url');
  apiRuntime.showPreloader(event.target);
  apiRuntime.ddRunTask(url);

  setTimeout( () => location.reload(), 1000 );

};

export const initForms = () => {
  const formCollection = document.forms;

  if (formCollection['downdetectorform']) {
    formCollection['downdetectorform']
      .addEventListener('submit', handleSubmitDownDetector);
  }
};