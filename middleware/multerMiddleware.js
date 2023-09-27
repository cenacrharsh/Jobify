import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();

    return parser.format(fileExtension, file.buffer).content;
};

export default upload;

/*
since we can't use diskStorage as render won't allow use of disk space we'll use a memoryStorage option, essentially we'll save our image as a buffer, but we can't directly push a buffer into cloudinary, so we use 'daturi' package to convert the buffer into something cloudinary can work it
*/
