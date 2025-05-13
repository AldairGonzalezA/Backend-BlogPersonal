import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
    course: {
        type: String,
        required: [true, 'The course is required']
    }
});

export default mongoose.model('Course', CourseSchema)