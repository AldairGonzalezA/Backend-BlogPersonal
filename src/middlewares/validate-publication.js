import Publication from '../publication/publication.model.js';

export const validateCreatePublication = async (req, res, next) => {
    try {
        const data = req.body;
        const publication = await Publication.findOne({title: data.title})
        const validCourses = ['Technology', 'Workshop', 'Practice'];

        if(publication && publication.course === data.course){
            return res.status(403).json({
                msg:'There is already a publication with this name'
            })
        }

        if (!validCourses.includes(data.course)) {
            return res.status(403).json({
                msg: 'The course is invalid or does not exist'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg :'Error to create the publication',
            error: error.message
        })
    }
}

export const validateUpdatePublication = async (req ,res,next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const validCourses = ['Technology', 'Workshop', 'Practice'];
        const publication = await Publication.findById(id);

        if(!publication){
            return res.status(404).json({
                msg: 'Publication not found'
            })
        }

        if(data.course){
            if (!validCourses.includes(data.course)) {
                return res.status(500).json({
                    msg: 'The course is invalid or does not exist'
                });
            }
        }

        next();
       
    } catch (error) {
         return res.status(403).json({
            success: false,
            msg :'Error to update the publication',
            error
        })
    }
}

export const validateDeletePublication = async (req,res,next) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if(!publication){
            return res.status(404).json({
                msg: 'Publication not found'
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error to delete the publication',
            error
        })
    }
}