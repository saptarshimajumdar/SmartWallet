
const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

const PORT = 3000;
const app = express();

//use bodyParser / express.json()for all routes
app.use(express.json());
//enable cors for all routes
app.use(cors());

app.use('/api/v1',mainRouter);

app.listen(PORT,()=> console.log(`Server listening on ${PORT}`) );