// array that consist data_ex0, data_ex1, data_ex2, ..., "arg_value"
var dataExArray = Array.from({ length: 999 }, (_, i) => `data_ex${i}`);
dataExArray.push("arg_value");

// define constructor name block
Blockly.defineBlocksWithJsonArray([{
  "type": "cons_name",
  "message0": '%1',
  "args0": [
    {
      // "type": "field_label",
      "type": "field_input",
      "name": "cons_name",
      "check": "String"
    }
  ],
  "output": "cons_name",
  "colour": 60,
}]);

// define argument names block
Blockly.defineBlocksWithJsonArray([{
  "type": "arg_name",
  "message0": '%1',
  "args0": [
    {
      // "type": "field_label",
      "type": "field_input",
      "name": "arg_name",
      "check": "String"
    }
  ],
  "output": "arg_name",
  "colour": 30,
}]);

// make block contains variable name and data example block
Blockly.defineBlocksWithJsonArray([{
  "type": "data_example",
  "message0": '%1 は %2',
  "args0": [
    {
      "type": "field_input",
      "name": "variable",
      "check": "String",
      "text": "(データ型の名前)",
    },
    {
      "type": "input_value",
      "name": "data_ex",
      "check": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
    }
  ],
  "colour": 0,
  "previousStatement": "data_example",
  "nextStatement": "data_example",
  "inputsInline": true,
}]);

// argument's value block
Blockly.defineBlocksWithJsonArray([{
  "type": "arg_value",
  "message0": '%1',
  "args0": [
    {
      "type": "field_input",
      "name": "arg_value",
      "check": "String",
      "text": "(引数の値)",
    }
  ],
  "output": "arg_value",
  "colour": 0,
}]);

// -----------------



// build data example block
function build_dataExWithNoArg(n, consName) {
    Blockly.defineBlocksWithJsonArray([
        {
          "type": `data_ex${n}`,
          "message0": `%1`,
          "args0": [
            {
              "type": "input_value",
              "name": "consName",
              "check": "cons_name",
            }
          ],
          "output": `data_ex${n}`,
          "colour": 0,
          "inputsInline": true,
        }
    ]);
}

function build_dataExWithArg(n, consName, argList) {
    var message = ``;
    var arg = [];

    for (let i = 0; i < argList.length; i++) {
        if (i > 0) message += ", ";

        var argNameNum = 2 * (i + 1) - 1;
        var argValueNum = 2 * (i + 1);
        message += `%${argNameNum}が%${argValueNum}`;
        
        arg.push({
          // arg name
          "type": "input_value",
          "name": `argName${i}`,
          "check": "arg_name",
        },
        // arg input
        {
          "type": "input_value",
          "name": `argValue${i}`,
          "check": dataExArray,
        }
      )
    }

    // field for constructor name
    var consNameNum = 2 * (argList.length + 1) - 1;
    message += `の%${consNameNum}`;
    arg.push({
        "type": "input_value",
        "name": "consName",
        "check": "cons_name",
    })



    Blockly.defineBlocksWithJsonArray([
        {
          "type": `data_ex${n}`,
          "message0": message,
          "args0": arg,
          "output": `data_ex${n}`,
          "colour": 0,
          "inputsInline": true,
        }
    ]);

}

function insertNameBlock(n, consName, argList) {
    var consNameXML = 
    `<value name = "consName">
        <block type="cons_name">
            <field name="cons_name">${consName}</field>
        </block>
    </value>`

    var argNameXML = "";
    for (let i = 0; i < argList.length; i++) {
        argNameXML += 
        `<value name = "argName${i}">
            <block type="arg_name">
                <field name="arg_name">${argList[i]}</field>
            </block>
        </value>`;
    }

    return consNameXML + argNameXML;
}




// ----------
