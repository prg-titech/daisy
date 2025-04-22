function make_step1c() {
    data_ex = "";
    template_ex = "";

    // make sure that user define an approporiate data type
    checkStep1b();

    if (workspace.getBlocksByType("data_definition", false).length > 0) {

        var ex_block_n = 0;
        var consList = [];

        // for cons_NoArg
        for (const consNoArgBlock of workspace.getBlocksByType("cons_noArg")) {
            var consNameBlock = consNoArgBlock.getInputTargetBlock("cons_name");

            try {
                var consName = consNameBlock.getFieldValue("keyword");
            } catch (error) {
                alert("コンストラクタに名前をつけましょう。")
                return;
            }

            consList.push(consName);
        
            // make data example block (red)
            build_dataExWithNoArg(ex_block_n, consName);

            data_ex += `<block type=data_ex${ex_block_n}></block><sep gap="10"></sep>`;

            ex_block_n++;
        }

        // for cons_withArg
        for (const consWithArgBlock of workspace.getBlocksByType("cons_withArg")) {
            // number of constructors that have arguments
            var consNameBlock = consWithArgBlock.getInputTargetBlock("cons_name");
            try {
                var consName = consNameBlock.getFieldValue("keyword");
            } catch (error) {
                alert("コンストラクタに名前をつけましょう。")
                return;
            }

            consList.push(consName);

            // record arguments for each constructor
            var argList = [];

            for (let i = 0; i < 10; i++) {
                try {
                    var argBlock = consWithArgBlock.getInputTargetBlock("ADD" + i);
                    if (!argBlock) break;
                } catch (error) {
                    break;
                }
                try {
                    var argNameBlock = argBlock.getInputTargetBlock("arg_name");
                    var argName = argNameBlock.getFieldValue("keyword");
                } catch (error) {
                    alert("引数に名前をつけましょう。")
                    return;
                }
                argList.push(argName);
            }
        
            // make data example block (red)
            build_dataExWithArg(ex_block_n, consName, argList);
    
            data_ex += `<block type=data_ex${ex_block_n}></block><sep gap="10"></sep>`;
    
            ex_block_n++;
        }
    }

    if(workspace.getBlocksByType("data_definition", false).length > 0){
        document.getElementById("step1c").innerHTML = '<label text="データ例の作成" web-class="myLabelStyle"></label><sep gap="10"></sep>'+ 
        '<sep gap="10"></sep>' +  data_ex + '<sep  gap="100"></sep>';
        
        document.getElementById("step1c").hidden = "false";
        workspace.updateToolbox(document.getElementById("toolbox"));
    }
}
