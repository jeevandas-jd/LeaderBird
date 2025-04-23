const express = require('express');
const router = express.Router();
const bracketController=require("../controller/bracketController")
router.post('/bracket',bracketController.createBracket)

router.post("/result",bracketController.expUpdateResult)
router.get("/shechdule",bracketController.expScheduleMatches)
//const Bracket = require("../models/tournamentModel/bracketModel");
module.exports=router