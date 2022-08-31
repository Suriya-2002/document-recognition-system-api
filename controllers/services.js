export const postImage = async (req, res, next) => {
    try {
        const image = req.file;
        const { user } = req;

        await user.addImage(image.filename);

        res.status(201).json({ message: 'Uploaded image successfully', fileName: image.filename });
    } catch (error) {
        return next(error);
    }
};
