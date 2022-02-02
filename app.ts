import flash from "connect-flash";
import cookie from "cookie-parser";
import dotenv from 'dotenv';
import express from 'express';
import session from "express-session";
import morgan from 'morgan';
import { baseRoutes } from './src/routes/baseRoutes';

// Get all environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = `${process.env.BASE_URL || 'http://localhost'}:${port}`;

// Third Party Middlewares
app.use(morgan('dev'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Configure session, cookie, and flash
app.use(cookie("secret"));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Express Middlewares
app.use(express.static('public'));
app.use(express.static('dist/public'));
app.use('/uploads', express.static('uploads'));

// Routes
baseRoutes(app);

// Start server
app.listen(port, (): void => {
    console.log(`Image Converter is listening to ${baseUrl}`);
});
