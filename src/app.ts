import express from "express";
import userRoutes from "./routes/user/user.routes";
import "reflect-metadata";
import cors from "cors";
import loginRoutes from "./routes/session/login.routes";
import advertisementRoutes from "./routes/advertisement/vehicle.routes";
import commentRoutes from "./routes/comment/comment.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/vehicles", advertisementRoutes);
app.use("/comments", commentRoutes);

export default app;
