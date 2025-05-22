// data definition (green c-shape block)
Blockly.defineBlocksWithJsonArray([{
    "type": "data_definition",
    "message0": '%1 は次のケースを持つ:',
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

Blockly.JavaScript["define_data"] = function (block) {
    
    let data_name = block.getFieldValue("define_dataName");
    let cases = Blockly.JavaScript.statementToCode(block, "case")
    let space_cut_cases = cases.replace(/  case/g, "case")
    return "abstract class " +  data_name + "\n" + space_cut_cases;
};

// constructor with arguments (yellow)
Blockly.defineBlocksWithJsonArray([{
    "type": "cons_withArg",
    "message0": '%1 は次の情報を持つ:',
    "args0": [
        {
            "type": "input_value",
            "name": "cons_name",
            "check": ["keyword"]
        },
        // {
        //     "type": "input_value",
        //     "name": "argument",
        //     // "shape": Blockly.INPUT_SHAPE_SQUARE,
        //     "check": ["argument"],
        //     // "mutator": "text_join_mutator",
        // },
    ],
    "mutator": "cons_mutator",
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
            "name": "cons_name",
            "check": ["keyword"]
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
    "message0": '%1 は %2 型を持つ',
    "args0": [
        {
            "type": "input_value",
            "name": "arg_name",
            "check": ["keyword"]
        },
        {
            "type": "input_value",
            "name": "datatype",
            "check": ["keyword", "primitive-data"]
        },
    ],
    "output": "argument",
    "colour": 30,
    "inputsInline": true,
}]);

// primitive data type (blue)
// string
Blockly.defineBlocksWithJsonArray([{
    "type": "pd-string",
    "message0": 'String',
    "output": "primitive-data",
    "colour": 220,
}]);

// int
Blockly.defineBlocksWithJsonArray([{
    "type": "pd-int",
    "message0": 'Int',
    "output": "primitive-data",
    "colour": 220,
}]);

// double
Blockly.defineBlocksWithJsonArray([{
    "type": "pd-double",
    "message0": 'Double',
    "output": "primitive-data",
    "colour": 220,
}]);

// boolean
Blockly.defineBlocksWithJsonArray([{
    "type": "pd-boolean",
    "message0": 'Boolean',
    "output": "primitive-data",
    "colour": 220,
}]);

// primitive data type block
Blockly.defineBlocksWithJsonArray([{
    "type": "primitive-data",
    "message0": '%1',
    "args0": [
        {
          "type": "field_label",
          "name": "primitive-data",
          "check": "String"
        }
      ],
    "output": "primitive-data",
    "colour": 220,
}]);

//---------------------------------------


