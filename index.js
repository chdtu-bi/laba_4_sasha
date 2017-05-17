const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', (req, res) => {
    console.log(JSON.stringify(req, 1));
    res.send(5);
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.info('Listening on 3000 port...');
});