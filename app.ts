import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { baseRoutes } from './src/routes/baseRoutes';

// Get all environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = `${process.env.BASE_URL || 'http://localhost'}:${port}`;

// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
baseRoutes(app);

// Start server
app.listen(port, (): void => {
    console.log(`Image Converter is listening to ${baseUrl}`);
});
