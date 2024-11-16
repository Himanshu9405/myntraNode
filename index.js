import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"

// rest object
const app = express();
const PORT = 3000;

//dotenv config
dotenv.config();

//database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
    res.send("<h1>welcome</h1>");
});

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)

app.listen(PORT, ()=> {
    console.log(`Server stared on ${PORT}`)
})