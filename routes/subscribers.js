const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")

//* Get all subscribers
router.get("/", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//* Get all subscribers
router.get("/:id", async (req, res, next) => {})

//* Creat one subscribers
router.post("/", async (req, res, next) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel,
  })

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//* Update one subscribers
router.patch("/:id", async (req, res, next) => {})

//* Delete one subscribers
router.delete("/:id", async (req, res, next) => {})

module.exports = router
