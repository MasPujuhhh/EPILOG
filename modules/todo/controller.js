import  enkrip  from '../../helper/enkrip.js';
import jwt from '../../helper/jwt.js';
import { nanoid } from 'nanoid'
import sequelize from '../../config/connection.js';
import { DATE, QueryTypes } from 'sequelize';

import Todo from './model.js'
import ListModel from '../list/model.js';
import TodoListModel from '../todo_list/model.js';
import UserList from '../user_list/model.js';

class TodoController{
    static async todoList(req, res){
        try {
            const hasil = await sequelize.query(`select tl.id,  tl.todo_id, t.title, t.status, t.due_date, t.created_by ,l.id, l.description , l.done, ul.user_id, u.username from todo_list tl
            join todo t on t.id = tl.todo_id 
            join list l on l.id = tl.list_id
            join user_list ul on ul.todo_id = t.id
            join users u on u.id = ul.user_id`, { type: QueryTypes.SELECT });

            const data = {};

            hasil.forEach(item => {
                const key = `${item.id}_${item.todo_id}`;
                if (!data[key]) {
                    data[key] = { ...item, users:[{user_id:item.user_id, username:item.username}]};
                } else {
                    data[key].users.push({user_id:item.user_id, username:item.username})
                }
            });
            const outputData = Object.values(data);

            res.status(200).json({status:'OK', data:outputData})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }

    static async todoListByIdforAdmin(req, res){
        try {
            let {user_id} = req.body
            const hasil = await sequelize.query(`select  tl.id, tl.todo_id, t.title, t.status, t.due_date, t.created_by ,l.id, l.description , l.done, ul.user_id, u.username from todo_list tl
            join todo t on t.id = tl.todo_id 
            join list l on l.id = tl.list_id
            join user_list ul on ul.todo_id = t.id
            join users u on u.id = ul.user_id
            where ul.user_id = '${user_id}'`, {type: QueryTypes.SELECT})

            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }

    static async todoListByIdforUser(req, res){
        try {
            const hasil = await sequelize.query(`select  tl.id, tl.todo_id, t.title, t.status, t.due_date, t.created_by ,l.id, l.description , l.done, ul.user_id, u.username from todo_list tl
            join todo t on t.id = tl.todo_id 
            join list l on l.id = tl.list_id
            join user_list ul on ul.todo_id = t.id
            join users u on u.id = ul.user_id
            where ul.user_id = '${req.user.id}'`, {type: QueryTypes.SELECT})

            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }

    static async todoListByIdforUserGetOne(req, res){
        try {
            const hasil = await sequelize.query(`select  tl.id, tl.todo_id, t.title, t.status, t.due_date, t.created_by ,l.id, l.description , l.done, ul.user_id, u.username from todo_list tl
            join todo t on t.id = tl.todo_id 
            join list l on l.id = tl.list_id
            join user_list ul on ul.todo_id = t.id
            join users u on u.id = ul.user_id
            where t.id = '${req.params.id}' AND ul.user_id = '${req.user.id}'`, {type: QueryTypes.SELECT})

            res.status(200).json({status:'OK', data:hasil})
        } catch (error) {
            console.log(error);
            res.status(500).json({code:490, message:error})
        } 
    }


    static async createTodo(req, res){
        try {
            let {title, deadline, users, todos} = req.body
            if (!title) throw new Error('title tidak boleh kosong/ harus diisi')
            if (!deadline) throw new Error('deadline tidak boleh kosong/ harus diisi')
            if (!users) throw new Error('users tidak boleh kosong/ harus diisi')
            if (!todos) throw new Error('todos tidak boleh kosong/ harus diisi')

            // console.log(title, deadline, users, todos)

            const hasil = await sequelize.transaction(async (t) => {

                let due_date = new Date()
                due_date.setDate(due_date.getDate() + deadline)
                const todo = await Todo.create({id:nanoid(), created_by:req.user.username, title, status:0, due_date},  { transaction: t })
                // console.log(todo)
            
                const list = []
                for (const key in todos) {
                    // console.log(todos[key])
                    const query = await ListModel.create({id:nanoid(), description:todos[key], done:false}, { transaction: t })
                    await TodoListModel.create({id:nanoid(), todo_id:todo.id, list_id:query.id}, { transaction: t })
                    list.push(query)   
                }

                const user = []
                for (const key in users) {
                    console.log(users[key])
                    const query = await UserList.create({id:nanoid(), todo_id:todo.id, user_id:`${users[key]}`}, { transaction: t })
                    user.push(query)   
                }
                // console.log(list)
                return {todo, list, user};
              });
            if (!hasil) throw new Error('db-error')
            res.status(201).json({status:"berhasil open schedule!!", data:hasil})
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.status(500).json({pesan:"date sudah dibuat"})
            } else {
                res.status(500).json({pesan:error})
            }
        }
    }

    // PR
    // static async searchTodo(req, res){
    //     try {
    //         let {username, title} = req.body
    //         const hasil = await sequelize.query(`select  tl.id, tl.todo_id, t.title, t.status, t.due_date, t.created_by ,l.id, l.description , l.done, ul.user_id, u.username from todo_list tl
    //         join todo t on t.id = tl.todo_id 
    //         join list l on l.id = tl.list_id
    //         join user_list ul on ul.todo_id = t.id
    //         join users u on u.id = ul.user_id`, {type: QueryTypes.SELECT})


    //         const data = {};

    //         hasil.forEach(item => {
    //             const key = `${item.id}_${item.todo_id}`;
    //             if (!data[key]) {
    //                 data[key] = { ...item, users:[{user_id:item.user_id, username:item.username}]};
    //             } else {
    //                 data[key].users.push({user_id:item.user_id, username:item.username})
    //             }
    //         });
    //         const outputData = Object.values(data);


    //         outputData.filter(item => {
    //             // Implement your search criteria here based on the reqBody
    //             const titleMatch = reqBody.title ? item.title.toLowerCase().includes(reqBody.title.toLowerCase()) : true;
    //             const descriptionMatch = reqBody.description ? item.description.toLowerCase().includes(reqBody.description.toLowerCase()) : true;
    //             const createdByMatch = reqBody.created_by ? item.created_by.toLowerCase().includes(reqBody.created_by.toLowerCase()) : true;
        
    //             // Add more criteria as needed
        
    //             // Combine the criteria using logical AND
    //             return titleMatch && descriptionMatch && createdByMatch;
    //         });

    //         // console.log(username)
    //         // console.log(outputData)

    //         outputData.forEach(item => {
    //             if (title == item.title) {
    //                 console.log(item)
    //             }
    //         })
            
    //         res.status(200).json({status:'OK', data:hasil})
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({code:490, message:error})
    //     } 
    // }
}

export default TodoController;