export const getFiles = async (req, res, next) => {
    try {
        const { user } = req;
        const files = await user.fetchFiles();

        res.status(200).json({ message: 'Fetched files successfully', ...files });
    } catch (error) {}
};

export const postImage = async (req, res, next) => {
    try {
        const [image] = req.files.image;
        const { user } = req;

        await user.addImage(image.filename);

        res.status(201).json({ message: 'Uploaded image successfully', fileName: image.filename });
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
