import { MatrixCipher as mc } from '/mc-js/mc.js';

let encodeBtn = document.querySelector('#encode-btn');
let decodeBtn = document.querySelector('#decode-btn');

let encordingInp = document.querySelector('#encording-inp');
let decordingInp = document.querySelector('#decording-inp');

let encordingOut = document.querySelector('#encording-out');
let decordingOut = document.querySelector('#decording-out');

let encodeKey = document.querySelector('#encode-key');
let decodeKey = document.querySelector('#decode-key');

encodeBtn.addEventListener('click', () => {
  if (encordingInp.value && encodeKey.value) {
    try {
      mc.invKeyMatrix(encodeKey.value);

      const encryptedText = mc.encryption(encordingInp.value, encodeKey.value);
      //console.log(encryptedText);
      encordingOut.value = encryptedText;

    } catch (e) {
      alert('Invalid PIN format, try a new one');
    }
  }
  else {
    alert('Enter required fields');
  }
});

decodeBtn.addEventListener('click', () => {
  if (decordingInp.value && decodeKey.value) {
    const decryptedText = mc.decryption(decordingInp.value, decodeKey.value);
    //console.log(decryptedText);
    decordingOut.value = decryptedText;
  }
  else {
    alert('Enter required fields');
  }
});

document.querySelector('#share-btn').addEventListener('click', () => {
  if (navigator.share && encordingOut) {
    navigator.share({
        title: 'MatrixCipherJS',
        text: 'Check out this example!',
        url: `${location.origin}/demo/?dtext=${encordingOut.value}`
      })
      .then(() => console.log('Shared successfully'))
      .catch(error => console.error('Error sharing:', error));
  } else {
    alert('Web Share API not supported.');
    // Fallback for browsers that do not support Web Share API
  }
});