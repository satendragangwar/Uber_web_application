import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from 'express';
import Connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import captainRoutes from './routes/captain.routes.js'
Connect();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// Route Handler
app.get('/', (req, res) => {
    res.send('hii sattu');
});
app.use('/users',userRoutes);
app.use('/captains', captainRoutes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is listening on port ${process.env.PORT}...`);
});
