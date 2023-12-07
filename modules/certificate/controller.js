import  enkrip  from '../../helper/enkrip.js';
import jwt from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import sequelize from '../../config/connection.js';
import { QueryTypes } from 'sequelize';

import Certificate from './model.js';
// import Certificate from './model.js'
// import ListModel from '../list/model.js';
// import TodoListModel from '../todo_list/model.js';
// import UserList from '../user_list/model.js';

class CerificateController{
    static async certificateList(req, res){
        try {
            // console.timeLog('sa')
            const hasil = await sequelize.query("SELECT * FROM certificate", { type: QueryTypes.SELECT });
            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            // console.log(error.message);
            res.status(500).json({code:490, pesan:error})
        } 
    }

    static async certificateById(req, res){
        try {
            // console.timeLog('sa')
            const hasil = await Certificate.findOne({where:{id:req.params.id}})
            if (!hasil) throw new Error('data not found')
            // const hasil = await sequelize.query(`SELECT * FROM certificate where id=${req.params.id}`, { type: QueryTypes.SELECT });
            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            // console.log(error.message);
            res.status(500).json({code:490, pesan:error.message})
        } 
    }

    static async craeteCertificate(req, res){
        try {
            let {user_id, title, url} = req.body
            if (!title) throw new Error('title tidak boleh kosong/ harus diisi')
            if (!user_id) throw new Error('user_id tidak boleh kosong/ harus diisi')
            if (!url) throw new Error('url tidak boleh kosong/ harus diisi')
            // if (!todos) throw new Error('todos tidak boleh kosong/ harus diisi')

            // console.log(title, deadline, users, todos)
            const hasil = await Certificate.create({id:nanoid(), user_id, title, url})
            if (!hasil) throw new Error('db-error')
            res.status(201).json({status:"berhasil membat cerificate!!", data:hasil})
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({pesan:"date sudah dibuat"})
            } else {
                res.status(500).json({pesan:error.message})
            }
        }
    }

    static async updateCertificate(req, res){
        try {
            let {user_id, title, url} = req.body
            if (!title && !user_id && !url) throw new Error('req body kosong')

            const hasil = await Certificate.update({user_id, title, url}, { where: { id:req.params.id }, returning: true, })
            if (!hasil) throw new Error('data not found')
            res.status(200).json({status:'updated!!', data:hasil[1][0]})
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({pesan:error.errors[0].message});
            } else {
                res.status(500).json({pesan:error.message});
            }
        }
    }

    static async deleteCertificate(req, res){
        try {
            // let {user_id} = req.body;
            // if (!user_id) throw new Error('user_id cannot be an empty field')
            const hasil = await Certificate.destroy({ where: { id: req.params.id }, returning: true })
            if (hasil.length == 0) throw new Error('data not found')
            res.status(200).json({status:'OK', data:hasil[0].dataValues})
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({pesan:error.errors[0].message});
            } else {
                res.status(500).json({pesan:error.message});
            }
        }
    }
}

export default CerificateController;