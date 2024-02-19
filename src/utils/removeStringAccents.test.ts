import { removeStringAccents } from "./removeStringAccents";

describe("removeStringAccents", () => {
  it("should remove accents from a string", () => {
    const mockString = "Coração";
    const response = removeStringAccents(mockString);
    expect(response).toEqual("Coracao");
  });
});
