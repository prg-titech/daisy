// keyword
Blockly.defineBlocksWithJsonArray([{
    "type": "keyword",
    "message0": '%1',
    "args0": [
      {
        "type": "field_input",
        "name": "keyword",
        "check": "String"
      }
    ],
    "output": "keyword",
    "colour": 240,
}]);

// read keyword's 内容
Blockly.JavaScript["keyword"] = function (block) {
  let keyword = block.getFieldValue('keyword');
  return keyword;
};


