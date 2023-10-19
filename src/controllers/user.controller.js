import categoryModel from "../models/category.model.js";
import Category from "../models/category.model.js";
import taskModel from "../models/task.model.js";
import Task from "../models/task.model.js";
import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrada" });

        res.json({
            id: user._id,
            fullname: user.fullname,
            username: user.username,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {

        const { fullname, username, password, passwordNew } = req.body;

        const user = await User.findById(req.user.id);

        let passwordHash;

        let message = "Actualizacion exitosa";
        if (password) {

            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                message = "La contraseña es incorrecta";
            }
            if (passwordsMatch) {
                passwordHash = await bcrypt.hash(passwordNew, 10);
            }
        }

        const userUpdated = await User.findOneAndUpdate(
            { _id: req.user.id },
            { fullname, username, password: passwordHash },
            { new: true }
        );
        return res.status(200).json({ message: message });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {

        const deletedCategory = await categoryModel.deleteMany({ user: req.user.id });
        const deletedTask = await taskModel.deleteMany({ user: req.user.id });
        const deletedUser = await userModel.findByIdAndDelete(req.user.id);

        return res.status(200).json({ message: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};