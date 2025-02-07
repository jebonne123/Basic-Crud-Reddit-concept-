import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: String,
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  });

  export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);