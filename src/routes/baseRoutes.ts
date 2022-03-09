import { Express, Request, Response } from 'express';
import multer from 'multer';
import { convertImage, createFolder } from '../helpers/imageHelper';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/from');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

export const baseRoutes = (app: Express) => {
    app.route('/')
        .get((req, res) => {
            res.render('index', {
                title: 'Image Converter',
                msg: undefined,
                error: undefined,
                fromExt: undefined,
                toExt: undefined,
                convertedFile: undefined,
            });
        })
        .post(multer({ storage }).single('image'), (req, res) => {
            createFolder('./uploads/from');
            createFolder('uploads/to');

            const fromExt = req.body['from-ext'];
            const toExt = req.body['to-ext'];
            const fromPath = `./uploads/from/${req.file?.originalname}`;
            const convertedFile = req.file?.originalname.replace(/\..+$/i, `.${toExt.toLowerCase()}`);
            const toPath = `./uploads/to/${convertedFile}`;
            const { msg, error } = convertImage(fromExt, toExt, fromPath, toPath);

            res.render('index', {
                title: 'Image Converter',
                msg,
                error,
                fromExt,
                toExt,
                convertedFile,
            });
        });
};
