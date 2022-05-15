const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.status(404).send({
    status: "error",
    message: "No existe esta ruta",
  });
  next();
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
