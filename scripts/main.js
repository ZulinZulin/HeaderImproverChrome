const button = document.getElementById('saveButton');
const slider = document.getElementById('slider');
const enableBtn = document.getElementById('enableButton');


// Загружает штуки из памяти когда страница грузится
chrome.storage.sync.get(['sliderValue', 'randomModeValue', 'enableBtnValue'], function (data) {
    console.log('tried to GET');
    if (data.sliderValue !== undefined) {
        slider.value = data.sliderValue;
    }
    
    if (data.randomModeValue !== undefined) {

        const randomModeStatus = data.randomModeValue;

        document.getElementById('randomMode').checked = randomModeStatus;
    }
    if (data.enableBtnValue !== undefined){
        const enableBtnStatus = data.enableBtnValue;  
        enableBtn.checked = data.enableBtnValue;
    }
});

button.addEventListener('click', function(event) {
    // Get the current value of the slider
    const sliderValue = slider.value;
    // Get the current value of the checkbox
    const randomModeStatus = document.getElementById('randomMode').checked;
    enableBtnStatus = enableBtn.checked;



    // Send a message with slider value and click value
    chrome.runtime.sendMessage({
        sliderValue: sliderValue,
        clickValue: 'iClicked',
        randomModeValue: randomModeStatus,
        enableBtnValue: enableBtnStatus
    });

    // Store the slider value and checkbox value in Chrome storage
    chrome.storage.sync.set({ 'sliderValue': sliderValue });
    chrome.storage.sync.set({ 'randomModeValue': randomModeStatus });
    chrome.storage.sync.set({ 'enableBtnValue': enableBtnStatus });
});



