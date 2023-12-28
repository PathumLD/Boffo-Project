import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
    },
    age: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    phone: { 
        type: String, 
        required: true, 
    },
    address: { 
        type: String, 
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);

export default Student;