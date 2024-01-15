const bcrypt = require('bcrypt');
const { checkUser, saveUser } = require('../models/User');

exports.signupProcess = async (req, res) => {
    const { name, email, username, password } = req.body;
    const user = await checkUser(username);
    if (user.length > 0) {
        req.session.error = 'Username already exists';
        res.redirect("/signup");
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await saveUser(name, username, email, hashedPassword);
        req.session.username = username;
        req.session.message = 'User created successfully';
        res.redirect("/chat");
    }
};
exports.loginProcess = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await checkUser(username);
        if (user.length == 1 && await bcrypt.compare(password, user[0].password)) {
            req.session.username = username;
            res.redirect("/chat");
        } else {
            req.session.error = 'Invalid Credentials';
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
        req.session.error = 'Internal Server Error';
        req.redirect("/login");
    }
};

exports.chat = async (req, res) => {
    res.render('chat', { sender: req.session.username, receiver: req.matches.receiver });
};

exports.logout = async (req, res) => {
    delete req.session.username;
    res.redirect("/");
};
