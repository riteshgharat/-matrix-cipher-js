// Initialized MatrixC 1.0.0
export const MatrixCipher = {
  // Define the set of characters used for encryption and decryption
  characters: ` ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890+÷=/_<>[]@#₹%^&*()-"':;,?!.{}$~`,

  // Convert characters to their corresponding numbers based using the character set
  charactersToNumbers(inputString) {
    let result = '';
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      const index = this.characters.indexOf(char);

      if (index !== -1) {
        // Add the index of the character in characters set plus 1 to the result
        result += (index + 1) + ',';
      } else {
        // If character not found in set, add it as it is
        result += '1,';
      }
    }
    return result;
  },

  // Convert numbers back to their corresponding characters based on the character set
  numbersTocharacters(inputString) {
    const numbers = inputString.split(',');
    let result = '';
    for (let i = 0; i < numbers.length; i++) {
      const number = parseInt(numbers[i]);
      const char = this.characters[number - 1];
      result += char;
    }
    // Check for 'undefined' characters in result (invalid PIN)
    if (result.includes('undefined')) {
      return 'Invalid PIN!';
    } else {
      return result;
    }
  },

  // Generate a key matrix based on the provided key string
  getKeyMatrix(key) {
    let keyArray = key.split('');
    keyArray = keyArray.map(str => parseInt(str, 10));
    const keyMatrix = math.reshape(keyArray, [2, keyArray.length / 2]);
    return keyMatrix;
  },

  invKeyMatrix(key) {
    let Key = this.getKeyMatrix(key);
    return math.inv(Key);
  },

  // Encrypt text using a key matrix
  encryption(text, key) {
    let inputArray = this.charactersToNumbers(text).split(',');
    inputArray.pop();
    inputArray = inputArray.map(str => parseInt(str, 10));

    // Ensure inputArray length is even for matrix manipulation
    if (inputArray.length % 2 !== 0) {
      inputArray.push(1);
    }

    const inputMatrix = math.reshape(inputArray, [2, inputArray.length / 2]); //2xn
    let Key = this.getKeyMatrix(key);
    const outputMatrix = math.multiply(Key, inputMatrix);
    return outputMatrix.toString();
  },

  // Decrypt text using a key matrix
  decryption(text, key) {
    let inputArray = text.split(',');
    inputArray = inputArray.map(str => parseInt(str, 10));
    //console.log(inputArray)

    const inputMatrix = math.reshape(inputArray, [2, inputArray.length / 2]); //2xn

    //console.log(inputMatrix);

    const invKey = this.invKeyMatrix(key)
    //console.log(invKey);

    const outputMatrix = math.multiply(invKey, inputMatrix);

    //console.log(outputMatrix);

    return this.numbersTocharacters(outputMatrix.toString());
  }
};