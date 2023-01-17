let statusBox;
let autoSuggestCheckbox;

function saveSettings() {
    chrome.storage.sync.set({autoSuggest: autoSuggestCheckbox.checked}, () => {
        statusBox.textContent = "Settings saved!";
        setTimeout(() => {
            statusBox.textContent = "";
        }, 1500);
    });
}
function loadSettings() {
    chrome.storage.sync.get({autoSuggest: true}, ({autoSuggest}) => {
        autoSuggestCheckbox.checked = !!autoSuggest;
    });
}
document.addEventListener("DOMContentLoaded", () => {
    statusBox = document.getElementById("status");
    autoSuggestCheckbox = document.getElementById("option-auto-suggest");
    loadSettings();   
    document.getElementById("save").addEventListener("click", saveSettings);
});
