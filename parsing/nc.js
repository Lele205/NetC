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
    {"name": "statement", "symbols": ["if_stat"], "postprocess": id},
    {"name": "statement", "symbols": ["assing_fun"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "assing_fun", "symbols": [(Lexer.has("fnc") ? {type: "fnc"} : fnc), "__", (Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "_", "pmlNL", "fun_body"], "postprocess": 
        (data) =>
        {
            data[13][0].push(data[13][1]);
            return {
                type: "Function assing",
                fun_type: data[2],
                fun_name: data[4],
                parameters: data[8],
                body: [...data[13][0]]
            }
        }
            },
    {"name": "fun_body", "symbols": [{"literal":"{"}, "_", "mlNL", "statements", "mlNL", "_", "return_stat", "_", "mlNL", "_", {"literal":"}"}], "postprocess": 
        (data) =>
        {
            return [data[3], data[6]];
        }
            },
    {"name": "fun_body", "symbols": [{"literal":"{"}, "_", "mlNL", "_", "return_stat", "_", "mlNL", "_", {"literal":"}"}], "postprocess": 
        (data) =>
        {
            return [data[1], data[4]];
        }
            },
    {"name": "return_stat", "symbols": [{"literal":"return"}, "_", (Lexer.has("number") ? {type: "number"} : number), "_", {"literal":";"}], "postprocess":   
        (data) =>
        {
            return {
                type: "return",
                value: data[2],
                r_t: "int | float"
            }
        }
            },
    {"name": "return_stat", "symbols": [{"literal":"return"}, "_", "op", "_", {"literal":";"}], "postprocess":   
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: "int | float"
            }
        }
            },
    {"name": "return_stat", "symbols": [{"literal":"return"}, "_", "rt_func_call", "_", {"literal":";"}], "postprocess":   
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: "fnc_call"
            }
        }
            },
    {"name": "return_stat", "symbols": [{"literal":"return"}, "_", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":";"}], "postprocess":   
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: data[2].value
            }
        }
            },
    {"name": "assing_var", "symbols": [(Lexer.has("types") ? {type: "types"} : types), "__", (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"="}, "_", "exp", "_", {"literal":";"}], "postprocess": 
        (data) =>
        {
            data[2].text = data[0].value;
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
            data[2].text = data[0].value;
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
            data[2].text = data[0].value;
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
            data[2].text = data[0].value;
            return {
                type: "declaration",
                var_type: data[0],
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
    {"name": "if_stat", "symbols": [(Lexer.has("if_t") ? {type: "if_t"} : if_t), "_", {"literal":"("}, "_", "if_args", "_", {"literal":")"}, "_", "mlNL", "_", "b_body"], "postprocess": 
        (data) =>
        {
            data[10][0].push(data[10][1]);
            
            return {
                type: "if",
                arg: data[4],
                body: data[10][0][1][0]
            }
        }
            },
    {"name": "nt_rtn_dep$ebnf$1", "symbols": []},
    {"name": "nt_rtn_dep$ebnf$1", "symbols": ["nt_rtn_dep$ebnf$1", "return_stat"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "nt_rtn_dep", "symbols": ["nt_rtn_dep$ebnf$1"]},
    {"name": "b_body", "symbols": [{"literal":"{"}, "_", "mlNL", "statements", "mlNL", "_", "nt_rtn_dep", "_", "mlNL", "_", {"literal":"}"}], "postprocess": 
        (data) =>
        {
            return [data[3], data[6]];
        }
            },
    {"name": "b_body", "symbols": [{"literal":"{"}, "_", "mlNL", "_", "nt_rtn_dep", "_", "mlNL", "_", {"literal":"}"}], "postprocess": 
        (data) =>
        {
            return [data[1], data[4]];
        }
            },
    {"name": "if_args", "symbols": ["_", (Lexer.has("id") ? {type: "id"} : id), "_", "logic_operetor", "_", (Lexer.has("id") ? {type: "id"} : id)], "postprocess": 
        (data) =>
        {
            return " " + String(data[1]) + " " + String(data[3]) + " " + String(data[5]) + " "
        }
            },
    {"name": "if_args", "symbols": ["_", (Lexer.has("id") ? {type: "id"} : id), "_", "logic_operetor", "_", "if_args"], "postprocess": 
        (data) =>
        {
            return " " + String(data[1]) + " " + String(data[3]) + " " + String(data[5]) + " "
        }
            },
    {"name": "if_args", "symbols": ["_", (Lexer.has("id") ? {type: "id"} : id), "_"], "postprocess": 
        (data) =>
        {
            return " " + String(data[1]) + " "
        }
            },
    {"name": "if_args", "symbols": ["_", "exp", "_"], "postprocess": 
        (data) =>
        {
            return [" " + String(data[1]) + " "]
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
    {"name": "logic_operetor", "symbols": [{"literal":"&"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"|"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"!"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"=="}]},
    {"name": "logic_operetor", "symbols": [{"literal":"!="}]},
    {"name": "logic_operetor", "symbols": [{"literal":"and"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"or"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"not"}]},
    {"name": "logic_operetor", "symbols": [{"literal":"equals"}]},
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
    {"name": "rt_func_call", "symbols": [(Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "_"], "postprocess": 
        (data) =>
        {
            return{
                type: "function_call",
                func_name: data[0],
                arg_list: data[4]
            }
        }
            },
    {"name": "rt_func_call", "symbols": [(Lexer.has("id") ? {type: "id"} : id), {"literal":"."}, (Lexer.has("id") ? {type: "id"} : id), "_", {"literal":"("}, "_", "arg_list", "_", {"literal":")"}, "_"], "postprocess": 
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
            data[0].text = data[2].value;
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
            data[0].text = data[2].value;
            return [data[0]]
        }
            },
    {"name": "arg_list", "symbols": ["_", "op", "_"], "postprocess": 
        (data) =>
        {
            return[data[1]]
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
    {"name": "arg_list", "symbols": ["_", (Lexer.has("number") ? {type: "number"} : number), "_"], "postprocess": 
        (data) =>
        {
            return [data[1]]
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
