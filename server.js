import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Temporary data storage
let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit-post', { post, id });
});

app.post('/edit-post/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    posts[id] = { title, content };
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
