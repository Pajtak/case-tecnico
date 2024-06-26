const knex = require("../database/database");
const bcrypt = require("bcrypt");

class userModel {
  async new(email, password, name) {
    try {
      let hash = await bcrypt.hash(password, 10);
      await knex
        .insert({ email, password: hash, name, role: 0 })
        .table("users");
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    try {
      let result = await knex
        .select("id", "name", "email", "role")
        .table("users");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findById(id) {
    try {
      let result = await knex
        .select("id", "name", "email", "role")
        .where({ id: id })
        .table("users");

      if (result.length > 0) {
       
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async findByName(name) {
    try {
      let result = await knex
        .select("id", "name", "email", "role")
        .where({ name: name })
        .table("users");
      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async findByEmail(email) {
    try {
      let result = await knex
        .select("id", "name", "password", "email", "role")
        .where({ email: email })
        .table("users");

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email: email });

      if (result.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async update(id, name, role) {
    let user = await this.findById(id);
  
    if (user != undefined) {
      let editUser = {};
  
      if (name != undefined) {
        editUser.name = name;
      }
  
      if (role != undefined) {
        editUser.role = role;
      }
  
      try {
        await knex.update(editUser).where({ id: id }).table("users");
        return { status: true };
      } catch (err) {
        console.log(err);
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O usuário não existe" };
    }
  }

  async deleteUser(id) {
    let user = await this.findById(id);
    console.log(id)
    if (user != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (err) {
        return { status: false, err: err };
      }
    } else {
      return { status: false, err: "O usuário não existe!" };
    }
  }

  
}

module.exports = new userModel();
