import { model, Schema } from "mongoose";

const PublicationSchema = Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    curse:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The pulication need a curse']
    },
    mainText:{
        type: String,
        required: [true, 'The post cannot be empty ']
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    status:{
        type: Boolean,
        default: true
    }
})

export default model('Publication', PublicationSchema);