

class Api {
  
  baseUrl;


  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request(method, url, data) {
    return fetch(this.baseUrl + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => data);
  }

  showPreloader(node) {
    node.innerHTML = 
    `
    <div class="row">
      <div class="valign-wrapper">
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  hidePreloader(node) {
    node.innerHTML = '';
  }

  // down detector
  ddRunTask(url) {
    return this.request('POST', 'downdetector/run', { url });
  }

  // seo parser
  runSeoparserTask(url) {
    return this.request('POST', 'seoparser/run', { url })
  }

  parsePages(url, taskid) {
    return this.request('POST', 'seoparser/parsepages', 
    {
      url,
      taskid: Number(taskid)
    });
  }

  parseTags(id) {
    return this.request('POST', 'seoparser/parsetags', { id: Number(id) });
  }
}


export const apiRuntime = new Api('http://localhost:3000/');