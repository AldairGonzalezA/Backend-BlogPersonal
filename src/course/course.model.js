import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
    course: {
        type: String,
        required: [true, 'The course is required']
    },
    description:{
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Course', CourseSchema)