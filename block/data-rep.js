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
            "check": ["cons_withArg", "cons_noArg"]

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
            "name": "cons_name",
            "check": ["keyword"]
        },
        {
            "type": "input_value",
            "name": "argument",
            // "shape": Blockly.INPUT_SHAPE_SQUARE,
            "check": ["argument"]
        },
    ],
    // "mutator": "cons_withArg_mutator",
    "previousStatement": ["cons_withArg", "cons_noArg"],
    "nextStatement": ["cons_withArg", "cons_noArg"],
    // "output": "cons_withArg",
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
    "previousStatement": ["cons_withArg", "cons_noArg"],
    "nextStatement": ["cons_withArg", "cons_noArg"],
    // "output": "cons_noArg",
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
        }
    ],
    "output": "argument",
    "colour": 30,
    "inputsInline": true,
}]);


