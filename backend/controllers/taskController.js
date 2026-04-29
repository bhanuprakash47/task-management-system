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
        const tasks=await Task.findAll({
            where:{userId:req.user.id},
            order: [["createdAt", "DESC"]]
            })
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

//Update Task By ID
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const { title, status } = req.body

    // validate at least one field
    if (title === undefined && status === undefined) {
      return res.status(400).json({
        message: "At least one field is required to update"
      })
    }

    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: req.user.id
      }
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    const updates = {}
    if (title !== undefined) updates.title = title
    if (status !== undefined) updates.status = status

    await task.update(updates)

    return res.status(200).json({
      message: "Task updated successfully",
      task
    })

  } catch (err) {
    console.log("Err: Update Task", err.message)

    return res.status(500).json({
      message: "Server Error"
    })
  }
}

//Delete Task By Id
export const deleteTask=async(req,res)=>{
    try{
        const taskId=req.params.id 
        
        const task= await Task.findOne({
            where:{
                id:taskId,
                userId:req.user.id
            }
        })
        //handle not found task
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }

        await task.destroy()

        return res.status(200).json({message:"Task deleted successfully"})
    }catch(err){  
        console.log("Err: Delete Task", err.message)
        return res.status(500).json({message:"Server Error"})
    }
}

//Delete All Tasks
export const deleteAllTask=async(req,res)=>{
    try{
        const deletedCount=await Task.destroy({where:{userId:req.user.id}})
        return res.status(200).json({message:"All tasks deleted",deletedCount})
    }catch(err){  
        console.log("Err: Delete All Tasks", err.message)
        return res.status(500).json({message:"Server Error"})
    }
}