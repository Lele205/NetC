const nearley = require("nearley");
const grammar = require("./nc.js");
const fs = require('mz/fs');
const chalk = require("chalk");
var gen = require('./generate.js');
const exec = require('child_process').exec;
const path = require('path');

async function main()
{
    const filename = process.argv[2];
    
    if(!filename)
    {
        console.log(chalk.red("Please give me an:"), chalk.green(".nc"), chalk.red("File"));
        fs.writeFileSync("./ern.nco", "1");
        return null;
    }
    if(!filename.endsWith(".nc"))
    {
        console.log(chalk.red(`The file "%s" is not an nc source file`), filename);
        fs.writeFileSync("./ern.nco", "1");
        return null;
    }
        const code  = (await fs.readFile(filename)).toString();
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

        try
        {
        parser.feed(code);
        } catch(e)
        {
            fs.writeFileSync("./ern.nco", "1");
            console.log(e);
            throw new Error(chalk.red("SYNTAX ERROR"));
        }
        if(parser.results.length > 1)
        {
            fs.writeFileSync("./ern.nco", "1");
            throw new Error(chalk.red("PARSER ERROR 0x001"));
        }
        else if(parser.results.length === 1)
        {
            const ast = parser.results[0];
            const output_fileName = filename.replace(".nc", ".ast");
            const file = (await fs.writeFile("./bin/" + output_fileName, JSON.stringify(ast, null, "  ")));
            console.log(chalk.green("\n\tPARSING COMPLETED!\n"));
            generateJS = gen.genJS(filename, ast);
            console.log(chalk.green("\tGENERATION COMPLETED!\n"));

            const jsFilname = filename.replace(".nc", ".js");
            var command = path.join(__dirname, "./runner.o") + " " +jsFilname;
            
        }
        else
        {
            fs.writeFileSync("./ern.nco", "1");
            throw new Error(chalk.red("PARSER ERROR 0x002"));
        }

        return null;

}

main().catch(err=> console.log(err.stack));