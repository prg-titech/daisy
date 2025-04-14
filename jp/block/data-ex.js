Blockly.defineBlocksWithJsonArray([
    {
        "type": "specific_arg",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "specific_arg_value",
            },
        ],
        "output": "VALUE_example",
        "colour": 0,
        "tooltip": "arg",
        
    }
]);

// Blockly.JavaScript["specific_arg"] = function (block) {
//     return block.getFieldValue("specific_arg_value");
// };

Blockly.defineBlocksWithJsonArray([
    {
        "type": "example_name",
        "message0": '名前 %1 %2',
        "args0": [
            {
                "type": "field_input",
                "name": "example_name",
            },
            {
                "type": "input_value",
                "name": "example",
            },
        ],
      
        "colour": 40,
        "tooltip": "example_namme",
        
    }
]);

// Blockly.JavaScript["example_namme"] = function (block) {
//     return block.getFieldValue("example_namme");
// };