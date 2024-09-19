const Player = require("../models/players");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");



exports.user_create_post = [
    // Validate and sanitize the name field.
    body("name", "Name must be at least 1 character")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const player = new Player({
            name: req.body.name,
            pastPicks: [],
            score: 0,
        });
        if (!errors.isEmpty()) {
            res.render("index", {
                title: "Nfl Pickem"
                
            });
            return;}
        // } else {
        //     const playerExists = await Player.findOne({ name: req.body.name })
        //     .exec()
        // }
        // if (playerExists) {
        //     res.render("submitted", {
        //         title: "Already exists"
        //     })
        // } 
        else {
            await player.save()
            res.render("submitted", {
                title: "Submitted"
            })
        }
    }
    )
]

