const express = require("express");
const app = express();
const flash = require("connect-flash");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const Handlebars = require('handlebars');
const session = require("express-session");
const mongoStore = require("connect-mongodb-session")(session);
const fileUpload = require("express-fileupload");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const homeRouter = require("./routes/home");
const carsRouter = require("./routes/cars");
const addRouter = require("./routes/add");
const cardRouter = require("./routes/card");
const orderRouter = require("./routes/orders");
const authRouter = require("./routes/auth");
const registerRouter = require("./routes/register");
const User = require("./models/UserModel");
const firstMiddleware = require("./middleware/firstMid");
const userMiddleware = require("./middleware/UsersMid");
const notFound = require("./middleware/notfound");

const MONGODB_URL = "mongodb+srv://Stiles:nodeAlpha1999truealpha@clustertesla.cxdrzdv.mongodb.net/Tesla";

const hbs = exhbs.create({
    defaultLayout: "main", 
    extname: "hbs",
    helpers: require("./utils/helper"),
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const store = new mongoStore({
    collection: "sessions",
    uri: MONGODB_URL,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(session({secret: "secret val", resave: false, saveUninitialized: false, store: store}));
app.use(flash());
app.use(firstMiddleware);
app.use(userMiddleware);


app.use('/', homeRouter);
app.use('/cars', carsRouter);
app.use('/create', addRouter);
app.use("/card", cardRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);
app.use("/reg", registerRouter);

app.use(notFound);

async function start() {
    try {
        await mongoose.connect(MONGODB_URL, {useNewUrlParser: true});

        const client = await User.findOne();
        if(!client) {
            const user = new User({
                name: "theKhalim",
                email: "theKhalim@gmail.com",
                cart: {items: []},
            });
            await user.save();
        }

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {console.log(`Server started at Port ${PORT}...`)})
    } catch(err) {
        console.log(err);
    }
}

start();





