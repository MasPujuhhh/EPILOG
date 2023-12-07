import  enkrip  from '../../helper/enkrip.js';
import jwt from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import sequelize from '../../config/connection.js';
import { QueryTypes } from 'sequelize';

import Logbook from './model.js'
// import Logbook from '../logbook/model.js';

class LogbookController{

    // static async logbookListUser(req, res){
    //     try {
    //         const hasil = await sequelize.query("SELECT * FROM logbook", { type: QueryTypes.SELECT });
    //         res.status(200).json({status:'OK', data:hasil})
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({code:490, message:error})
    //     }
    // }

    // static async updateExpiredUser(req, res){
    //     try {
    //         const validator = updateExpSchema.validate(req.body)
    //         if (validator.error) throw new Error(validator.error.details[0].message)
    //         let {user_id, expired_at} = req.body;
    //         const hasil = await User.update({expired_at}, { where: { id: user_id }, returning: true, })
    //         if (!hasil) throw new Error('data not found')
    //         res.status(200).json({status:'OK', data:hasil[1][0]})

    //     } catch (error) {
    //         if (error.name == 'SequelizeUniqueConstraintError') {
    //             res.status(500).json({pesan:error.errors[0].message});
    //         } else {
    //             res.status(500).json({pesan:error.message});
    //         }
    //     }
    // }

    // static async createLogbook(req,res){
    //     try {

    //         let hasil = await Logbook.update()
    //     } catch (error) {
            
    //     }
    // }

    static async logbookList(req, res){
        try {
            const hasil = await sequelize.query(`select l.*, s.date, u.username from logbook l
            join schedule s on s.id = l.schedule_id
            join users u on u.id = l.user_id 
            order by s.date desc`, { type: QueryTypes.SELECT });
            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }

    static async logbookListUser(req, res){
        try {
            const hasil = await sequelize.query(`select l.*, s.date, u.username from logbook l
            join schedule s on s.id = l.schedule_id
            join users u on u.id = l.user_id 
            where l.user_id='${req.user.id}'
            order by s.date desc`, { type: QueryTypes.SELECT });
            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }

    static async createLogbook(req, res){
        try {
            let {description, keterangan} = req.body
            if (!description) throw new Error('description tidak boleh kosong/ harus diisi')
            if (!keterangan) throw new Error('keterangan tidak boleh kosong/ harus diisi')

            let hasil = await Logbook.update({description, keterangan,status:1},{where:{id:req.params.id}})
            console.log()
            
            res.status(201).json({status:"berhasil kirim logbook!!", data:hasil})
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({pesan:"date sudah dibuat"})
            } else {
                res.status(500).json({pesan:error.message})
            }
        }
    }

    

    // static async openSchedule(req, res){
    //     try {
    //         let {date} = req.body
    //         if (!date) throw new Error('date tidak boleh kosong/ harus diisi')

    //         const hasil = await sequelize.transaction(async (t) => {

    //             const user = await sequelize.query('SELECT * FROM users where role = 0', { type: QueryTypes.SELECT })
    //             const schedule = await Schedule.create({id:nanoid(), date},  { transaction: t })
    //             const logbook = []
    //             for (const key in user) {
    //                 const query = await Logbook.create({id:nanoid(), user_id:user[key].id, schedule_id:schedule.id, status:0}, { transaction: t })
    //                 logbook.push(query)   
    //             }
    //             return {schedule, logbook};
    //           });
    //         if (!hasil) throw new Error('db-error')
    //         res.status(201).json({status:"berhasil open schedule!!", data:hasil})
    //     } catch (error) {
    //         if (error.name == 'SequelizeUniqueConstraintError') {
    //             res.status(500).json({pesan:"date sudah dibuat"})
    //         } else {
    //             res.status(500).json({pesan:error.message})
    //         }
    //     }
    // }
}

export default LogbookController;