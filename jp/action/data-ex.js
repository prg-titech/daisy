function make_step1c() {
    data_ex = "";
    template_ex = "";

    // ↓ まだ確認してない (wip)
    // if (workspace.getBlocksByType("data_definition", false).length > 0) {

    //   console.log("data_definition");
    //   var ex_block_n = 0;
    //   var list_of_constructors = [];
    
    //   for (const case_no_arg_block of workspace.getBlocksByType("cons_noArg", false)) {
    //     var message = case_no_arg_block.getFieldValue("cons_name");
    //     list_of_constructors.push(message);
    
    //     Blockly.defineBlocksWithJsonArray([
    //       {
    //         "type": `data_ex${ex_block_n}`,
    //         "message0": message,
    //         "output": "VALUE_example",
    //         "colour": 0,
    //         "tooltip": "example_no_arg",
    //         "inputsInline": true,
    //       },
    //     ]);

    //     console.log("1");

    //     data_ex += `<block type="data_ex${ex_block_n}"></block>`;
    //     ex_block_n++;
    //   }
    // }

    if(workspace.getBlocksByType("data_definition", false).length > 0){
        document.getElementById("step1c").innerHTML = '<label text="データ例の作成" web-class="myLabelStyle"></label><sep gap="10"></sep>'+ 
        '<sep gap="5"></sep>' +  data_ex + '<sep  gap="100"></sep>';
        
        document.getElementById("step1c").hidden = "false";
        workspace.updateToolbox(document.getElementById("toolbox"));
    }
}
