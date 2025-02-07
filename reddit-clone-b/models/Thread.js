import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
    title: String,
    content: String,
    upvotes: { type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
},  { timestamps: true });

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);