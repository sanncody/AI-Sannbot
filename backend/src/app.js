const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Started with GPT project");
});

module.exports = app;