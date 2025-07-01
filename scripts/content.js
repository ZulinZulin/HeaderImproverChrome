const wordsToInsert = [
  ' ИЗ ЖОПЫ',
  ' ГОВНА',
  ' ВОТ ПИЗДЕЦ',
  ' НО ХУЙ ТАМ',
  ' НУ АХУЕТЬ ТЕПЕРЬ',
  ', НО КОГО ЕБЁТ?',
  ' ДА И ХУЙ С НИМ',
  ' НУ И ЗАЕБИСЬ',
  ' И ХУЙ ТАМ ПЛАВАЛ',
  ', НО ВСЕМ, КОНЕЧНО, ПОХУЙ',
  ', ПРОЕБАВ ВСЕ ПОЛИМЕРЫ',
  ' ШАТАЛ ТВОЙ РОТ',
  ' ПРОСТЫМ И ПОНЯТНЫМ БЛЯТЬ СУКА ХУЙ ПИЗДА АНАЛ ГОВНО ЕБАТЬ МАТЬ ЕГО ЯЗЫКОМ'
];

let headerToChange = document.querySelectorAll('h1, h2, h3, h1 > span');

function getRandomNumber() {
  return Math.floor(Math.random() * wordsToInsert.length);
}

function improveHeader(header) {
    if (!randomON) {
        header.textContent = header.textContent + wordsToInsert[dialPosition];
    } else if (randomON) {
        header.textContent = header.textContent + wordsToInsert[getRandomNumber()];
    }
}

let dialPosition = 10;
let randomON = true;
let enableM = true;

// Когда скрипт грузится (когда таба грузится) подгружаем из памяти значения юая, назначаем их переменным и улучшаем заголовки
chrome.storage.sync.get(['sliderValue', 'randomModeValue', 'enableBtnValue'], function (data) {
    console.log(`now LOADING from storage. we got: ${data.sliderValue}, ${data.randomModeValue}, ${data.enableBtnValue}`);
    if (data.sliderValue !== undefined) {
      dialPosition = Number(data.sliderValue);
    }
    if (data.randomModeValue !== undefined) {
      randomON = data.randomModeValue;
    }
    if (data.enableBtnValue !== undefined) {
      enableM = data.enableBtnValue;
    }
    if (dialPosition !== 10 && dialPosition !== undefined && enableM == true) {
      headerToChange.forEach(element => {
        improveHeader(element);
      });
    } else if (enableM == false) {
      console.log('Enable is OFF');
    }
  });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.clickValue !== undefined) {
        console.log('chu say???');
      }
      if (message.clickValue !== undefined && message.randomModeValue !== undefined) {
        console.log('tick is: ' + message.randomModeValue + 'its type is ' + typeof message.randomModeValue);
        randomON = message.randomModeValue;
        console.log('randomON = ' + randomON);
        dialPosition = Number(message.sliderValue);

    //эта хуйня раньше улучшала заголовки при каждом нажатии кнопки
    // if (dialPosition !== 10 && enableM == true) {
    //   headerToChange.forEach(element => {
    //     improveHeader(element);
    //   });
    // } else {
    //   console.log('Cant improve:(');
    // }
    }
});
