import mongoose from "mongoose";

const todolistschema = new mongoose.Schema ({
    title : {
        type : String,
        required : true
    },
    createdBy: {
        type : String,
        required : true
    }
})

export default mongoose.model('Todolist', todolistschema)