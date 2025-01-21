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
    "output": null,
    "colour": 240,
}]);

//placebo
Blockly.defineBlocksWithJsonArray([{
    "type": "keyword2",
    "message0": '%1',
    "args0": [
      {
        "type": "field_input",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": null,
    "colour": 180,
}]);

// ---------------------------------------



// ---------------------------------------

// array of keywords
var existingKeywords = [];

// ---------------
// --- add keyword functions --- //

// selector (ver2)
function selector() {
    var selObj = document.getSelection();

    // highlight the keyword selected
    if (selObj.rangeCount > 0 && selObj != "") {
        var range = selObj.getRangeAt(0);
        var span = document.createElement('span');
        span.style.backgroundColor = 'yellow';

        try {
            range.surroundContents(span);
        } catch (error) {
            alert("Cannot select text more than once.")
            return;
        }

        // make a block out of the keyword
        var selectedKeyword = selObj.toString();
        console.log(selectedKeyword);
        newKeyword(selectedKeyword);

    } else {
        addKeyword();
    }
}

// inesrt keyword to array and create block
// 20250112 TODO: improve the function name
function newKeyword(keyword) {
    if (keyword != null && !existingKeywords.includes(keyword)) {
        // add keyword to the array
        existingKeywords.push(keyword);

        var category1a = document.getElementById("step1a");
        var category1b = document.getElementById("step1b");
        var newXML = '<block type="keyword"><field name="keyword">' + keyword + '</field></block>';
        
        // add xml block to step1a and step1b
        category1a.innerHTML += newXML;
        category1b.innerHTML += newXML;

        workspace.updateToolbox(document.getElementById("toolbox"));

        alert("Keyword \"" + keyword + "\" added");
        updateDeleteKeyword();

    } else {
        alert("Keyword \"" + keyword + "\" already exists");
    }
}

// create new block based on input keyword
function addKeyword() {
    var keyword = prompt("Enter new keyword");
    newKeyword(keyword)
};


// ---------------
// --- delete keyword functions --- //
 
// Function to update the Deletedropdown menu with existing keywords
function updateDeleteKeyword() {
    var dropdown = document.getElementById('delete');
    dropdown.innerHTML = '<option value="">Delete Keyword</option>'; // Clear existing options
    existingKeywords.forEach(function(keyword) {
        var option = document.createElement('option');
        option.value = keyword;
        option.textContent = keyword;
        dropdown.appendChild(option);
    });
}

// erase the highlight in info mining area
function undoHighlight(keyword) {
    var highlight = document.querySelectorAll('span[style="background-color: yellow;"]');
    
    highlight.forEach(function(word) {
        if (word.textContent === keyword) {
            var parent = word.parentNode;
            while (word.firstChild) {
                parent.insertBefore(word.firstChild, word);
        }
        parent.removeChild(word);
        }
    });
}

// remove keyword (purple block) from toolbox function
function deleteAux(step, keyword) {
    var category = document.getElementById(step);
    var blocks = category.getElementsByTagName("block");
    for (var i = 0; i < blocks.length; i++) {
        var field = blocks[i].getElementsByTagName("field")[0];
        console.log("Checking block:", blocks[i], "with field:", field);
        if (field && field.textContent == keyword) {
            category.removeChild(blocks[i]);
            console.log("Removing block:", blocks[i]);
            workspace.updateToolbox(document.getElementById("toolbox"));
            break;
        }
    }
}

// delete the purple blocks of all keyword in existingKeyword
function deleteAll() {
    for (var i = 0; i < existingKeywords.length; i++) {
        deleteAux("step1a", existingKeywords[i]);
        deleteAux("step1b", existingKeywords[i]);
    }
}

// delete existing keyword block
function deleteKeyword(keyword) {
    // var keyword = prompt("Enter keyword to delete");
    if (keyword != null) {
        // remove keyword from array
        existingKeywords.pop(keyword);

        // remove highlight in "info-mining" area
        undoHighlight(keyword);

        // remove keyword from step1a and step1b
        deleteAux("step1a", keyword);
        deleteAux("step1b", keyword);

        alert("Keyword \"" + keyword + "\" deleted");

        updateDeleteKeyword();
    }
}



