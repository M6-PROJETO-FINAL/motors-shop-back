import express from "express";
import buyerRoutes from "./routes/buyer/buyer.routes";
import "reflect-metadata";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/buyer", buyerRoutes);
app.use("/seller", buyerRoutes);

export default app;
