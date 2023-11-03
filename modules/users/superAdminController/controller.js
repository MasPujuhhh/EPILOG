import User from '../model.js';
import  enkrip  from '../../../helper/enkrip.js';
import jwt from '../../../helper/jwt.js';
import { nanoid } from 'nanoid'
import sequelize from '../../../config/connection.js';
import { QueryTypes } from 'sequelize';

class SuperAdminController{
    static async getDataUser(req, res){
        try {
            // let hasil = await model.findAll({include:mahasiswaModel});
            const hasil = await sequelize.query("SELECT * FROM user", { type: QueryTypes.SELECT });

            res.status(200).json(hasil)
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:"error karena db mati"})
        } 
    }

    static async createAdmin(req, res){
        try {          
            let {username, password, email} = req.body;
            let status = true;
            if(!username){
                res.status(500).json({pesan:"username tidak boleh kosong!"});
                status=false;
            }
            if(!password){
                res.status(500).json({pesan:"Password tidak boleh kosong!"});
                status=false;
            }
            if(!email){
                res.status(500).json({pesan:"email tidak boleh kosong!"});
                status=false;
            }
    
            if(status){
                password = await enkrip.enkrip(password);
                let hasil = await User.create({id: nanoid(),username, password, email, role:1});
                res.status(200).json({pesan:"berhasil!", data:hasil });
            }
        } catch (error) {
            res.status(500).json({pesan:error.message});
                
        }
    }
}

export default SuperAdminController;