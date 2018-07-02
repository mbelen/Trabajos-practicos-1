function makePagination(values) {
  $('#paginator').pagination({
    dataSource: values,
    pageSize: 6,
    showPrevious: false,
    showNext: false,
    beforePageOnClick: function(event) {
      $('#gifs').empty();
    },
    callback: function(data, pagination) {
      data.map( (gifData, index) => {
        const url = gifData.gifs ? gifData.gifs.fixed_width.webp : gifData;
        const displayedElement = url.includes('.mp4') ?
        `<video class="video-gif" src=${url} controls>
          Tu navegador no implementa el elemento <code>video</code>.
        </video>` :
        `<img src=${url} />`;

        $('#gifs').prepend(`
          <div class="gif-card">
            ${displayedElement}
            <div class="info">
              <div class="button">
                  <div class="button-text">Detalle</div>
              </div>
              <div class="meGusta like-${index}" id="like" onclick="animateLike('like-${index}')"></div>
            </div>
          </div>
        `);
      });
    }
  });
}

//$('#like').on('click', () => {
    //$(this).toggleClass('#is-liked');
  //}); 
function animateLike(likeClass) {
  $(`.${likeClass}`).toggleClass('is-liked');
}

function fetchSearch(value = '', option = null) {
  isLoading();
  $.post("http://localhost:8080/gifs/search",
  {
      query: value
  },
  (respuesta) => {
    let values;
    isLoading(false);
    if(!respuesta) alert(`[Sin data acerca de este tipo de Gifs]: ${value}`);
    if(!option) {
      values = respuesta;
    }
    else {
      const goodValues = [];
      respuesta.map(data => {
        const gif = goodValues.push(data.gifs.fixed_width[option]);
        return gif;
      });
      values = goodValues;
    }
    makePagination(values);
  });
}

function isLoading(isLoading=true) {
  const displaySpinner = isLoading ? 'block' : 'none';
  const displayGifs = isLoading ? 'none' : 'flex';
  $('.spinner').css('display', displaySpinner);
  $('#gifs').css('display', displayGifs);
  return;
}

$(document).ready( () => {
  fetchSearch();
  let value;
  let options;
  $('#buscador').on('change', (event) => {
    value = event.target.value;
  });

  $('#categorias').on('change', (event) => {
    value = event.target.value;
  });

  $('#formatos').on('change', (event) => {
    options = event.target.value;
  });

  $('#filter-btn').on('click', () => {
    $('#gifs').empty();
    if(!value) value = $('#categorias').val();
    fetchSearch(value, options);
  });
});