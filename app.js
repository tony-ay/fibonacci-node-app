var express = require("express");
var app = express();

//return nth fibonacci number
function fibo(n) {
    if (n < 1) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fibo(n - 1) + fibo(n - 2);
    }
}

//express app listening on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

//handling get requests for fib url path
app.get("/fib", (req, res, next) => {
    try {
        res.json(fibo(parseInt(req.query.n)));
    }
    catch(e) {
        res.json("Please enter valid integer");
        throw new Error(e);
    }
});