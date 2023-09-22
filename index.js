const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express()
const detenv = require("dotenv").config()
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dbConnect();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/user", authRouter)

app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en ${PORT}`)
})
