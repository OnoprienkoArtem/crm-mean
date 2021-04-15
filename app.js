import express from 'express';
import authRoutes from './roures/auth.js';
import analyticsRoutes from './roures/analytics.js';
import categoryRoutes from './roures/category.js';
import orderRoutes from './roures/order.js';
import positionRoutes from './roures/position.js';

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);


export default app;
