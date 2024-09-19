const Player = require("../models/players");
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.user_create_post = (req, res, next) => {
     // Validate and sanitize the name field.
    body("name", "Name must be at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const player = new Player({ 
            name: req.body.name,
            pastPicks: [],
            score: 0
         });
         if(!errors.isEmpty()){
            res.render("index", {
                title: "Nfl Pickem"
            });
            return;
        }else{
            const playerExists = await player.findOne({name: req.body.name})
        }
        if(playerExists){
            res.render("submitted", {
                title: "Already exists"
            })
        }else{
            await player.save()
            res.render("submitted", {
                title: "Submitted"
            })
        }
    
       
    })

    
    

    // asyncHandler(async(req, res, next) => {
    //      // Extract the validation errors from a request.
    //     const errors = validationResult(req);
        
    //     if (errors.isEmpty()){
    //         res.render("submitted", {
    //             title: "Submitted"
    //         })
    //         return;
    //     }else{
    //         res.render("submitted", {
    //             title: "Submitted"
    //         })
    //     }
    // })
}
