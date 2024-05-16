const userModel = require("../models/userModel");
let passwordToken = require("../models/passTokenModel");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let secret = "ahshavwvewvweoncskdj121";

class userController {
  async index(req, res) {
    let users = await userModel.findAll();
    res.json(users);
  }

  async create(req, res) {
    let { email, name, password } = req.body;

    if (email == undefined) {
      res.status(400);
      res.json({ err: "O email é inválido!" });
      return;
    }

    let emailExists = await userModel.findEmail(email);

    if (emailExists) {
      res.status(406);
      res.json({ err: "O e-mail já está cadastrado!" });
      return;
    }

    await userModel.new(email, password, name);

    res.status(200);
    res.send("CHEGOU");
  }

  async findUser(req, res) {
    let id = req.params.id;
    let user = await userModel.findById(id);

    if (user == undefined) {
      res.json({});
      res.status(404);
    } else {
      res.status(200);
      res.json(user);
    }
  }

  async findUserByName(req, res) {
    let name = req.params.name;
    let userName = await userModel.findByName(name);

    if (userName == undefined) {
      res.json({});
      res.status(404);
    } else {
      res.status(200);
      res.json(userName);
    }
  }

  async editUser(req, res) {
    let { id, name, role, email } = req.body;

    let result = await userModel.update(id, name, role, email);

    if (result != undefined) {
      if (result.status) {
        res.status(200);
        res.send("Edição concluída");
      } else {
        res.status(406);
        res.json(result);
      }
    } else {
      res.status(406);
      res.send("Ocorreu um erro no servidor.");
    }
  }

  async deleteUser(req, res) {
    let id = req.params.id;

    let result = await userModel.deleteUser(id);

    if (result.status) {
      res.status(200);
      res.send("Usuário deletado com sucesso");
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

  async recoverPassword(req, res) {
    let email = req.body.email;

    let result = await passwordToken.create(email);

    if (result.status) {
      res.status(200);
      res.send("" + result.token);
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

  async changePassword(req, res) {
    let token = req.body.token;
    let password = req.body.password;

    let isTokenValid = await passwordToken.validateToken(token);

    if (isTokenValid.status) {
      await userModel.changePassword(
        password,
        isTokenValid.token.user_id,
        isTokenValid.token.token
      );

      res.status(200);
      res.send("Senha alterada com sucesso!");
    } else {
      res.status(406);
      res.send("Token inválido");
    }
  }

  async login(req, res) {
    let { email, password } = req.body;

    let user = await userModel.findByEmail(email);

    if (user != undefined) {
      let result = await bcrypt.compare(password, user.password);

      res.json({ status: result });

      if(result){
        let token = jwt.sign({ email: user.email, role: user.role}, secret)
        res.status(200);
        res.json({token: token})
      } else{
        res.status(406)
        res.send("Senha incorreta")
      }
    } else res.json({ status: false });
  }
}

module.exports = new userController();
