const express = require('express');
const axios   = require('axios');
const chalk   = require('chalk');
const API     = require('../utils/constants');

const router = express.Router();
const gifs = router;


gifs.post('/search', async (req, res, next) => {
  try {
    const { query } = req.body;
    const q = query || API.DEFAULT_QUERY;
    const queryLimit = API.LIMIT;
    const options = {
      headers: {
        'api_key': API.API_KEY
      }
    };

    const response = await axios.get(`${API.BASE_URL}/gifs/search?q=${q}&limit=${queryLimit}`, options);
    const payloads = [];
    response.data.data.map(gif => {
      const payload = {
        gifs: gif.images,
        title: gif.title,
        source: gif.source,
        usarname: gif.username,
        import_datetime: gif.import_datetime
      }

      $('#container').prepend(`
        <div class="row">
                <a href="${BASE_URL}">
                      <div class="filtro">
                        ${gif.title}
                        ${gif.username}                        
                      </div>
                      <div class="gif">
                        ${gif.images}
                      </div>
                      <div class="boton">
                        ${gif.images}
                        ${gif.title}
                        ${gif.source}
                        ${gif.username}
                      </div>
                </a>
        </div>
      `);
    });  

      return payloads.push(payload)
    });
    
    res.send(payloads);
  } catch (error) {
    console.log(`[Error]: ${chalk.red(error)}`);
    next(error);
  }
});

module.exports = gifs;

