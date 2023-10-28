import express from "express";

// get the port from the env or is 5050
const port = process.env.PORT || 5050;

const app = express();




app.listen(port, () => {
  console.log("the server is listening in port " + port);
});
