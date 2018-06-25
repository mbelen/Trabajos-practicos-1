const express = require('express');
const app = express ();
const router = require('./routes/puppiesRouter');

const PORT = 8080;

app.use('/puppies', router);

app.listen(PORT, () => {
    console.log('Api de Puppies escuchandose en el puerto ' + PORT);
});
