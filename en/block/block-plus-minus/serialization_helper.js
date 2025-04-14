// serialization_helper.js
function getExtraBlockState(block) {
    // TODO: This is a dupe of the BlockChange.getExtraBlockState code, do we
    //    want to make that public?
    if (block.saveExtraState) {
      const state = block.saveExtraState();
      return state ? JSON.stringify(state) : '';
    } else if (block.mutationToDom) {
      const state = block.mutationToDom();
      return state ? Blockly.Xml.domToText(state) : '';
    }
    return '';
  }