import Category from "../models/category.model.js";

export const getCategories = async (req, res) => {
    try {
        const Categories = await Category.find({ $or: [{ user: req.user.id }, { user: null }] })
        res.json(Categories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { title, icon, color } = req.body;
        const newCategory = new Category({
            title,
            icon,
            color,
            user: req.user.id

        });
        await newCategory.save();
        res.json(newCategory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id).populate("user");

        if (!(category?.user?.id === req.user.id))
            return res.status(404).json({ message: "No puedes eliminar categorias predeterminadas" });

        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory)
            return res.status(404).json({ message: "Categoria no encontrada" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {

        const category = await Category.findById(req.params.id).populate("user");
        if (!(category?.user?.id === req.user.id))
            return res.status(404).json({ message: "No puedes actualizar categorias predeterminadas" });

        const { title, icon, color } = req.body;
        const CategoryUpdated = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { title, icon, color },
            { new: true }
        );
        return res.json(CategoryUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Categoria no encontrada" });
        return res.json(category);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
