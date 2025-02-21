const express = require('express');
const router = express.Router();
const bracketController=require("../controller/bracketController")
router.post('/bracket',bracketController.createBracket)
//const Bracket = require("../models/tournamentModel/bracketModel");
module.exports=router