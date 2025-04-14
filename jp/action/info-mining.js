var existingKeywords = []; // array of keywords
var HIGHLIGHT_COLOR = 'rgb(138,150,255)';

// ---------------------------------------
// --- add keyword functions --- //

// add keyword (selector method)
function addKeyword() {
    // get the selected text
    var selObj = document.getSelection();

    // highlight the keyword selected
    if (selObj.rangeCount > 0 && selObj != "") {
        var range = selObj.getRangeAt(0);
        var span = document.createElement('keyword');
        span.style.backgroundColor = HIGHLIGHT_COLOR;

        try {
            range.surroundContents(span);
        } catch (error) {
            alert("Cannot select text more than once.")
            return;
        }

        // make a block out of the keyword
        var selectedKeyword = selObj.toString();
        newKeyword(selectedKeyword);

    } 
    // if no text selected
    else {
        var keyword = prompt("Enter new keyword");
        newKeyword(keyword);
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
        var newXML = 
            // '<block type="keyword"><field name="keyword">' + keyword + '</field></block>';
            `<block type="keyword"><field name="keyword">${keyword}</field></block>
            <sep gap="5"></sep>`;
        
        // add xml block to step1a and step1b
        category1a.innerHTML += newXML;
        category1b.innerHTML += newXML;

        workspace.updateToolbox(document.getElementById("toolbox"));

        console.log("Keyword added:", keyword);
        alert("Keyword \"" + keyword + "\" added");
        updateDeleteKeyword();

    } else {
        alert("Keyword \"" + keyword + "\" already exists");
    }
}


// ---------------------------------------
// --- delete keyword functions --- //
 
// Function to update the Deletedropdown menu with existing keywords
function updateDeleteKeyword() {
    var dropdown = document.getElementById('delete');
    dropdown.innerHTML = '<option value="">キーワード削除</option>'; // Clear existing options
    existingKeywords.forEach(function(keyword) {
        var option = document.createElement('option');
        option.value = keyword;
        option.textContent = keyword;
        dropdown.appendChild(option);
    });
}

// erase the highlight in info mining area
function undoHighlight(keyword) {
    var highlight = document.querySelectorAll('keyword');
    
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
        if (field && field.textContent == keyword) {
            category.removeChild(blocks[i]);
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
        existingKeywords = existingKeywords.filter(item => item !== keyword);

        // remove highlight in "info-mining" area
        undoHighlight(keyword);

        // remove keyword from step1a and step1b
        deleteAux("step1a", keyword);
        deleteAux("step1b", keyword);

        console.log("Keyword deleted:", keyword);
        alert("Keyword \"" + keyword + "\" deleted");

        updateDeleteKeyword();
    }
}