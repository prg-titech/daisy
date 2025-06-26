var timeoutID1 = "";
var timeoutID2 = "";

// blink function
function blink(badBlock) {
    var i = 0;
    const blinkAux = function() {
        badBlock.select();
        timeoutID1 = setTimeout(function() {badBlock.unselect();}, 150);
        timeoutID2 = setTimeout(blinkAux, 300);
        i++;
        if (i > 5) {
            clearTimeout(timeoutID1);
            clearTimeout(timeoutID2);
            badBlock.unselect();
        }
    };
    blinkAux();
};

// ---------------

function checkStep1b() {
    // check if user put the data type block
    var dataDefBlock = workspace.getBlocksByType("data_definition");
    if (dataDefBlock.length == 0) {
        alert("Data type has not been defined yet.\nPlease create a data type first.");
        return;
    }
        
    for (const dataDefBlock of workspace.getBlocksByType("data_definition")) {
        // check if user put the data type name
        var dataTypeNameBlock = dataDefBlock.getInputTargetBlock("datatype_name");
        if (!dataTypeNameBlock) {
            blink(dataDefBlock);
            alert("Give a name to the data type.");
            return;
        }
        // check if user put the constructor block
        var constructorBlock = dataDefBlock.getInputTargetBlock("constructor");
        if (!constructorBlock) {
            blink(dataDefBlock);
            alert("Please add constructor(s) to the data type.");
            return;
        }
    }

    // check constructor
    for (const consNoArgBlock of workspace.getBlocksByType("cons_noArg")) {
        var consNameBlock = consNoArgBlock.getInputTargetBlock("cons_name");
        try {
            var consName = consNameBlock.getFieldValue("keyword");
        } catch (error) {
            blink(consNoArgBlock);
            alert("Give a name to the constructor.");
            return;
        }
    }

    for (const consWithArgBlock of workspace.getBlocksByType("cons_withArg")) {
        var consNameBlock = consWithArgBlock.getInputTargetBlock("cons_name");
        try {
            var consName = consNameBlock.getFieldValue("keyword");
        } catch (error) {
            blink(consWithArgBlock);
            alert("Give a name to the constructor.");
            return;
        }

        // check arguments
        for (let i = 0; i < 10; i++) {
            var argBlock = consWithArgBlock.getInputTargetBlock("ADD" + i);
            // check if user put the argument block
            if (!argBlock) {
                break;
            }
            // check argument's name
            try {
                var argNameBlock = argBlock.getInputTargetBlock("arg_name");
                var argName = argNameBlock.getFieldValue("keyword");
            } catch (error) {
                blink(argBlock);
                alert("Give a name to the argument.");
                return;
            }
            // check argument's data type
            try {
                var argDataTypeBlock = argBlock.getInputTargetBlock("datatype");
                var argDataType = argDataTypeBlock.getFieldValue("keyword");
            }
            catch (error) {
                blink(argBlock);
                alert("Give an appropriate data type to the argument.");
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
        alert("You have not created any data examples.\nPlease create data examples.");
        return;
    }

    // data_ex{n} has variable name
    for (const dataExBlock of dataExBlocks) {
        if (!dataExBlock.outputConnection || !dataExBlock.outputConnection.isConnected()) {
            blink(dataExBlock);
            alert("Found a data example without a name.\nPlease give a name to the data example.");
            return;
        }
    }

    // check for data_example
    for (const dataExampleBlock of workspace.getBlocksByType("data_example")) {
        // check if user put the variable name
        var variableName = dataExampleBlock.getFieldValue("variable");
        if (variableName == "" || variableName == "(insert name)") {
            blink(dataExampleBlock);
            alert("Give a name to the data example.");
            return;
        }

        var dataExBlock = dataExampleBlock.getInputTargetBlock("data_ex");
        if (!dataExBlock) {
            blink(dataExampleBlock);
            alert("\"" + variableName + "\" has not have any data example.\nPlease add a data example to it.");
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
                    blink(dataExBlock);
                    alert(`The argument value of "${argLists[i][j]}" is missing.\nPlease add the argument value.`);
                    return;
                }
                else if (arg.getFieldValue("arg_value") == "" || arg.getFieldValue("arg_value") == "(insert value)") {
                    blink(arg);
                    alert(`Deffine the value of the argument "${argLists[i][j]}".`);
                    return;
                }
            }
        }
    }

    // alert for finishing the exercise
    alert("Congratulations! You have completed the information modeling exercise.");
}