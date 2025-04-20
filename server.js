const express = require("express");
const llm = require("./llm_interaction");
const app = express();

PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hi from server.js!"); // need to send an html file with the form for user
});

app.post("/get-assistance", (req, res) => {
  payload = req.body;
  if (payload === null || payload === undefined) {
    res.status(400, "Bad request");
  } else {
    console.log("payload: ", payload);
    llm.getHelp(payload, res);
  }
});

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}`);
});
