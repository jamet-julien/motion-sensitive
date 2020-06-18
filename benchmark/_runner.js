const { MultiSelect } = require("enquirer");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");

const renderCompleted = (bench) =>
    `${chalk.bold("Completed")} ${chalk.grey("·")} ${chalk.cyan(bench)}`;

const renderFaster = (result) =>
    `${chalk.italic.blackBright(
        "The fastest is"
    )} ${chalk.bold.bgGreen.blackBright(` ${result} `)}`;

const makeOnHandlerCycle = (outPut) => (event) => {
    const {
        name,
        hz,
        stats: { rme }
    } = event.target;
    outPut.push({
        Name: name,
        "Ope by second": `${Math.round(hz).toLocaleString()} o/s`,
        "Margin of error": `±${rme.toFixed(2)}%`
    });
};

const makeOnHandlerComplete = (bench, outPut, spinner) =>
    function () {
        spinner.succeed(renderCompleted(bench));
        console.table(outPut);
        console.log(renderFaster(this.filter("fastest").map("name")));
    };

const launchBenchmark = (bench) => {
    const [name, _] = bench.split(".");
    const spinner = ora(`Loading "${chalk.green(name)}"`).start();
    try {
        const suite = require(`./bench/${bench}`);
        const outPut = [];
        suite
            .on("cycle", makeOnHandlerCycle(outPut))
            .on("complete", makeOnHandlerComplete(bench, outPut, spinner))
            .run({ async: true });
    } catch (error) {
        spinner.fail(`ERROR "${chalk.red(name)}"`);
        const listError = {
            "TypeError: suite.on is not a function":
                chalk.red("Check if the module exports an instance of ") +
                chalk.italic.cyan("new Benchmark.Suite()"),
            default: chalk.red(error)
        };
        console.log(listError[error] || listError["default"]);
    }
};

const onHandlerRead = function (err, list = []) {
    const listTreat = list.reduce(
        (g, f) => (~f.indexOf(".js") ? [...g, { name: f, value: f }] : g),
        []
    );
    if (listTreat.length === 0 || err) {
        const textError =
            chalk.red(err) ||
            `${chalk.red("No bench found on dir ")}${chalk.italic.greenBright(
                '"./benchmark/bench/"'
            )}`;
        console.log(textError);
        return false;
    }

    if (listTreat.length === 1) {
        launchBenchmark(listTreat[0].name);
        return true;
    }

    const prompt = new MultiSelect({
        name: "value",
        message: "Pick your bench to launch",
        limit: 7,
        choices: listTreat
    });

    prompt.run().then((tests) => {
        tests.map(launchBenchmark);
    });
};

fs.readdir("./benchmark/bench/", onHandlerRead);
