import { Express, Request, Response } from 'express';
import Jimp from 'jimp';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
        cb(null, './uploads/from');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
        cb(null, file.originalname);
    }
})

export const baseRoutes = (app: Express): void => {
    app.route('/')
        .get((req: Request, res: Response): void => {
            res.render('index', {
                title: 'Image Converter',
                msg: undefined,
                error: undefined,
                fromExt: undefined,
                toExt: undefined,
                convertedFile: undefined,
            });
        })
        .post(multer({ storage }).single('image'), (req: Request, res: Response): void => {
            const fromExt = req.body['from-ext'];
            const toExt = req.body['to-ext'];
            const fromPath = `./uploads/from/${req.file?.originalname}`;
            const convertedFile = req.file?.originalname.replace(/\..+$/i, `.${toExt.toLowerCase()}`);
            const toPath = `./uploads/to/${convertedFile}`;
            let error = false;
            let msg = 'Image converted successfully!';
            Jimp.read(fromPath, (err: Error | null, image: Jimp): void => {
                if (err) {
                    msg = err.message;
                    error = true;
                }
                image.getBuffer(`image/${fromExt.toLowerCase()}`, (err: Error | null, buffer: Buffer): void => {
                    if (err) {
                        msg = err.message;
                        error = true;
                    }
                    Jimp.read(buffer, (err: Error | null, image: Jimp): void => {
                        if (err) {
                            msg = err.message;
                            error = true;
                        }
                        image.getBuffer(`image/${toExt.toLowerCase()}`, (err: Error | null, buffer: Buffer): void => {
                            if (err) {
                                msg = err.message;
                                error = true;
                            }
                            Jimp.read(buffer, (err: Error | null, image: Jimp): void => {
                                if (err) {
                                    msg = err.message;
                                    error = true;
                                }
                                image.write(toPath, (err: Error | null): void => {
                                    if (err) {
                                        msg = err.message;
                                        error = true;
                                    }
                                });
                            });
                        });
                    });
                });
            });
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
