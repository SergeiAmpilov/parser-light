import { apiRuntime } from "../api/Api";

export const handleSubmitDownDetector = (event) => {

  event.preventDefault();

  const url = new FormData(event.target).get('url');
  apiRuntime.showPreloader(event.target);
  apiRuntime.ddRunTask(url);

  setTimeout( () => location.reload(), 1000 );

};

export const handleSubmitSeoparser = async (event) => {
  event.preventDefault();
  
  const url = new FormData(event.target).get('url');
  apiRuntime.showPreloader(event.target);
  const { id } = await apiRuntime.runSeoparserTask(url);

  window.location.replace(`/seoparser/sitemaps/${id}`);

};

export const initForms = () => {
  const formCollection = document.forms;

  if (formCollection['downdetectorform']) {
    formCollection['downdetectorform']
      .addEventListener('submit', handleSubmitDownDetector);
  }
  
  if (formCollection['seoparserform']) {
    formCollection['seoparserform']
      .addEventListener('submit', handleSubmitSeoparser);

  }
};