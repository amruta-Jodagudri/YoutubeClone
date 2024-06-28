import User from '../models/auth.js';

export const updatePoints = async (req, res) => {
    const { userId, points } = req.body;
    try {
        const user = await User.findById(userId);
        if (user) {
            user.points += points;
            await user.save();
            res.status(200).json({ message: "Points updated successfully." });
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

