@{%
    const Lexer = require("./lexer.js")
%}

@lexer Lexer

statements
    -> _ statement _
    {%
        (data) =>
        {
            return [data[1]]
        }
    %}
    | statements mlNL _ statement _ 
    {%
        (data) =>
        {
            return[...data[0], data[3]]
        }
    %}


mlNL -> %NL:+
pmlNL -> %NL:*

statement
    -> assing_var   {% id %}
    | if_stat       {% id %}
    | assing_fun    {% id %}
    | func_call     {% id %}

assing_fun
    -> %fnc __ %types __ %id _ "(" _ arg_list _ ")" _ pmlNL fun_body 
    {%
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
    %}

fun_body
    -> "{" _ mlNL statements mlNL _ return_stat  _ mlNL _ "}"
    {%
        (data) =>
        {
            return [data[3], data[6]];
        }
    %}
    | "{" _ mlNL _ return_stat  _ mlNL _ "}"
    {%
        (data) =>
        {
            return [data[1], data[4]];
        }
    %}

return_stat
    ->  "return" _ %number _ ";"
    {%  
        (data) =>
        {
            return {
                type: "return",
                value: data[2],
                r_t: "int | float"
            }
        }
    %}

    |  "return" _ op _ ";"
    {%  
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: "int | float"
            }
        }
    %}

    |  "return" _ rt_func_call _ ";"
    {%  
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: "fnc_call"
            }
        }
    %}

    |  "return" _ %id _ ";"
    {%  
        (data) =>
        {
        
            return {
                type: "return",
                value: data[2],
                r_t: data[2].value
            }
        }
    %}

assing_var
    -> %types __ %id _ "=" _ exp _ ";"
    {%
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
    %}

    | %types __ %id _ "=" _ op _ ";"
    {%
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
    %}

    | %types __ %id _ "=" _ func_call _
    {%
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
    %}

    | %id _ "=" _ func_call _
    {%
        (data) =>
        {
            
            return {
                type: "assing f",
                var_name: data[0],
                var_value: data[4]
            }
        }
    %} 

    | %id _ "=" _ exp _ ";"
    {%
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: data[4]
            }
        }
    %}

    | %id _ "=" _ op _ ";"
    {%
        (data) =>
        {
            return {
                type: "assing",
                var_name: data[0],
                var_value: data[4]
            }
        }
    %}

    | %id _ operator _ %id _ ";"
    {%
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
    %} 

    | %id _ operator _ %number _ ";"
    {%
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
    %} 

    | %id _ operator _ op _ ";"
    {%
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
    %} 

    | %types __ %id _ ";"
    {%
        (data) =>
        {
            data[2].text = data[0].value;
            return {
                type: "declaration",
                var_type: data[0],
                var_name: data[2]
            }
        }
    %}

op
    -> %number _ operator _ %number
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (String(data[0]) + " " + String(data[2]) + " " +String(data[4]))
            }
        }
    %}

    | %number _ operator _ "(" _ op _ ")"
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2] + " " + "(" + " " + String(data[6].value) + " " + ")"))
            }
        }
    %} 

    | "(" _ op _ ")"
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: ( "(" + " " + String(data[2].value) + " " + ")")
            }
        }
    %} 

    | "(" _ op _ ")" _ operator _ op
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: ( "(" + " " + String(data[2].value) + " " + ")" + " " + String(data[6]) + " " + String(data[8].value))
            }
        }
    %}

    | %id _ operator _ %id
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
    %}
    | %number _ operator _ %id
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
    %}
    | %id _ operator _ %number
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4]) + " ")
            }
        }
    %}

    | %id _ operator _ func_call
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2]) + " " +String(data[4].fun_name.value) + " ")
            }
        }
    %}

    | %id _ operator _ "(" _ op _ ")"
    {%
        (data) =>
        {
            return {
                type: "operation",
                value: (" " + String(data[0]) + " " + String(data[2] + " " + "(" + " " + String(data[6].value) + " " + ")"))
            }
        }
    %}    

