function renderProjs() {
  let projs = getProjsToDisplay();
  let strHtmls = projs.map(proj => {

    let labels = proj.labels.map(label => `<span class="badge badge-pill badge-dark">${label}</span>`).join('&nbsp;');

    return `<div class="col-md-4 col-sm-6 portfolio-item">
              <a class="portfolio-link" data-toggle="modal" 
                  href="#projectModal" onclick="renderModal('${proj.id}')">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                  </div>
                </div>
                <img class="img-fluid" src="img/portfolio/${proj.id}.png" alt="Project Preview Image"/>
              </a>
              <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.previewDesc}</p>
                ${labels}
              </div>
            </div>`;
  });
  $('.row-proj-items').html(strHtmls.join(''));
}

function renderModal(projId) {
  let proj = getProjById(+projId);
  let strHtml = ` <h2>${proj.name}</h2>
                  <p class="item-intro text-muted">${proj.previewDesc}</p>
                  <img class="img-fluid d-block mx-auto" 
                      src="img/portfolio/${proj.id}.png" alt="Project Preview Image" />
                  <p>${proj.fullDesc}</p>
                  <ul class="list-inline">
                    <li>${getDateForModal(proj.publishedAt)}</li>
                    <li><a target="_blank" class="btn btn-link" href="${proj.url}">Launch Project</a></li>
                  </ul>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>`;

  $('.modal-project').html(strHtml);
}

function getDateForModal(timestamp) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  let date = new Date(timestamp);
  return `${months[date.getMonth()]}, ${date.getFullYear()}`;
}