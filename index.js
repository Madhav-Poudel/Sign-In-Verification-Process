const express = require("express");
const dotenv = require('dotenv');
const sequelize = require('./config/db.js');
const bodyParser = require('body-parser');
const User = require("./models/User.js")

const app = express();
const port = process.env.PORT || 5001;
app.get('/', (req, res) => {
    res.send("Welcome To Nodejs Backend Server")
})

// userRoute Middleware
app.use(bodyParser.json());
// User.sync({ force: true });
app.use('/api/user', require("./routes/userRoute.js"))
sequelize.sync()

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
