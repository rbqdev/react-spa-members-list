import { removeStringAccents } from "./removeStringAccents";

describe("removeStringAccents", () => {
  it.each([
    ["Coração", "Coracao"],
    ["Parâmetro", "Parametro"],
    ["Äçucar", "Acucar"],
  ])("should remove accents from a string", (input, output) => {
    const response = removeStringAccents(input);
    expect(response).toEqual(output);
  });
});
