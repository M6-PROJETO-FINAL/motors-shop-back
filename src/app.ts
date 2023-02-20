import express from "express";
import userRoutes from "./routes/user/user.routes";
import "reflect-metadata";
import cors from "cors";
import loginRoutes from "./routes/session/login.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);
app.use("/login", loginRoutes);

export default app;
