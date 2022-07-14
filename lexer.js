const moo = require('moo');
const fs = require('fs');

let lexer = moo.compile
({
    WS: /[ \t]+/,
    comment: /\/\/.*?$/,
    number: /0|[0-9]*[.][0-9]*|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lpar: "(",
    rpar: ")",
    lbr:  "{",
    rbr:  "}",
    qlpar:"[",
    qrpar:"]",
    e_p:  "+=",
    e_m:  "-=",
    e_mu: "*=",
    e_di: "/=",
    e_mo: "%=",
    not:  "!",
    and:  "&",
    or:   "|",
    at:   "@",
    eq:   "=",
    plus: "+",
    minus:"-",
    mul:  "*",
    div:  "/",
    mod:  "%",
    sc:   ";",
    com:  ",",
    NL:      { match: /\n|\r/, lineBreaks: true },
    types: ['int', 'float', 'double', 'string', 'array', 'matrix', 'file', 'vector', "window", 'bool'],
    fnc: 'function',
    keywords: ['while', 'for', 'if', 'elif', 'else', 'switch', 'class', 'public', 'private', 'constructor', 'deconstructor', 'use', 'struct', 'return', 'and', 'or', 'in'],
    bool: ["true", "false"],
    id: /[a-zA-Z][a-zA-Z_0-9]*/,
})

module.exports = lexer;
