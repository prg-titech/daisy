// TODO: 1bのalertを改善せよ

function checkStep1b() {
    // check if user put the data type block
    var dataDefBlock = workspace.getBlocksByType("data_definition");
    if (dataDefBlock.length == 0) {
        alert("データ定義がありません。データ定義を作りましょう。");
        return;
    }
    else {
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

        // TODO: check argument

        // TODO: check argument's data type

    }
}

function checkStep1c() {
    var dataExampleBlock = workspace.getBlocksByType("data_example");
    if (dataExampleBlock.length == 0) {
        alert("データ例がありません。データ例を作りましょう。");
        return;
    }
    else{
        // check for data_example
        for (const dataExampleBlock of workspace.getBlocksByType("data_example")) {
            // check if user put the variable name
            var variableName = dataExampleBlock.getFieldValue("variable");
            if (variableName == "" || variableName == "(変数名)") {
                alert("変数名をつけましょう。");
                return;
            }

            var dataExBlock = dataExampleBlock.getInputTargetBlock("data_ex");
            if (!dataExBlock) {
                alert("「" + variableName + "」のデータ例を作りましょう。");
                return;
            }
        }

        // TODO: check for data_ex{n}
        // for (let i = 0; i < argList.length; i++) {

        // }

        // TODO: check arg_value
        for (const argValueBlock of workspace.getBlocksByType("arg_value")) {
            // check if user put the argument value
            var argValue = argValueBlock.getFieldValue("arg_value");
            if (argValue == "" || argValue == "(引数の値)") {
                alert("引数の値をつけましょう。");
                return;
            }
        }
    }
    
}