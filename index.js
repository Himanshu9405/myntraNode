import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import subCategoryRoutes from "./routes/subCategoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: "dhxwhquad", 
    api_key: "479197584911726", 
    api_secret: "R0YZbdRecIAIXFFKxs36Eg-Olrs"
});

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
app.use(fileUpload({
    useTempFiles: true,
}))

// routes
app.get("/", (req, res) => {
    res.send("<h1>welcome</h1>");
});

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/sub_category',subCategoryRoutes)
app.use('/api/v1/products',productRoutes)

app.listen(PORT, ()=> {
    console.log(`Server stared on ${PORT}`)
})