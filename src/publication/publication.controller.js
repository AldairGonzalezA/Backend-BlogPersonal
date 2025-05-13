import Publication from './publication.model.js';

export const createPublication = async (req, res) => {
    try {
        const data = req.body;

        const publication = await Publication.create({
            title: data.title,
            curse: data.curse,
            mainText: data.mainText,
        })

        return res.status(200).json(publication);
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error crating publication')
    }
}

