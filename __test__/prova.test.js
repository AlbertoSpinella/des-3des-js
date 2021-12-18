import { padKey, hexToBin } from "../libs/utils.js";
import { keySchedulation } from "../main.js";

const cache = {};

test('PadKey already 16', async ()  => {
    const key = "133457799BBCDFF1";
    const padded = padKey(key);
    expect(padded).toBe("133457799BBCDFF0");
    cache.padded = padded;
});

test('PadKey less than 16', async ()  => {
    const key = "133457799BBCDFF";
    const padded = padKey(key);
    expect(padded).toBe("133457799BBCDFF0");
});

test('PadKey more than 16', async ()  => {
    try {
        const key = "133457799BBCDFF11";
        const padded = padKey(key);
    } catch (error) {
        expect(error.message).toBe("KEY_LENGTH_BIGGER_16");
    }
});

test('HexToBin', async ()  => {
    const binaryKey = hexToBin(cache.padded);
    expect(binaryKey).toBe("0001001100110100010101110111100110011011101111001101111111110001");
});