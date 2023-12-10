const express = require('express')
const app = express()
const logRequestTime = require('./middlewares/logRequestTime');
const { connectToDB } = require('./utils/database/index.js');
const logRequestMethod = require('./middlewares/logRequestMethod');
app.use(logRequestTime);
app.use(logRequestMethod);
const route = require("./routes");
route(app);


connectToDB();
app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})