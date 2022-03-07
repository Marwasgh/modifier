const mongoose =require ("mongoose");
//creation d'un objet mongoose
const produit= new mongoose.Schema({
    nom :{type :String ,required: true,min:3,max:9},
    description:{ type :String , required: true ,min:3,max:20},
    prix:Number,
    categorie:{type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'},
        image: {type:String, required:true}
   
});
module.exports= mongoose.model("Produit",produit);