export const hexToBin = (hex) => {
	let result = "";
	for (let i=0; i<hex.length; i++) {
		result += parseInt(hex[i], 16).toString(2).padStart(4, "0");
	}
	return result;
};

export const padTo16Bytes = (input) => {
	if  (input.length > 16) throw new Error("ERR_INPUT_LENGTH_BIGGER_16");
	let res = "";
	res += input;
	if (input.length % 16 != 0) {
		for (let i=0; i < 16 - (input.length % 16); i++)
			res += "0";
	}
	return res;
};

export const xor = (a, b) => {
	if (a.length != b.length) throw new Error("ERR_XOR_UNEQUAL_LENGTHS");
	let result = "";
	for (let i=0; i<a.length; i++)
		result += a[i] ^ b[i];
	return result;
};

export const intToBinPaddedMax4Byte = (binary) => {
	let number = binary.toString(2);
	if (number.length > 4) throw new Error("ERR_BIN_TO_INT_PADDED_MORE_4");
	while (number.length < 4) number = `0${number}`;
	return number;
};

export const intToBinPaddedMax64Byte = (binary) => {
	let number = binary.toString(2);
	if (number.length > 64) throw new Error("ERR_BIN_TO_INT_PADDED_MORE_64");
	while (number.length < 64) number = `0${number}`;
	return number;
};

export const binToHex = (binary) => {
	let result = "";
	if (binary.length % 4 != 0) throw new Error("ERR_BIN_TO_HEX_INVALID_BINARY_FORMAT");
	for (let i=0; i<binary.length; i+=4) {
		const byte = parseInt(binary.substring(i, i+4), 2).toString(16);
		result += byte.toUpperCase();
	}
	return result;
};