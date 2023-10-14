import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {

        title: { type: String, required: true },
        icon: { type: String, required: true },
        color: { type: String, required: true },
        user: { type: mongoose.Types.ObjectId, ref: 'User' },

    },
);

export default mongoose.model("Category", categorySchema);
