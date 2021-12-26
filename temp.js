export const func = (word) => {
    console.log(word.length);
    if (word.length != 4) throw new Error("INVALID_LENGTH");
    return "ok";
};

const parola = "cio";

// func(parola);