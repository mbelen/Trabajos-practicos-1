const express = require('express');
const randomPuppy = require('random-puppy');
const router = express.Router();
const puppies = router;

puppies.get('/getAll', async (req, res) => {
  const puppieImg = await randomPuppy();
  res.json({
    img: puppieImg
  })
});

module.exports = puppies;

