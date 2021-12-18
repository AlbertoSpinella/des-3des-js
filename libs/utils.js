import {
	PC1Table,
	shiftsTable
} from "./tables.js";

export const hexToBin = (hex) => {
	let result = "";
	for (let i=0; i<hex.length; i++) {
		result += parseInt(hex[i], 16).toString(2).padStart(4, "0");
	}
	return result;
};

export const padKey = (key) => {
	if  (key.length > 16) throw new Error("KEY_LENGTH_BIGGER_16");
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

export const shiftAfterPC1 = (cArray, dArray) => {
	for (let i=0; i<shiftsTable.length; i++) {
		const cString = cArray[i];
		const dString = dArray[i];
		const numberOfShifts = shiftsTable[i];
		const n = numberOfShifts % cString.length;
		cArray.push(cString.slice(n) + cString.slice(0, n));
		dArray.push(dString.slice(n) + dString.slice(0, n));
	}
};