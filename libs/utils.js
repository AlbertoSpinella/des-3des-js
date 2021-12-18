import {
	PC1Table,
	shiftsTable,
	PC2Table
} from "./tables.js";

export const hexToBin = (hex) => {
	let result = "";
	for (let i=0; i<hex.length; i++) {
		result += parseInt(hex[i], 16).toString(2).padStart(4, "0");
	}
	return result;
};

export const padKey = (key) => {
	if  (key.length > 16) throw new Error("ERR_KEY_LENGTH_BIGGER_16");
	let res = "";
	res += key;
	if (key.length % 16 != 0) {
		for (let i=0; i < 16 - (key.length % 16); i++) res += "0";
	}
	return res;
};

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
	if (cArray.length != 17) throw new Error("ERR_HALFKEYS_ARRAYS__LENGTH_NOT_17");
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