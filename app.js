import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';

import authRoutes from './roures/auth.js';
import analyticsRoutes from './roures/analytics.js';
import categoryRoutes from './roures/category.js';
import orderRoutes from './roures/order.js';
import positionRoutes from './roures/position.js';
import jwtPassport from './middleware/passport.js';

import keys from './config/keys.js';

const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error));


app.use(passport.initialize());
jwtPassport(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', passport.authenticate('jwt', {session: false}), analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', passport.authenticate('jwt', {session: false}), orderRoutes);
app.use('/api/position', passport.authenticate('jwt', {session: false}), positionRoutes);



export default app;
