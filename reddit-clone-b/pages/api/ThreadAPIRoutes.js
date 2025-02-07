import connectDB from "../../lib/mongodb";
import Thread from "../../models/Thread";

export default async function handler(req, res) {
    await connectDB();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "GET") {
        const threads = await Thread.find();
        return res.json(threads);
    }

    if (req.method === "POST") {
        const thread = await Thread.create(req.body);
        return res.json(thread);
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        await Thread.findByIdAndDelete(id);
        return res.json({ message: "Thread deleted" });
    }

    if (req.method === "PUT") {
        const { id } = req.query;
        const updatedThread = await Thread.findByIdAndUpdate(id, req.body, { new: true });
        return res.json(updatedThread);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
}
