// Item template:
/* <div class="col-md-4 col-sm-6 portfolio-item">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
      </a>
      <div class="portfolio-caption">
        <h4>Threads</h4>
        <p class="text-muted">Illustration</p>
      </div>
    </div> */

// modal template
/* <h2>Project Name</h2>
<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
<img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
  dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
  maiores repudiandae, nostrum, reiciendis facere nemo!</p>
<ul class="list-inline">
  <li>Date: January 2017</li>
  <li>Client: Threads</li>
  <li>Category: Illustration</li>
</ul>
<button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project</button> */

function renderProjs() {
  debugger;

  let projs = getProjsToDisplay();
  let strHtmls = projs.map(proj => {
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
                    <li>${getModalDate(proj.publishedAt)}</li>
                    <li>Client: Threads</li>
                    <li>Category: Illustration</li>
                    <li><a target="_blank" class="btn btn-link" href="${proj.url}">See for yourself!</a></li>
                  </ul>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                      <i class="fa fa-times"></i>
                      Close Project</button>`;
  
  $('.modal-project').html(strHtml);
}

function getModalDate() {
  return 'DATE';
}