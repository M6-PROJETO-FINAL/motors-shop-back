import express from "express";
import buyerRoutes from "./routes/buyer/buyer.routes";
import "reflect-metadata";
import cors from "cors";
import loginRoutes from "./routes/session/login.routes";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/buyer", buyerRoutes);
app.use("/seller", buyerRoutes);
app.use("/login", loginRoutes);

export default app;
