import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});

app.get('/', (req, res) => {
    res.render('main', {layout: 'index'});
});
app.get('/config', (req, res) => {
    res.render('config', {layout: 'index'});
});
app.get('/live', (req, res) => {
    res.render('live', {layout: 'live'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));