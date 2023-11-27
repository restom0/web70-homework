const express = require('express')
const app = express()


const route = require("./routes");
route(app);
app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})