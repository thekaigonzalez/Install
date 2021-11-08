/// $Id: install.js

function InstallScriptAST(code) {
    let buf = "";
    let varname = "";
    let varval = "";
    let argv = []
    let state = 0;
    for (let i = 0 ; i < code.length ; ++i) {
        if (code[i] == '-' && state != 96) {
            varname = buf.trim()
            if (code[i++] == '>') {
                state = 99;
            }

            state = 99

            buf = "";
        } else if (code[i] == '\'' && state == 99) {
            state = 96
        } else if (code[i] == '\'' && state == 96) {
            state = 99  
        } else if (code[i] == ' ' && state == 99) {
              argv.push(buf.trim())
              buf = ""
        } else {
            buf = buf + code[i]
        }
    }
    if (buf.trim().length > 0) {
    argv.push(buf.trim())
    }
    let ntab = {}

    ntab[varname] = argv
    argv.shift()
    return ntab
}

module.exports.compile = InstallScriptAST