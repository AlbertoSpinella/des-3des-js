# DES & TRIPLE DES using nodeJS by AlbertoSpinella

For DES correctness testing reference, visit NIST: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nbsspecialpublication500-20e1980.pdf

## Index

1. Installation
2. Run tests
3. How it works
4. Notes

## 1. Installation
 - Run `npm ci` to install dependencies

## 2. Run tests
 - Run `npm run test:os` for complessive test
 - Run `npm run test:correctness:os` for correctness test
 - Run `npm run test:nist:os` for nist test
 - Run `npm run test:random:os` for test with random keys & plaintexts

Note: depending on your OS, you must replace `os` with `lin` or `win`. Check `package.json` to find exact scripts

## 3. How it works
### general
![general](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/general.png)
### schedulation
![schedulation](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/schedulation.png)
### i-round
![i-round](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/round.png)
### feistel
![feistel](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/feistel.png)
### DES ECB
![DES ECB](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/desecb.png)
### DES CBC
![DES CBC](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/descbc.png)
### DES CFB
![DES CFB](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/descfb.png)
### DES OFB
![DES OFB](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/desofb.png)
### 3DES CBC Encryption
![3DES CBC Encryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3cbc-e.png)
### 3DES CBC Decryption
![3DES CBC Decryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3cbc-d.png)
### 3DES CFB Encryption
![3DES CFB Encryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3cfb-e.png)
### 3DES CFB Decryption
![3DES CFB Decryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3cfb-d.png)
### 3DES OFB Encryption
![3DES OFB Encryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3ofb-e.png)
### 3DES OFB Decryption
![3DES OFB Decryption](https://github.com/AlbertoSpinella/des-3des-js/blob/master/img/3ofb-d.png)
## 4. Notes
 - There's a refuse in NIST test data. Precisely, at page 28 (`IP AND E TEST`) the ciphertext n. 30 has the digit `4` one column right than the expected. My test data consider this and is settled about it.
 - NIST ciphertext:
 - `0000000040000000`
 - Fixed ciphertext:
 - `0000000400000000`