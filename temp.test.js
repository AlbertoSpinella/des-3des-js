import { func } from "./temp.js";

test('Corretto', () => {
    const word = "ciao";
    const res = func(word);
    expect(res).toBe("ok");
});

test('Sbagliato', () => {
    try {
        const word = "cao";
        const res = func(word);
        expect(0).toBe(1);
    } catch (error) {
        expect(error.message).toBe("INVALID_LENGTH");   
    }
});