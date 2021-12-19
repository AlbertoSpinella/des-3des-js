# DES & TRIPLE DES using nodeJS by AlbertoSpinella

For correctness testing reference, visit NIST: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nbsspecialpublication500-20e1980.pdf

## Installation
 - Run `npm ci` to install dependencies

## Run tests
 - Run `npm run test:correctness` for correctness test
 - Run `npm run test:nist` for nist test
 - Run `npm run test:random` for test with random keys & plaintexts

## Notes
 - There's a refuse in NIST test data. Precisely, at page 28 (`IP AND E TEST`) the ciphertext n. 30 has the digit `4` one column right than the expected. My test data are fixed about.
 - NIST ciphertext:
 - `0000000040000000`
 - Fixed ciphertext:
 - `0000000400000000`