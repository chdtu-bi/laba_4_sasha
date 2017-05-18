const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/calculate', (req, res) => {
    let result;
    let number1 = parseInt(req.query.number1);
    let number2 = parseInt(req.query.number2);
    switch (req.query.action) {
        case '+': result = number1 + number2; break;
        case '-': result = number1 - number2; break;
        case '*': result = number1 * number2; break;
        case '/': result = number1 / number2; break;
        default: res.sendStatus(400); return;
    }
    res.send(result.toString());
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.info('Listening on 3000 port...');
});