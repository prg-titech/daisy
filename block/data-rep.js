// data definition (green c-shape block)
Blockly.defineBlocksWithJsonArray([{
    "type": "data_definition",
    "message0": '%1 has following cases:',
    "args0": [
        {
            "type": "input_value",
            "name": "datatype_name",
            "check": ["keyword"]
        }
    ],
    "message1": '%1',
    "args1": [
        {
            "type": "input_statement",
            "name": "constructor",
            "check": ["cons_withArg"]

        }
    ],
    "colour": 160,
  }]);

// constructor with arguments (yellow)
Blockly.defineBlocksWithJsonArray([{
    "type": "cons_withArg",
    "message0": '%1 has %2',
    "args0": [
        {
            "type": "input_value",
            "name": "cons_name"
        },
        {
            "type": "input_value",
            "name": "argument",
            // "shape": Blockly.INPUT_SHAPE_SQUARE,
            "check": ["argument"]
        },
    ],
    "previousStatement": "cons_withArg",
    "nextStatement": "cons_withArg",
    // "output": null,
    "colour": 60,
    "inputsInline": true,
}]);

// constructor without arguments (yellow)
Blockly.defineBlocksWithJsonArray([{
    "type": "cons_noArg",
    "message0": '%1',
    "args0": [
        {
            "type": "input_value",
            "name": "cons_name"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "inputsInline": true,
}]);

// argument (orange)
Blockly.defineBlocksWithJsonArray([{
    "type": "argument",
    "message0": '%1 of type %2 %3',
    "args0": [
        {
            "type": "input_value",
            "name": "arg_name",
            "check": ["keyword"]
        },
        {
            "type": "input_value",
            "name": "datatype",
            "check": ["keyword"]
        },
        {
            "type": "input_value",
            "name": "otherArg",
            "check": ["argument"],
            "shape": Blockly.INPUT_SHAPE_SQUARE,
        }
    ],
    "output": "VALUE",
    "colour": 30,
    "inputsInline": true,
    "outputShape": Blockly.OUTPUT_SHAPE_SQUARE
}]);


