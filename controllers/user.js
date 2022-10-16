export const getProfile = async (req, res, next) => {
    try {
        const { user } = req;
        const profile = await user.fetchUserProfile();

        res.status(200).json({ message: 'Fetched Profile successfully', profile });
    } catch (error) {}
};
