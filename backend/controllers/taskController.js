import Task from "../models/Task.js"

//Create Task 
export const createTask=async(req,res)=>{
    const {title,status}=req.body

    //validate all fields
    if(!title||!status){
        return res.status(400).json({message:"All fields are required"})
    }

    try{
        await Task.create({
            title,
            status,
            userId:req.user.id
        })
        return res.status(201).json({message:"Task created successfully"})
    }catch(err){
        console.log("Err: Create Task Err",err.message)
        return res.status(500).json({message:"Server Error"})
    }
}

//Get all Tasks
export const getAllTasks=async(req,res)=>{
    try{
        const tasks=await Task.findAll({where:{userId:req.user.id}})
        return res.status(200).json(tasks)
    }catch(err){  
        console.log("Err: Get all tasks Err",err.message)
        return res.status(500).json({message:"Server Error"})
    }
}

//Get task by id
export const getTaskById=async(req,res)=>{
    try{
        const taskId=req.params.id
        const task=await Task.findOne({
            where:{
                id:taskId,
                userId:req.user.id
            }
        })
        
        //handle task not found
        if(!task){
            return res.status(404).json({message:"Task Not Found"})
        }
        return res.status(200).json(task)
    }catch(err){  
        console.log("Err: Get Task By ID", err.message)
        return res.status(500).json({message:"Server Error"})
    }
}
