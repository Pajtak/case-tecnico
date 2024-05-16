const UserModel = require("../src/models/userModel");
const knex = require("../src/database/database");
const bcrypt = require("bcrypt");

jest.mock("../src/database/database.js");
jest.mock("bcrypt");

describe("UserModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("new", () => {
    it("should insert a new user into the database", async () => {
      const email = "test@example.com";
      const password = "password";
      const name = "Test User";
      const hash = "hashedPassword";

      bcrypt.hash.mockResolvedValue(hash);
      knex.insert.mockResolvedValue([1]); // Corrigido

      await UserModel.new(email, password, name);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(knex.insert)
        .toHaveBeenCalledWith({
          email,
          password: hash,
          name,
          role: 0,
        });
    });
  });

});
