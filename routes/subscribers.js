const express = require("express")
const router = express.Router()

//* Get all subscribers
router.get("/", function (req, res, next) {})

//* Get all subscribers
router.get("/:id", function (req, res, next) {})

//* Creat one subscribers
router.post("/", function (req, res, next) {})

//* Update one subscribers
router.patch("/:id", function (req, res, next) {})

//* Delete one subscribers
router.delete("/:id", function (req, res, next) {})

module.exports = router
