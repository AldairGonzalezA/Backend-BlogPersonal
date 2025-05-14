import { model, Schema } from "mongoose";

const PublicationSchema = Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    course:{
        type: String,
        required: true,
        enum: ['Technology', 'Workshop','Practice']
    },
    mainText:{
        type: String,
        required: [true, 'The post cannot be empty ']
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    image:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model('Publication', PublicationSchema);