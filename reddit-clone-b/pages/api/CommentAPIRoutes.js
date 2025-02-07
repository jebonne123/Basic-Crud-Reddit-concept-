import connectDB from "../../lib/mongodb";
import Comment from "../../models/Comment";
import Thread from "../../models/Thread";

export default async function handler(req, res) {

    await connectDB();

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        const comment = await Comment.create(req.body);
        await Thread.findByIdAndUpdate(req.body.threadId, {
            $push: { comments: comment._id },
        });
        return res.json(comment);
    }

    res.status(405).json({ message: "Method Not Allowed" });
}