const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")

// Middleware function for gettig subscriber object by ID
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null)
      return res.status(404).json({ message: "Cant find subscriber" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

//* Get all subscribers
router.get("/", async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//* Get one subscribers
router.get("/:id", getSubscriber, async (req, res, next) => {
  res.json(res.subscriber)
})

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
router.patch("/:id", getSubscriber, async (req, res, next) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }

  if (req.body.subscribedChannel != null) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//* Delete one subscribers
router.delete("/:id", getSubscriber, async (req, res, next) => {
  try {
    await res.subscriber.remove()
    res.json({
      message: `The subscriber named ${res.subscriber.name} has been deleted...`,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
