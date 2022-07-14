// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const Lexer = require("./lexer.js")
var grammar = {
    Lexer: Lexer,
    ParserRules: [
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) =>
        {
            return [data[1]]
        }
            },
    {"name": "statements", "symbols": ["statements", "mlNL", "_", "statement", "_"], "postprocess": 
        (data) =>
        {
            return[...data[0], data[3]]
        }
            },
    {"name": "mlNL$ebnf$1", "symbols": [(Lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "mlNL$ebnf$1", "symbols": ["mlNL$ebnf$1", (Lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mlNL", "symbols": ["mlNL$ebnf$1"]},
    {"name": "pmlNL$ebnf$1", "symbols": []},
    {"name": "pmlNL$ebnf$1", "symbols": ["pmlNL$ebnf$1", (Lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pmlNL", "symbols": ["pmlNL$ebnf$1"]},
    {"name": "statement", "symbols": ["assing_var"], "postprocess": id},
    {"name": "statement", "symbols": ["assing_fun"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "assing_fun", "symbols": [(Lexer.has("fnc") ? {type: "fnc"} : fnc), "__", (Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "__", "pmlNL", "fun_body"], "postprocess": 
        (data) =>
        {
            return {
                type: "Function assing",
                fun_type: data[2],
                fun_name: data[4],
                parameters: data[8],
                body: data[13]
            }
        }
            },
    {"name": "fun_body", "symbols": [{"literal":"{"}, "_", "mlNL", "statements", "mlNL", "_", {"literal":"}"}], "postprocess": 
        (data) =>
        {
            return data[3];
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "exp", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "declaration and assing",
                var_type: data[0],
                var_name: data[2],
                var_value: data[6]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "op", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "declaration and assing",
                var_type: data[0],
                var_name: data[2],
                var_value: data[6]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "func_call", "_"], "postprocess": 
        (data) =>
        {
            return {
                type: "declaration and assing f",
                var_type: data[0],
                var_name: data[2],
                var_value: data[6]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "func_call", "_"], "postprocess": 
        (data) =>
        {
            return {
                type: "assing f",
                var_name: data[0],
                var_value: data[4]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "exp", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: data[4]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "op", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: data[4]
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: {
                    type: "operation",
                    value: (String(data[2]) + " " + String(data[4]) + " ")
                    }
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", (Lexer.has("number") ? {type: "number"} : number), "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: {
                    type: "operation",
                    value: (String(data[2]) + " " + String(data[4]) + " ")
                    }
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", "op", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: {
                    type: "operation",
                    value: (String(data[2]) + " " + String(data[4].value))
                    }
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return {
                type: "declaration",
                var_name: data[2]
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("number") ? {type: "number"} : number), "_", "operator", "_", (Lexer.has("number") ? {type: "number"} : number)], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (String(data[0]) + " " + String(data[2]) + " " +String(data[4]))
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("number") ? {type: "number"} : number), "_", "operator", "_", {"literal":"("}, "_", "op", "_", {"literal":")"}], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2] + " " + "(" + " " + String(data[6].value) + " " + ")"))
            }
        }
            },
    {"name": "op", "symbols": [{"literal":"("}, "_", "op", "_", {"literal":")"}], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: ( "(" + " " + String(data[2].value) + " " + ")")
            }
        }
            },
    {"name": "op", "symbols": [{"literal":"("}, "_", "op", "_", {"literal":")"}, "_", "operator", "_", "op"], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: ( "(" + " " + String(data[2].value) + " " + ")" + " " + String(data[6]) + " " + String(data[8].value))
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", (Lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("number") ? {type: "number"} : number), "_", "operator", "_", (Lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", (Lexer.has("number") ? {type: "number"} : number)], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
            },
    {"name": "op", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", "operator", "_", {"literal":"("}, "_", "op", "_", {"literal":")"}], "postprocess": 
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2] + " " + "(" + " " + String(data[6].value) + " " + ")"))
            }
        }
            },
    {"name": "operator", "symbols": [{"literal":"+="}]},
    {"name": "operator", "symbols": [{"literal":"-="}]},
    {"name": "operator", "symbols": [{"literal":"*="}]},
    {"name": "operator", "symbols": [{"literal":"/="}]},
    {"name": "operator", "symbols": [{"literal":"%="}]},
    {"name": "operator", "symbols": [{"literal":"+"}]},
    {"name": "operator", "symbols": [{"literal":"-"}]},
    {"name": "operator", "symbols": [{"literal":"*"}]},
    {"name": "operator", "symbols": [{"literal":"/"}]},
    {"name": "operator", "symbols": [{"literal":"%"}]},
    {"name": "func_call", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return{
                type: "function_call",
                func_name: data[0],
                arg_list: data[4]
            }
        }
            },
    {"name": "func_call", "symbols": [(Lexer.has("id") ? {type: "id"} : id), {"literal":"."}, (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            return{
                type: "function_call",
                obj_id: data[0],
                func_name: data[2],
                arg_list: data[6]
            }
        }
            },
    {"name": "arg_list", "symbols": [], "postprocess": 
        (data) =>
        {
            return []
        }
            },
    {"name": "arg_list", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", "exp", "_", (Lexer.has("com") ? {type: "com"} : com), "__", "arg_list"], "postprocess": 
        (data) =>
        {
            return [data[0], ...data[6]]
        }
            },
    {"name": "arg_list", "symbols": ["exp", "_", (Lexer.has("com") ? {type: "com"} : com), "__", "arg_list"], "postprocess": 
        (data) =>
        {
            return [data[0], ...data[4]]
        }
            },
    {"name": "arg_list", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", "exp", "_"], "postprocess": 
        (data) =>
        {
            return [data[0]]
        }
            },
    {"name": "arg_list", "symbols": ["_", "str", "_"], "postprocess": 
        (data) =>
        {
            return[data[1]]
        }
            },
    {"name": "arg_list", "symbols": ["_", "val", "_"], "postprocess": 
        (data) =>
        {
            return[data[1]]
        }
            },
    {"name": "exp", "symbols": [(Lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "exp", "symbols": [(Lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "exp", "symbols": [(Lexer.has("id") ? {type: "id"} : id)], "postprocess": id},
    {"name": "exp", "symbols": [(Lexer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "str", "symbols": [(Lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "val", "symbols": [(Lexer.has("id") ? {type: "id"} : id)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (Lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(Lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (Lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