if_stat
    -> %if_t _ "(" _ if_args _ ")" _ mlNL _ b_body 
    {%
        (data) =>
        {
            data[10][0].push(data[10][1]);
            
            return {
                type: "if",
                arg: data[4],
                body: data[10][0][1][0]
            }
        }
    %}

nt_rtn_dep -> return_stat:*

b_body
     -> "{" _ mlNL statements mlNL _ nt_rtn_dep  _ mlNL _ "}"
    {%
        (data) =>
        {
            return [data[3], data[6]];
        }
    %}
    | "{" _ mlNL _ nt_rtn_dep  _ mlNL _ "}"
    {%
        (data) =>
        {
            return [data[1], data[4]];
        }
    %}

if_args
    -> _ %id _ logic_operetor _ %id 
    {%
        (data) =>
        {
            return " " + String(data[1]) + " " + String(data[3]) + " " + String(data[5]) + " "
        }
    %}

    | _ %id _ logic_operetor _ if_args 
    {%
        (data) =>
        {
            return " " + String(data[1]) + " " + String(data[3]) + " " + String(data[5]) + " "
        }
    %}
    
    | _ %id _
    {%
        (data) =>
        {
            return " " + String(data[1]) + " "
        }
    %}

    | _ exp _
    {%
        (data) =>
        {
            return [" " + String(data[1]) + " "]
        }
    %}



operator
    -> "+=" 
    | "-="  
    | "*="  
    | "/="  
    | "%="  
    | "+"   
    | "-"   
    | "*"   
    | "/"   
    | "%"   

logic_operetor
    -> "&"
    | "|"
    | "!"
    | "=="
    | "!="
    | "and"
    | "or"
    | "not"
    | "equals"

func_call
    -> %id _ "(" _ arg_list _ ")" _ ";"
    {%
        (data) =>
        {
            return{
                type: "function_call",
                func_name: data[0],
                arg_list: data[4]
            }
        }
    %}
    | %id "." %id _ "(" _ arg_list _ ")" _ ";"
    {%
        (data) =>
        {
            return{
                type: "function_call",
                obj_id: data[0],
                func_name: data[2],
                arg_list: data[6]
            }
        }
    %}

rt_func_call
    -> %id _ "(" _ arg_list _ ")" _ 
    {%
        (data) =>
        {
            return{
                type: "function_call",
                func_name: data[0],
                arg_list: data[4]
            }
        }
    %}
    | %id "." %id _ "(" _ arg_list _ ")" _ 
    {%
        (data) =>
        {
            return{
                type: "function_call",
                obj_id: data[0],
                func_name: data[2],
                arg_list: data[6]
            }
        }
    %}

arg_list

    -> null
    {%
        (data) =>
        {
            return []
        }
    %}

    | %types __ exp _ %com __ arg_list
    {%
        (data) =>
        {
            data[0].text = data[2].value;
            return [data[0], ...data[6]]
        }
    %}

    | exp _ %com __ arg_list
    {%
        (data) =>
        {
            return [data[0], ...data[4]]
        }
    %}

    | %types __ exp _ 
    {%
        (data) =>
        {
            data[0].text = data[2].value;
            return [data[0]]
        }
    %}

    | _ op _ 
    {%
        (data) =>
        {
            return[data[1]]
        }
    %}

    | _ str _ 
    {%
        (data) =>
        {
            return[data[1]]
        }
    %}

    | _ val _ 
    {%
        (data) =>
        {
            return[data[1]]
        }
    %}

    | _ %number _ 
    {%
        (data) =>
        {
            return [data[1]]
        }
    %}
 
exp 
    -> %string  {% id %}
    |  %number  {% id %}
    |  %id      {% id %}
    |  %bool    {% id %}

str 
    -> %string  {% id %}

val
    -> %id      {% id %}

_ -> %WS:*

__ -> %WS:+