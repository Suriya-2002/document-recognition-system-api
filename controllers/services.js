export const getFiles = async (req, res, next) => {
    try {
        const { user } = req;
        const files = await user.fetchFiles();

        res.status(200).json({ message: 'Fetched files successfully', ...files });
    } catch (error) {}
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
