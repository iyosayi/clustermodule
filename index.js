const express = require("express");
const os = require("os");
const cluster = require("cluster");
const primes = require("./primes");

//Do this now

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.status(200).json({ message: "I am learning about cluster module" });
  });

  //Calculate prime numbers, ignore the commented part
  app.get("/primes", (req, res) => {
    const primeNum = [];
    const max = parseInt(req.query.max || 1000);
    for (let i = 0; i <= max; i++) {
      if (primes(i)) primeNum.push(i);
    }
    res.json(primeNum);
    // function fib(x) {
    //   if (x < 3) return 1;
    //   else {
    //     return fib(x - 1) + fib(x - 2);
    //   }
    // }
    // let num = parseInt(req.params.num);
    // console.log(num);
    // res.send(`${fib(num)}`);
    // res.end();
  });

  app.listen(5000, () => console.log("I am listening"));
}

//And this!!
cluster.on("exit", (worker) => {
  console.log(`i am dying with pid ${worker.id}`);
  cluster.fork();
});
