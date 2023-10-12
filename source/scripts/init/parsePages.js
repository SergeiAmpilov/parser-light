export function parsePagesButtonHandleClick(evt) {

  const url = evt.target.dataset.url;
  const taskid = evt.target.dataset.taskid;

  const bodyparams = {
    url,
    taskid: Number(taskid)
  };

  fetch('/seoparser/parsepages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(bodyparams)
  })

}


export const parsePagesFromSitemap = (evt) => {
  const parseButton = document.querySelectorAll('.button__parse-pages').forEach((button) => {
    button.addEventListener('click', parsePagesButtonHandleClick);
  })
}