// define constructor name block
Blockly.defineBlocksWithJsonArray([{
  "type": "cons_name",
  "message0": '%1',
  "args0": [
    {
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
      "type": "field_input",
      "name": "arg_name",
      "check": "String"
    }
  ],
  "output": "arg_name",
  "colour": 30,
}]);

// -----------------

// build data example block
function build_dataExWithNoArg(n, consName) {
    Blockly.defineBlocksWithJsonArray([
        {
          "type": `data_ex${n}`,
          "message0": `%1 は %2`,
          "args0": [
            {
              "type": "field_input",
              "name": "dataExName",
              "check": "String"
            },
            {
              "type": "input_value",
              "name": "consName",
              "check": "cons_name",
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
    // for every element in argList, make a block of it

  
    var message = `%1 は`;
    // var message = `%1 = ${consName}(`;
    var arg = [{
        "type": "field_input",
        "name": "dataExName",
        "check": "String",
        // "text": `(${consName}のデータ例)`
    },];

    for (let i = 0; i < argList.length; i++) {
        if (i > 0) message += ", ";

        var argNameNum = 2 * (i + 1);
        var argInputNum = 2 * (i + 1) + 1;
        message += `%${argNameNum}が%${argInputNum}`;
        // message += `%${i+2}`;
        
        arg.push({
          // arg name
          "type": "input_value",
          "name": `argName${i}`,
          "check": "arg_name",
        },
        // arg input
        {
          "type": "field_input",
          "name": `argInput${i}`,
          "check": "String",
          // "text": `(${argList[i]})`
        }
      )
    }

    // field for constructor name
    var consNameNum = 2 * (argList.length + 1);
    message += `を持つ%${consNameNum}`;
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
          "colour": 0,
          "previousStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
          "nextStatement": Array.from({ length: 999 }, (_, i) => `data_ex${i}`),
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

// function insertNameBlock(n, consName, argList) {
//   const blocks = workspace.getBlocksByType(`data_ex${n}`);
//   block = blocks[0];
//   console.log(blocks);
//   console.log(block);

//   // insert constructor name block
//   const consNameBlock = workspace.newBlock("keyword");
//   consNameBlock.initSvg();
//   consNameBlock.setColour(60);
//   consNameBlock.setFieldValue(consName, "keyword");
//   consNameBlock.render();

  
//   // Connect the constructor name block to the input_value slot
//   console.log(block.getInput("consName"));
//   const consNameInputConnection = block.getInput("consName").connection;
//   if (consNameInputConnection && consNameBlock.outputConnection) {
//       consNameInputConnection.connect(consNameBlock.outputConnection);
//   }


//   // ----------
//   // insert argument name blocks
//   for (let i = 0; i < argList.length; i++) {
//     const argNameBlock = workspace.newBlock("keyword");
//     argNameBlock.initSvg();
//     argNameBlock.setColour(30);
//     argNameBlock.setFieldValue(argList[i], "keyword");
//     argNameBlock.render();

//     // Connect the argument name block to the input_value slot
//     const argNameInputConnection = block.getInput(`argName${i}`).connection;
//     if (argNameInputConnection && argNameBlock.outputConnection) {
//         argNameInputConnection.connect(argNameBlock.outputConnection);
//     }
//   }

// }

