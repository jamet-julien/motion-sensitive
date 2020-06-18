const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();

module.exports = suite
    .add("RegExp#test", function () {
        /o/.test("Hello World!");
    })
    .add("String#indexOf", function () {
        "Hello World!".indexOf("o") > -1;
    })
    .add("String#match", function () {
        !!"Hello World!".match(/o/);
    });
