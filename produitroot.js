const router = require("express").Router();
const express = require("express");
const Produit = require("../model/produit");
const multer = require("../multer");

//Add a new Produit (create)
router.post("/saveProduit", multer.upload.single("image"), (req, res) => {
    const produit = new Produit(
      {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        categorie: req.body.categorie,
        image: req.file.path
      }
    );
  
    console.log(produit);
  
    produit.save((err, newProduit) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err,
        });
      }
  
      res.status(201).json(newProduit);
    });
  });
//get
router.get("/getProduit", (req, res) => {
  Produit.find()
  .then(list => res.status(200).json(list))
  .catch(err => console.log(error()));
})  
//delet
router.delete("/delProduit/:id", (req, res, next) => {
    Produit.findByIdAndDelete({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Produit est  supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  })
  //update

router.put("/update/:id", (req, res) => {
  Produit.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((produit) => {
      res.status(200).send(produit)
    })
    .catch((error) => { console.log(error) });
})
router.get("/get/:id", (req, res) => {
  //let productId = req.params.productId;
  Produit.findById({ _id: req.params.id })
      .then((produit) => {
          res.status(200).send(produit)
      })
      .catch((error) => { console.log(error) });
}
);

//FindProductByCategory
router.get("/:categorie", function (req,res) {
  var categoryName = req.params.categorie;

  Categorie.findOne({_id: categoryName}, function(err, c) {
    Produit.find({categorie: categoryName}, function(err, produits) {
      if(err)
        console.log(err);
        res.status(200).send({
          nom: c.nom,
          data: produits
        })
    })
  })
})

//export
module.exports = router;

