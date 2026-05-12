const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running... ");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDb connected");
    app.listen(PORT, () => console.log(`server running on ${PORT}`));
  })
  .catch((err) => console.log(err));

const assignmentRoutes = require("./routes/assignmentsRoutes");
app.use("/api/assignments", assignmentRoutes);
