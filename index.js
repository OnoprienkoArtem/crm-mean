import app from './app.js';

const port = process.envPORT || 5000;

app.listen(port, () => console.log(`Server has been started on ${port}`));


