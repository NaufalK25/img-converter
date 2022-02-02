import fs from 'fs';
import Jimp from 'jimp';

export const createFolder = (path: fs.PathLike): void => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
};

const checkError = (err: Error | null, msg: string, error: boolean): void => {
    if (err) {
        msg = msg;
        error = true;
    };
};

export const convertImage = (fromExt: string, toExt: string, fromPath: string, toPath: string): { msg: string; error: boolean; } => {
    let msg = 'Image converted successfully!';
    let error = false;

    Jimp.read(fromPath, (err: Error | null, image: Jimp): void => {
        checkError(err, 'Error reading image!', error);
        image.getBuffer(`image/${fromExt.toLowerCase()}`, (err: Error | null, buffer: Buffer): void => {
            checkError(err, 'Error getting image buffer!', error);
            Jimp.read(buffer, (err: Error | null, image: Jimp): void => {
                checkError(err, 'Error reading image buffer!', error);
                image.getBuffer(`image/${toExt.toLowerCase()}`, (err: Error | null, buffer: Buffer): void => {
                    checkError(err, 'Error getting image buffer!', error);
                    Jimp.read(buffer, (err: Error | null, image: Jimp): void => {
                        checkError(err, 'Error reading image buffer!', error);
                        image.write(toPath, (err: Error | null): void => {
                            checkError(err, 'Error writing image buffer!', error);
                        });
                    });
                });
            });
        });
    });
    return {
        msg,
        error,
    };
};
