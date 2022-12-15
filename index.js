require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./models');
db.sequelize.sync().then(() => {
    console.log('Database is synced');
}).catch((err) => {
    console.log(err);
}
);

// const multer = require('multer');
// const upload = multer({ storage: storage }).single("demo_image");

var corsOptions = {
    origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


// require('./routes/routes.js')(app);
require('./routes/admin')(app);
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello World!');
}
);


PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});