// create blockly workspace
var workspace = Blockly.inject("blockly-editor", {
    toolbox: document.getElementById("toolbox"),
    scrollbars: true,
    horizontalLayout: false,
    zoom: {
        controls: true,
        wheel: false,
        startScale: 0.7,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
    },
    grid: {
        spacing: 20,
        length: 3,
        colour: "#ddd",
        snap: true
    },
    // toolboxOptions: {
    //     disableAutoClose: true,
    // },
});

// keep the selected toolbox open when dragging blocks
// workspace.getFlyout().autoClose = false;
workspace.getToolbox().getFlyout().autoClose = false;
// workspace.toolbox_.flyout_.autoClose = false;



// ---------------------------------------

// show the input from "problem:" to "info-mining" section and/or reset selection
function showProblem() {
    // erase the previous problem desc in info mining section & erase all keywords added
    var infoMiningArea = document.getElementById("info-mining");
    infoMiningArea.innerHTML = ""
    deleteAll();

    // get the input from input box
    var problem = document.getElementById("fillbox").value.toString();

    // create new element to be append to HTML
    var paragraph = document.createElement('p');
    paragraph.textContent = problem;

    // append "problem" to info-mining
    infoMiningArea.appendChild(paragraph);

    // delete existing keywords
    existingKeywords = [];
    updateDeleteKeyword();

    // log
    console.log("Reset");
}

// Event listener for the "Delete Keyword" dropdown menu
document.getElementById('delete').addEventListener('change', function(event) {
    var selectedKeyword = event.target.value;
    if (selectedKeyword) {
        deleteKeyword(selectedKeyword);
    }
});

// ---------------------------------------

// check step 1b and call step 1c
workspace.registerButtonCallback("checkStep1b", checkStep1b);

// check step 1c
workspace.registerButtonCallback("checkStep1c", checkStep1c);

// ---------------------------------------

// README webpage
function readme1a() {
    // window.location.href = 
}

function readme1b() {
        
}

function readme1c() {
   
}

workspace.registerButtonCallback('readme1a', readme1a);
workspace.registerButtonCallback('readme1b', readme1b);
workspace.registerButtonCallback('readme1c', readme1c);

// download files
function downloadFiles(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// save button
function saveAs(){
    user = window.prompt("保存するファイル名を入力してください", "");
      if(user != ""){
      var xml = Blockly.Xml.workspaceToDom(workspace);
      var myBlockXml = Blockly.Xml.domToText(xml);
      downloadFiles(myBlockXml,user+".txt")
    }
  }

// ---------------------------------------

// // write code in text-editor
// function showCode() {
//     var code = "xxxxx";
//     var textEditor = createEditor();
//     textEditor.getSession().setValue(code)
// }