$(document).ready( function() {
    getOptions();
    $('#encuesta').submit(function(evento) {
      evento.preventDefault();
      const formData = $('#encuesta').serializeArray();
      const values = [];
      formData.map(function(formInput, i){
        values.push(formInput.value);
      });
      $('#tabla').append(`
        <tr>
          <td>${values[0]}</td>
          <td>${values[1]}</td>
          <td>${values[2]}</td>
          <td>${values[3]}</td>
          <td>${values[4]}</td>
        </tr>
      `);
    });
  });
  
  function getOptions() {
      $.getJSON('./js/paises.json')
      .done(function(response) {
        const data = response.paises;
        data.map(function(pais, i) {
          $('<option>')
            .text(`${pais.nombre}`)
            .val(`${pais.nombre}`)
            .appendTo('#selector-paises');
        });
        return;
      })
      .fail(function(error) {
        console.error('ERROR: --> Estas usando el formulario localmente y no en un server :) ');
        const data = {
          "paises": [
              {"nombre":"Argentina", "codigo":"AR"},
              {"nombre":"Bolivia", "codigo":"BO"}, 
              {"nombre":"Brasil", "codigo":"BR"},
              {"nombre":"Chile", "codigo":"CL"},
              {"nombre":"Paraguay", "codigo":"PY"},
              {"nombre":"Uruguay", "codigo":"UY"}
          ]
        };
        data.paises.map(function(pais, i) {
          $('<option>')
            .text(`${pais.nombre}`)
            .val(`${pais.nombre}`)
            .appendTo('#selector-paises');
        });
      });
  }