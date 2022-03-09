import fs from 'fs';
import Jimp from 'jimp';

export const createFolder = (path: fs.PathLike) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
};

const checkError = (err: Error | null, msg: string, error: boolean) => {
    if (err) {
        msg = msg;
        error = true;
    };
};

export const convertImage = (fromExt: string, toExt: string, fromPath: string, toPath: string) => {
    let msg = 'Image converted successfully!';
    let error = false;

    Jimp.read(fromPath, (err: Error | null, image: Jimp) => {
        checkError(err, 'Error reading image!', error);
        image.getBuffer(`image/${fromExt.toLowerCase()}`, (err: Error | null, buffer: Buffer) => {
            checkError(err, 'Error getting image buffer!', error);
            Jimp.read(buffer, (err: Error | null, image: Jimp) => {
                checkError(err, 'Error reading image buffer!', error);
                image.getBuffer(`image/${toExt.toLowerCase()}`, (err: Error | null, buffer: Buffer) => {
                    checkError(err, 'Error getting image buffer!', error);
                    Jimp.read(buffer, (err: Error | null, image: Jimp) => {
                        checkError(err, 'Error reading image buffer!', error);
                        image.write(toPath, (err: Error | null) => {
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
