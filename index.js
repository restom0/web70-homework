const express = require('express')
const app = express()
const logRequestTime = require('./middleware/logRequestTime');

const logRequestMethod = require('./middleware/logRequestMethod');
app.use(logRequestTime);
app.use(logRequestMethod);
const route = require("./routes");
route(app);
app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})