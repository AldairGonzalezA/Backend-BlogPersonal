import Course from "./course.model.js";

export const createCourses = async() => {
    try {
        const existRoles = await Course.find({ course: { $in: ['Technology', 'Workshop', 'Practice']} });

        if(existRoles.length < 3){
            if(!existRoles.some(course => course.course === 'Technology' )){
                await new Course({ 
                    course: 'Technology',
                    description: 'This course aims to introduce students to the world of technology, developing skills for the responsible and creative use of digital tools. Topics include technological innovation, digital communication, automation, design, and problem-solving through the application of technology in various educational and social contexts.',
                    image: 'https://media.giphy.com/media/BDfPH990CCYA0IR4Pk/giphy.gif'
                }).save();
            }
            if(!existRoles.some(course => course.course === 'Workshop' )){
                await new Course({ 
                    course: 'Workshop',
                    description: 'This workshop is designed to provide students with comprehensive technical training in computing. Topics include programming, networking, computer maintenance, operating systems, and office software tools. The goal is to develop practical skills to perform efficiently in today’s technology-driven world.',
                    image: 'https://media.giphy.com/media/F9p9Ifz2zxk2JY1YAs/giphy.gif'
                }).save();
            }
            if(!existRoles.some(course => course.course === 'Practice' )){
                await new Course({ 
                    course: 'Practice',
                    description: 'Supervised Practice allows students to apply the knowledge acquired during their training in a real work environment. Under the guidance of a professional or instructor, participants develop technical skills, reinforce ethical values, and gain hands-on experience in their field of study, preparing them for successful entry into the workforce.',
                    image: 'https://media.giphy.com/media/QA1quSM6AFRYvI70cU/giphy.gif'
                }).save();
            }
        }

    } catch (error) {
        console.log('Error to creating courses: ', error);
        
    }
}

export const getCourses = async(req, res) => {
    const query = {status: true};
    console.log(query);
    

    try {
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
        ])

        return res.status(200).json({
            success: true,
            msg: "Courses obtained successfully",
            total,
            courses
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            msg: "Error to get courses",
            error: error.message || error
        })
    }
}