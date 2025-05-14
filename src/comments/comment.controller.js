import Comment from './comment.model.js';
import Publication from '../publication/publication.model.js';

export const saveComment = async (req, res) =>{
    try {
        const data = req.body;
        const publication = await Publication.findOne({title: data.title})
        const comment = await Comment.create({
            publisher: data.publisher,
            text: data.text,
        })
        await Publication.findByIdAndUpdate(publication._id, {
            $push: { comments: comment._id}
        })

        return res.status(200).json({
            msg: 'Comment registered successfully!',
            commentDetails:{
                comment: comment.text
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to create the comment',
            error: error.message
        })
    }
}

export const updateComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, title, ...data} = req.body;

        const comment = await Comment.findByIdAndUpdate(id, data, {new: true});
        return res.status(200).json({
            success: true,
            msg: 'Comment update successfully!',
            comment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to update the comment',
            error: error.message
        })
    }
}

export const deleteComment = async (req, res = response) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndUpdate(id, {status:false}, {new: true});
            await Publication.findByIdAndUpdate(comment.publisher, {
                $pull : {comments: comment._id}
            });

            return res.status(200).json({
                success: true,
                msg:'Comment deleted successfully',
                comment
            })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to delete the comment',
            error: error.message
        })
    }
}