import {
	PC1Table,
	shiftsTable,
	PC2Table
} from "./tables.js";

import {
    hexToBin,
    padKey
} from "./utils.js";

export const PC1 = (key) => {
	let result = "";
	for (let i=0; i<PC1Table.length; i++) {
		const current = PC1Table[i];
		result += key[current - 1];
	}
	return result;
};

export const shiftAfterPC1 = (cString, dString) => {
	if (cString.length != dString.length) throw new Error("ERR_UNEQUAL_HALFKEYS_LENGTHS");
	if (cString.length != 28) throw new Error("ERR_HALFKEYS_LENGTH_NOT_28");
	const cArray = [];
	const dArray = [];
	cArray.push(cString);
	dArray.push(dString);
	for (let i=0; i<shiftsTable.length; i++) {
		const currentCString = cArray[i];
		const currentDString = dArray[i];
		const numberOfShifts = shiftsTable[i];
		const n = numberOfShifts % cString.length;
		cArray.push(currentCString.slice(n) + currentCString.slice(0, n));
		dArray.push(currentDString.slice(n) + currentDString.slice(0, n));
	}
	return { cArray, dArray };
};

export const PC2 = (cArray, dArray) => {
	const permuted2Keys = [];
	if (cArray.length != dArray.length) throw new Error("ERR_UNEQUAL_HALFKEYS_ARRAYS_LENGTHS");
	if (cArray.length != 17) throw new Error("ERR_HALFKEYS_ARRAYS_LENGTHS_NOT_17");
	for (let i=1; i<cArray.length; i++) {
		let result = "";
		const currentCi = cArray[i] + dArray[i];
		for (let j=0; j<PC2Table.length; j++) {
			const current =  PC2Table[j];
			result += currentCi[current-1];
		}
		permuted2Keys.push(result);
	}
	return permuted2Keys;
};

export const keySchedulation = (key) => {
    const paddedKey = padKey(key);
    const binaryKey = hexToBin(paddedKey);
    const permuted1Key = PC1(binaryKey);
    const cArray0 = permuted1Key.substring(0, permuted1Key.length/2);
    const dArray0 = permuted1Key.substring(permuted1Key.length/2, permuted1Key.length);
    const { cArray, dArray } = shiftAfterPC1(cArray0, dArray0);
    const permuted2Keys = PC2(cArray, dArray);
    return permuted2Keys;
};