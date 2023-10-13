import { apiRuntime } from "../api/Api";

export async function parsePagesButtonHandleClick(evt) {

  evt.preventDefault();


  const url = evt.target.dataset.url;
  const taskid = evt.target.dataset.taskid;

  console.log('run parse123');

  await apiRuntime.parsePages(url, taskid);

  window.location.replace(`/seoparser/renderpages?sitemap=${url}&taskid=${taskid}`);

}


export const parsePagesFromSitemap = (evt) => {
  const parseButton = document.querySelectorAll('.button__parse-pages').forEach((button) => {
    button.addEventListener('click', parsePagesButtonHandleClick);
  })
}