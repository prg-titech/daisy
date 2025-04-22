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
    }
}