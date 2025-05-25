var timeoutID1 = "";
var timeoutID2 = "";


// TODO: blink function
function blink(badBlock) {
    var i = 0;

    for (i = 0; i < 10; i++) {
        badBlock.select();
        timeoutID1 = setTimeout(function() {badBlock.unselect();}, 200);
        timeoutID2 = setTimeout(blink, 400);
        i++;
        clearTimeout(timeoutID1)
        clearTimeout(timeoutID2)
        badBlock.unselect();
    }
};

function checkStep1b() {
    // check if user put the data type block
    var dataDefBlock = workspace.getBlocksByType("data_definition");
    if (dataDefBlock.length == 0) {
        alert("データ定義がありません。データ定義を作りましょう。");
        return;
    }
        
    for (const dataDefBlock of workspace.getBlocksByType("data_definition")) {
        // check if user put the data type name
        var dataTypeNameBlock = dataDefBlock.getInputTargetBlock("datatype_name");
        if (!dataTypeNameBlock) {
            alert("データ定義に名前をつけましょう。");
            return;
        }
        // check if user put the constructor block
        var constructorBlock = dataDefBlock.getInputTargetBlock("constructor");
        if (!constructorBlock) {
            alert("データ定義のコンストラクタを作りましょう。");
            return;
        }
    }

    // check constructor
    for (const consNoArgBlock of workspace.getBlocksByType("cons_noArg")) {
        var consNameBlock = consNoArgBlock.getInputTargetBlock("cons_name");
        try {
            var consName = consNameBlock.getFieldValue("keyword");
        } catch (error) {
            alert("コンストラクタに名前をつけましょう。")
            return;
        }
    }

    for (const consWithArgBlock of workspace.getBlocksByType("cons_withArg")) {
        var consNameBlock = consWithArgBlock.getInputTargetBlock("cons_name");
        try {
            var consName = consNameBlock.getFieldValue("keyword");
        } catch (error) {
            alert("コンストラクタに名前をつけましょう。")
            return;
        }

        // check arguments
        for (let i = 0; i < 10; i++) {
            var argBlock = consWithArgBlock.getInputTargetBlock("ADD" + i);
            // check if user put the argument block
            if (!argBlock) {
                // alert("コンストラクタに必要な引数を追加しましょう。");
                // return;
                break;
            }
            // check argument's name
            try {
                var argNameBlock = argBlock.getInputTargetBlock("arg_name");
                var argName = argNameBlock.getFieldValue("keyword");
            } catch (error) {
                alert("引数に名前をつけましょう。")
                return;
            }
            // check argument's data type
            try {
                var argDataTypeBlock = argBlock.getInputTargetBlock("datatype");
                var argDataType = argDataTypeBlock.getFieldValue("keyword");
            }
            catch (error) {
                alert("引数に適切なデータ型を付けましょう。")
                return;
            }
        }
    }

    make_step1c();
    
}

function checkStep1c() {
    var dataExampleBlock = workspace.getBlocksByType("data_example");
    var dataExBlocks = [];
    for (let i = 0; i < consList.length; i++) {
        const blocks = workspace.getBlocksByType(`data_ex${i}`);
        dataExBlocks = dataExBlocks.concat(blocks);
    }

    // no data example
    if (dataExampleBlock.length == 0 && dataExBlocks.length == 0) {
        alert("データ例がありません。データ例を作りましょう。");
        return;
    }

    // data_ex{n} has variable name
    for (const dataExBlock of dataExBlocks) {
        if (!dataExBlock.outputConnection || !dataExBlock.outputConnection.isConnected()) {
            alert("名前がないデータ例があります。データ例に名前をつけましょう。");
            return;
        }
    }

    // check for data_example
    for (const dataExampleBlock of workspace.getBlocksByType("data_example")) {
        // check if user put the variable name
        var variableName = dataExampleBlock.getFieldValue("variable");
        if (variableName == "" || variableName == "(データ型の名前)") {
            alert("データ型に名前をつけましょう。");
            return;
        }

        var dataExBlock = dataExampleBlock.getInputTargetBlock("data_ex");
        if (!dataExBlock) {
            alert("「" + variableName + "」のデータ例を作りましょう。");
            return;
        }
    }

    // check for data_ex{n}'s argument
    for (let i = 0; i < consList.length; i++) {
        const dataExBlocks = workspace.getBlocksByType(`data_ex${i}`); 
    
        let n_arg = argLists[i].length;
        for (const dataExBlock of dataExBlocks) { 
            for (let j = 0; j < n_arg; j++) {
                const arg = dataExBlock.getInputTargetBlock(`argValue${j}`);
                if (!arg) {
                    alert(`「${consList[i]}」の引数「${argLists[i][j]}」の値はまだ空です。`);
                    return;
                }
                else if (arg.getFieldValue("arg_value") == "" || arg.getFieldValue("arg_value") == "(引数の値)") {
                    alert("「" + argLists[i][j] + "」の引数の値を付けましょう。");
                    return;
                }
            }
        }
    }

    // alert for finishing the exercise
    alert("データ型とデータ例の作成の作業が完成しました。お疲れ様でした！右上の「保存」ボタンを押して、ファイルを google form にアップロードしてください。");
}