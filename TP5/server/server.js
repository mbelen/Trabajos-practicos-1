const express    = require('express');
const chalk      = require('chalk');
const bodyParser = require('body-parser');
const app        = express ();
const router     = require('./routes/gifRouter');

const PORT = 8080;
app.use(bodyParser.json());
app.use('/gifs', router);

app.listen(PORT, () => {
    console.log(`Api de Gifs escuchandose en el puerto ${chalk.yellow(PORT)}`);
});
