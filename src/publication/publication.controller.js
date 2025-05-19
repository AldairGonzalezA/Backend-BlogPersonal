import Publication from './publication.model.js';
import Course from '../course/course.model.js';

export const createPublication = async (req, res) => {
    try {
        const data = req.body;

        const publication = await Publication.create({
            title: data.title,
            course: data.course,
            mainText: data.mainText,
            image: data.image,
        })

        return res.status(200).json(publication);
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error crating publication',error)
    }
}

export const getPublications = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const {limite = 10, desde = 0} = req.query;
        const course = await Course.findById(id);

         const query = {
            status: true,
            course: course.course
        }


        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'comments',
                    match: { status: true },
                }),
        ]);

        res.status(200).json({
            success: true,
            total, 
            publications
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Erro to get the publications',
            error: error.message
        })
    }
}

export const searchPublication = async (req, res) =>{
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id)
            .populate('publisher', 'username') 
            .populate({
            path: 'comments',   
            select: 'publisher text',  
            match: { status: true },
        });  

        if(!publication){
            return res.status(404).json({
                success: false,
                msg:'Publication not found'
            })
        }

        res.status(200).json({
            success: true,
            publication
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            msg: 'Error to search the publication',
            error: error.message
        })
    }
}

export const updatePublication = async (req, res = response) =>{
    try {
        const { id } = req.params;
        const {_id, ...data} = req.body;
        const publication = await Publication.findByIdAndUpdate(id, data, {new: true})

        return res.status(200).json({
            publication,
            msg: 'Publication update successdully!!'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error to update the publication',
            error: error.message
        })
    }
}

export const deletePublication = async (req, res) => {
    try {
            const { id } = req.params;
            const publication = await Publication.findByIdAndUpdate(id, {status: false}, {new: true})
            

            return res.status(200).json({
                publication,
                msg: 'Publication delete Successfully!!'
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to delete the publication',
            error: error.message
        })
    }
}
    


