import User from './model.js';
import  enkrip  from '../../helper/enkrip.js';
import jwt from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import sequelize from '../../config/connection.js';
import { QueryTypes } from 'sequelize';


class Controller{
    static async login(req, res){
        try {
          
            let {username, password} = req.body;
            let status = true;
            if(!username){
                res.status(500).json({pesan:"username tidak boleh kosong!"});
                status=false;
            }
            if(!password){
                res.status(500).json({pesan:"Password tidak boleh kosong!"});
                status=false;
            }

            if(status){
                let hasil = await User.findAll({
                    where:{
                        username:username
                    }
                });
                if(hasil.length != 0){
                    let cekPass = await enkrip.compare(password, hasil[0].dataValues.password)
                    if(cekPass){
                        res.status(200).json({pesan:"berhasil!", data:hasil[0].dataValues, token:jwt.enkrip(hasil[0].dataValues)});
                    }else{
                        res.status(500).json({pesan:"Password anda salah!"});
                    }
                }else{
                    res.status(500).json({pesan:"Username tidak terdaftar!"});
                }
              
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({pesan:error});
                
        }
    }

    static async createSuper(req, res){
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
                let hasil = await User.create({id: nanoid(),username, password, email, role:3, expired_at:new Date()});
                res.status(200).json({pesan:"berhasil!", data:hasil });
            }
        } catch (error) {
            res.status(500).json({pesan:error.message});
                
        }
    }
}

export default Controller;