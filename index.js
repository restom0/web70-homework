const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello, this is homepage')
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000")
})