const player_schema = require("../models/players");
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_create_post = (req, res, next) => {
    body("name")
    .trim()
    .withMessage("Name empty."),

    asyncHandler(async(req, res, next) => {
         // Extract the validation errors from a request.
        const errors = validationResult(req);
    })
}
