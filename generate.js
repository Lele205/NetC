let fs = require('fs');
const { listeners } = require('process');
const chalk = require("chalk");

module.exports =
{  

    genJS: function(filename, ast)
    {
        
        const myAssing = [];

        var lastFuncType = "";

        var co;

        function generateFromStatement(stat)
        {

            // list of basic and build-in function

            var myFunc = ["print", "LoadInterface", "StartServer", "clean"]

            // translation to js of function

            var jsFunc = ["console.log", "blib.LoadInterface", "blib.StartServer", "clean"]

            // window function

            var winFunction = ["LoadInterface", "StartServer"]

            if(stat.type == "declaration and assing")
            {
                co += 1;
                const out = `var ${stat.var_name.value} = ${stat.var_value.value};`
            
                var name = stat.var_name.value;
                var type = stat.var_type.value;
                var value = stat.var_value.value;

                if(stat.var_value.type === "operation")
                {
                    for(i in myAssing)
                    {
                        if(value.search(myAssing[i].name) !== -1)
                        {
                            if(myAssing[i].type !== type)
                            {
                                if(myAssing[i].type === "int" && type === "float")
                                {
                                    continue;
                                }
                                fs.writeFileSync("./ern.nco", "1");
                                throw new Error (chalk.red(`GENERATION ERROR 0x001 (Assing to a variable of type ${type} the value of var: ${myAssing[i].name} of type: ${myAssing[i].type})`));
                            } 
                        }
                    
                    }
                }


                for(i in myAssing)
                {
                    if(myAssing[i].name == value)
                    {
                        if(myAssing[i].type !== type)
                        {
                            fs.writeFileSync("./ern.nco", "1");
                            throw new Error (chalk.red(`GENERATION ERROR 0x001 (Assing to a variable of type ${type} the value of var: ${myAssing[i].name} of type: ${myAssing[i].type})`));
                        }
                        break;
                    }
                }

                var tmp = { name: "", type: ""};
                tmp.name = name;
                tmp.type = type;

                myAssing.push(tmp)

                

                return out;
            }
            else if (stat.type == "return")
            {
                var out = `return ${stat.value.value};`
                if(stat.value.type == "id")
                {
                    for(i in myAssing)
                        {
                            if(myAssing[i].name == stat.value.value)
                            {
                                if(myAssing[i].type != lastFuncType)
                                {
                                    fs.writeFileSync("./ern.nco", "1");
                                    throw new Error (chalk.red(`GENERATION ERROR 0x002 (return to a variable of type ${myAssing[i].type} in a function of type: ${lastFuncType})`));
                                }
                                break;
                            }
                        }
                }
                return out;
            }
            else if(stat.type == "Function assing")
            {
                var out = `function ${stat.fun_name.value}(`;
                
                lastFuncType = stat.fun_type.value;

                if(stat.parameters.length !== 0)
                {
                    if(stat.parameters.length !== 1)
                    {
                        for(var i = 0; i < stat.parameters.length - 1; i++)
                        {
                            out += `${stat.parameters[i].text}, `;
                        }
                        out += `${stat.parameters[stat.parameters.length - 1].text}`;
                    }
                    else
                    {
                        out += stat.parameters[0].text;
                    }
                }
            
                out += ")";

                // build the body

                out += "\n{"

                var arrBody = ['']
                for(let bb of stat.body)
                {
                    const li = generateFromStatement(bb);
                    arrBody.push(li);
                }
                for(var i = 0; i < co; i++)
                {
                    myAssing.pop();
                }

                co = 0;

                out += arrBody.join("\n\t");
                out += "\n}\n";
                if(stat.fun_name.value == "main")
                {
                    out += "\n\nmain()\n";
                }
                return out;

            }
            else if(stat.type == "assing")
            {

                const out = `${stat.var_name.value} ${stat.var_value.value};`
            
                var name = stat.var_name.value;
                var type;
                for(i in myAssing)
                {
                    if(myAssing[i].name == name)
                    {
                        type = myAssing[i].type;
                    }
                }
                var value = stat.var_value.value;

                if(stat.var_value.type === "operation")
                {
                    for(i in myAssing)
                    {
                        if(value.search(myAssing[i].name) !== -1)
                        {
                            if(myAssing[i].type !== type)
                            {
                                if(myAssing[i].type === "int" && type === "float")
                                {
                                    continue;
                                }
                                fs.writeFileSync("./ern.nco", "1");
                                throw new Error (chalk.red(`GENERATION ERROR 0x001 (Assing to a variable of type ${type} the value of var: ${myAssing[i].name} of type: ${myAssing[i].type})`));
                            } 
                        }
                    
                    }
                }


                for(i in myAssing)
                {
                    if(myAssing[i].name == value)
                    {
                        if(myAssing[i].type !== type)
                        {
                            fs.writeFileSync("./ern.nco", "1");
                            throw new Error (chalk.red(`GENERATION ERROR 0x001 (Assing to a variable of type ${type} the value of var: ${myAssing[i].name} of type: ${myAssing[i].type})`));
                        }
                        break;
                    }
                }


                return out;
            }
            else if(stat.type == "declaration")
            {
                co += 1;
                const out = `var ${stat.var_name.value};`
                var tmp = { name: "", type: ""};
                tmp.name = stat.var_name.value;
                tmp.type = stat.var_type.value;

                myAssing.push(tmp)
                return out;
            }
            else if(stat.type == "declaration and assing f")
            {
                co += 1;
                var out = `${stat.var_name.value} = ${stat.var_value.func_name.value}(`;
                
                var tmp = { name: "", type: ""};
                tmp.name = stat.var_name.value;
                tmp.type = stat.var_type.value;

                myAssing.push(tmp)

                if(stat.var_value.arg_list.length !== 1)
                {
                    for(var i = 0; i < stat.var_value.arg_list.length - 1; i++)
                    {
                        out += `${stat.var_value.arg_list[i].value}, `;
                    }
                    out += `${stat.var_value.arg_list[stat.var_value.arg_list.length - 1].value}`;
                }
                else
                {
                    out += stat.var_value.arg_list[0].value;
                }
                out += ");";



                return out;
            }
            else if(stat.type == "assing f")
            {
                var out = `${stat.var_name.value} = ${stat.var_value.func_name.value}(`;
                if(stat.var_value.arg_list.length !== 1)
                {
                    for(var i = 0; i < stat.var_value.arg_list.length - 1; i++)
                    {
                        out += `${stat.var_value.arg_list[i].value}, `;
                    }
                    out += `${stat.var_value.arg_list[stat.var_value.arg_list.length - 1].value}`;
                }
                else
                {
                    out += stat.var_value.arg_list[0].value;
                }
                out += ");";
                return out;
            }
            else if (stat.type == "function_call")
            {
                var out;
                var isList = false;
                for(var i  = 0; i < myFunc.length; i++)
                {
                    if(stat.func_name.value == myFunc[i])
                    {
                        out = `${jsFunc[i]}(`;
                        isList = true;
                        break;
                    }
                }
                if(isList)
                {
                    if(stat.obj_id !== undefined)
                    {
                        for(i in myAssing)
                        {
                            if(stat.obj_id == myAssing[i].name)
                            {
                                var not = true;
                                var str;
                                if(myAssing[i].type == "window")
                                {
                                    str = "window";
                                    for(j in winFunction)
                                    {
                                        if(winFunction[j] == stat.func_name.value)
                                        {
                                            not = false;
                                            break;
                                        }
                                    }
                                }
                                if(not)
                                {
                                    fs.writeFileSync("./ern.nco", "1");
                                    throw new Error (chalk.red(`GENERATION ERROR 0x003 (Calling to a variable of type ${myAssing[i].type} the function: ${stat.func_name.value}() of type: ${str} )`), );
                                }
                            }
                        
                        }
                    }
                }
                else
                {
                    out = `${stat.func_name.value}(`;
                }
                if(stat.arg_list.length !== 0)
                {
                    if(stat.arg_list.length !== 1)
                    {
                        for(var i = 0; i < stat.arg_list.length - 1; i++)
                        {
                            out += `${stat.arg_list[i].value}, `;
                        }
                        out += `${stat.arg_list[stat.arg_list.length - 1].value}`;
                    }
                    else
                    {
                        out += stat.arg_list[0].value;
                    }
                }
                out += ");";
                return out;
            }
        }

        function generateFromAst(ast)
        {
            const lines = [];
            lines.push("const blib = require('./basicLib.js')")
            for(let stat of ast)
            {
                const ll = generateFromStatement(stat);
                lines.push(ll);
            }
            return lines.join("\n");
        }

        // main part of the function where the ast file is loaded and then 
        // the code generated

        var out = generateFromAst(ast);

        var filen = (filename.replace(".nc", ".js"));
        fs.writeFileSync(filen, out);

    }
} 
