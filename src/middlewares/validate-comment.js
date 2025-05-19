import Publication from '../publication/publication.model.js';

export const validateCreateComment = async ( req, res,next ) => {
    try {
        const data = req.body;
        const publication = await Publication.findOne({title: data.title})

        if(!publication){
            return res.status(404).json({
                msg: 'Publication not found'
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg:'Error to validate the comment'
        })
    }
}