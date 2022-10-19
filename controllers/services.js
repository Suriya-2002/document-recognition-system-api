import vision from '@google-cloud/vision';

export const getFiles = async (req, res, next) => {
    try {
        const { user } = req;
        const files = await user.fetchFiles();

        res.status(200).json({ message: 'Fetched files successfully', ...files });
    } catch (error) {}
};

export const getImage = async (req, res, next) => {
    try {
        const { user } = req;
        const { imageID } = req.params;

        const {
            files: [file],
        } = await user.fetchFileByID(imageID);

        res.status(200).json({ message: 'Fetched image successfully', image: file });
    } catch (error) {
        return next(error);
    }
};

export const postImage = async (req, res, next) => {
    try {
        const images = req.files.image;
        const fileName = images.map(image => image.filename);
        const { user } = req;

        await user.addImages(fileName);

        res.status(201).json({ message: 'Uploaded images successfully', fileName });
    } catch (error) {
        return next(error);
    }
};

export const postDocument = async (req, res, next) => {
    try {
        const [document] = req.files.document;
        const { user } = req;

        await user.addDocument(document.filename);

        res.status(201).json({ message: 'Uploaded document successfully', fileName: document.filename });
    } catch (error) {
        return next(error);
    }
};

export const postProcess = async (req, res, next) => {
    try {
        const { user } = req;
        const { fileID } = req.body;

        const {
            files: [file],
        } = await user.fetchFileByID(fileID);

        console.log(file);

        if (file.type !== 'image') throw new Error('File is not an image type');

        file.fileName.forEach(async file => {
            const fileName = `public/images/${file}`;

            const client = new vision.ImageAnnotatorClient();

            const [result] = await client.textDetection(fileName);
            const detections = result.textAnnotations;

            console.log('Text:');
            detections.forEach(text => console.log(text));
        });

        res.send('done');
    } catch (error) {
        return next(error);
    }
};
