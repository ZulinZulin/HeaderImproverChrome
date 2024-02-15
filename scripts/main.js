const button = document.getElementById('saveButton');
const slider = document.getElementById('slider');


console.log('button is ' + button);
console.log('slider is ' + slider);
console.log('main.js WORKS');


button.addEventListener('click', function(event){
    chrome.runtime.sendMessage({
        clickValue : 'nword'
    })
});

// Retrieve the slider value from storage when the page loads
chrome.storage.sync.get(['sliderValue', 'randomModeValue'], function(data) {
    if (data.sliderValue !== undefined) {
        slider.value = data.sliderValue;
    }
    if (data.randomModeValue !== undefined) {
        // Update randomModeStatus here
        const randomModeStatus = data.randomModeValue;
        // Set checkbox state based on randomModeStatus
        document.getElementById('randomMode').checked = randomModeStatus;
    }
});

button.addEventListener('click', function(event) {
    // Get the current value of the slider
    const sliderValue = slider.value;
    // Get the current value of the checkbox
    const randomModeStatus = document.getElementById('randomMode').checked;

    // Send a message with slider value and click value
    chrome.runtime.sendMessage({
        sliderValue: sliderValue,
        clickValue: 'iClicked',
        randomModeValue: randomModeStatus
    });

    // Store the slider value and checkbox value in Chrome storage
    chrome.storage.sync.set({ 'sliderValue': sliderValue });
    chrome.storage.sync.set({ 'randomModeValue': randomModeStatus });
});



