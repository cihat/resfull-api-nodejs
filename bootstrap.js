const mongoose = require("mongoose")

const connectionString =
  process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/subscribers"

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to database"))
