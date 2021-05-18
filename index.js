import app from './app.js';


app.set('port', (5000));

app.listen(app.get('port'), () => console.log(`Server has been started`));


