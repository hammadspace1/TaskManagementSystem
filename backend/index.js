const express = require("express");
const Connection = require("./Connection/Connection");
const router = require("./Routes/index.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth = require("./Middlewares/auth")

const app = express();
app.use(express.json());
app.use(cors());

Connection();


app.use(router);


const port = 5000;

app.listen(port, () => {
    console.log(`Your App is Listening on Port ${port}`)
});