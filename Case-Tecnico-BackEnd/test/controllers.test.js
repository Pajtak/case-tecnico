const request = require("supertest");
const app = require("../src/app");
const userController = require('../src/controller/userController');
const userModel = require('../src/models/userModel');

describe("User Controller tests", () => {
  
  it("should return status 400 if email is undefined", async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ err: "O email é inválido!" });
  });

  it("should return status 406 if email already exists", async () => {
    const req = { body: { email: "existing@example.com" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    userModel.findEmail = jest.fn().mockResolvedValue(true); // Corrigir aqui

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(406);
    expect(res.json).toHaveBeenCalledWith({
      err: "O e-mail já está cadastrado!",
    });
  });
});
