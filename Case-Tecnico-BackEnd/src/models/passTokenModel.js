const knex = require("../database/database");
let userModel = require("./userModel");

class passTokenModel {
  async create(email) {
    let user = await userModel.findByEmail(email);
    if (user != undefined) {
      try {
        
        let token =  Date.now();
        
        await knex
          .insert({
            user_id: user.id,
            used: 0,
            token:token,
          })
          .table("password_tokens");

          return {
            status: true,
            token: token
          };
      } catch (err) {
        return {
            status: false,
            err: err,
          };
      }
    } else {
      return {
        status: false,
        err: "O e-mail não está registrado no banco de dados.",
      };
    }
  }

  async validateToken(token){

    try{
       let result = await knex.select().where({token: token}).table('password_tokens');
       if(result.length > 0){
        let tk = result[0]

        if(tk.used){
            return {status: false}
        } else {
            return {status: true, token: tk}
        }
       } else {
        return {status: false}
       }
    }catch(err){
        return {status: false}
    }
  }

  async setUsed(token){
    await knex.update({used: 1}).where({token: token}).table("password_tokens")
  }
}

module.exports = new passTokenModel();
