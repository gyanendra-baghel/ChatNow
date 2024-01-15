const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const authController = require('./controllers/authController');
const isAuthenticated = require("./middlewares/isAuthenticated")

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(session({
    secret: "ihfdihuihfdu-fd",
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.render('index', { title: "Chatapp" });
});
app.get("/login", (req, res) => {
    res.render('login', { title: "Login Page" });
});
app.get("/signup", (req, res) => {
    res.render('signup', { title: "Signup Page" });
});
app.get("/chat", isAuthenticated, (req, res) => {
    res.render('chat', { title: "Chat Page" });
});
app.post('/signup-process', authController.signupProcess);
app.post('/login-process', authController.loginProcess);
app.get('/logout', isAuthenticated, authController.logout);
app.get("/to/:receiver", isAuthenticated, authController.chat);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});