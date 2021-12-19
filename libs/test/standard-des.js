import crypto from "crypto";

export const standardDes = (hexKey, hexPlaintext) => {
    const key = Buffer.from(hexKey, "hex");
    const plaintext = Buffer.from(hexPlaintext, "hex");
    
    try {
        const cipher = crypto.createCipheriv("des-ecb", key, "");
        const ciphertext = cipher.update(plaintext, "utf-8", "hex").toUpperCase();
        return ciphertext;
    } catch (error) {
        console.log("ERR", error);
        process.exit(1);
    }
};

console.log({ ciphertext: standardDes("133457799BBCDFF1", "0123456789ABCDEF") });