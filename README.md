#  Matrix Cipher Library (Matrix Cryptography)

## Overview
The Matrix Cipher library provides methods for encrypting and decrypting text using matrices. It employs a matrix-based approach to transform characters into numbers and perform encryption and decryption operations.

## Usage

### Prerequisite 

```html
<!--Importing Math.js as required library-->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.0.0/math.min.js"></script>
```
### Initialization
```javascript
import { MatrixCipher } from 'mc-js/mc.js';
```

### Example

```javascript
import { MatrixCipher } from 'MatrixCryptography';

const text = 'Hello, world!';
const key = '1234';

const encryptedText = MatrixCipher.encryption(text, key);
console.log('Encrypted:', encryptedText);

const decryptedText = MatrixCipher.decryption(encryptedText, key);
console.log('Decrypted:', decryptedText);
```