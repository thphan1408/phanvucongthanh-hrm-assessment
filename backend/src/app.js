import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rootRouter from "./routes/root.routes.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(compression());
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))
app.use('/api', rootRouter)

export default app;