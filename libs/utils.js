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