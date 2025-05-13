import { Schema, model} from 'mongoose';

const commentSchema = Schema({
    publisher: {
        type: String,
        default: 'Anonymous'
    },
    text: {
        type: 'String',
        required: [true, 'The comment need a text']
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model('Comment', commentSchema);