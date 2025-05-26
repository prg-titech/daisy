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
workspace.getFlyout().autoClose = false;

// if (workspace.getToolbox() && workspace.getToolbox().getFlyout()) {
//     workspace.getToolbox().getFlyout().autoClose = false;
//   }

// workspace.getToolbox().flyout_.autoClose = false;
// workspace.getToolbox().getFlyout().autoClose = false;
// Blockly.getMainWorkspace().getFlyout().autoClose = false;

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

// download file
function downloadFile(content, fileName) {
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
    filename = window.prompt("保存するファイル名を入力してください", "");
        if(filename != null && filename != ""){
            // var xml = Blockly.Xml.workspaceToDom(workspace);
            var workspaceXml = Blockly.Xml.workspaceToDom(workspace);
            var toolboxXml = Blockly.Xml.toolboxToDom(workspace.getToolbox());

            var myBlockXml = Blockly.Xml.domToText(workspaceXml);
            var myToolboxXml = Blockly.Xml.domToText(toolboxXml);

            // TODO: workspaceとtoolboxのxmlのつなぎ方を改善する
            downloadFile(myBlockXml + myToolboxXml, filename + ".txt");
        }
}

function load() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt';
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const xmlText = e.target.result;
                const xml = Blockly.utils.xml.textToDom(xmlText);
                // TODO: parse the XML to separate workspace and toolbox
                Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
            };
            reader.readAsText(file);
        }
    });
    
    fileInput.click();
}

// // save and load in local storage
// function save() {
//     const state = Blockly.serialization.workspaces.save(workspace);
//     localStorage.setItem('workspace-state', JSON.stringify(state));
// }

// function load() {
//     const jsonState = localStorage.getItem('workspace-state');
//     const state = JSON.parse(jsonState);
//     Blockly.serialization.workspaces.load(state, workspace);
// }

// ---------------------------------------

// // write code in text-editor
// function showCode() {
//     var code = "xxxxx";
//     var textEditor = createEditor();
//     textEditor.getSession().setValue(code)
// }