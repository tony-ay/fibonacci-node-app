var express = require('express');
var app = express();
var path = require('path');

var PORT = process.env.PORT || 5000;

//return nth fibonacci number
function fiboHelper(n) {
    if (n === 0) {
        return [0, 1];
    }
    else {
        a = fiboHelper(Math.floor(n/2));
        b = a[0] * (a[1] * 2 - a[0]);
        c = a[0] * a[0] + a[1] * a[1];
        if (n % 2 === 0) {
            return [b, c];
        }
        else {
            return [c, b + c];
        }
    }
}

function fibo(n) {
    if (n < 0) {
        return "Can't process negative number"
    }
    return fiboHelper(n)[0];
}

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//basic root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//handling get requests for fib url path
app.get('/fib', (req, res) => {
    try {
        res.json(fibo(parseInt(req.query.n)));
    } catch (e) {
        res.json('Please enter valid integer');
        throw new Error(e);
    }
});

//express app listening
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
