import express, {application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validate-cant-request.js';
import courseRoutes from '../src/course/course.routes.js';
import publicationRoutes from '../src/publication/publication.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';
import { createCourses } from '../src/course/course.controller.js';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use('/blog/v1/publication',publicationRoutes),
    app.use('/blog/v1/publication/comment',commentRoutes),
    app.use('/blog/v1/course',courseRoutes)
}

const connectarDB = async () => {
     try {
        await dbConnection();
        console.log('Conexion successfully to the database ')
    } catch (error) {
        console.log('Error to connect with the database', error);
        process.exit(1);
    }
}

export const initServer= async () =>{
    const app = express();
    const port = process.env.PORT || 3000;
    try {
        middlewares(app);
        await connectarDB();
        routes(app);
        app.listen(port);
        await createCourses();
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}