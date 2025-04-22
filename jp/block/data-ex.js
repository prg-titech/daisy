function build_dataExWithNoArg(n, consName) {
    Blockly.defineBlocksWithJsonArray([
        {
          "type": `data_ex${n}`,
          "message0": `%1 = ${consName}`,
          "args0": [
            {
              "type": "field_input",
              "name": "dataExName",
              "check": "String"
            }
          ],
          "colour": 0,
          "previousStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
          "nextStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
          "inputsInline": true,
        }
    ]);
}

function build_dataExWithArg(n, consName, argList) {
    // var message = `%1 は`;
    var message = `%1 = ${consName}(`;
    var arg = [{
        "type": "field_input",
        "name": "dataExName",
        "check": "String",
        // "text": `(${consName}のデータ例)`
    },];

    for (let i = 0; i < argList.length; i++) {
        if (i > 0) message += ", ";
        // message += `${argList[i]} %${i+2}`;
        message += `%${i+2}`;
        arg.push({
            "type": "field_input",
            "name": `argName${i}`,
            "check": "String",
            // "text": `(${argList[i]})`
          })
    }

    // message += `を持つ${consName}です。`;
    message += ")";



    Blockly.defineBlocksWithJsonArray([
        {
          "type": `data_ex${n}`,
          "message0": message,
          "args0": arg,
          "colour": 0,
          "previousStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
          "nextStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
          "inputsInline": true,
        }
    ]);
}

