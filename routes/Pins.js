const router = require("express").Router(); 
let Pin = require("../model/Pin"); 

 router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get all pins
  router.get("/", async (req, res) => {
    try {
      const pins = await Pin.find();
      res.status(200).json(pins);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id' , (req, res) =>{ 
    Pin.findByIdAndRemove(req.params.id).then(() => res.json('Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
}); 


  module.exports = router;
  