const userModel = require("../models/userModel");


class userController {
  async index(req, res) {
    let users = await userModel.findAll();
    res.json(users);
  }
  async create(req, res) {
    let { email, name, password } = req.body;

    if (email == undefined || email == "" || email == " ") {
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

    res.status(200).json({ message: "Usuário criado com sucesso!" });
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
    let { id, name, role } = req.body;
  
    let result = await userModel.update(id, name, role);
  
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
    console.log(result)
    console.log(id)

    if (result.status) {
      
      res.status(200);
      res.send("Usuário deletado com sucesso");
    } else {
      res.status(406);
      res.send(result.err);
    }
  }


  

}

module.exports = new userController();
