/* eslint-disable no-use-before-define */
import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import * as fs from "fs";
import { generateAuthToken, getHashedPassword } from "./helpers/auth";

const app = express();
const port = 3000;

interface Config {
    users: {
        name: string;
        email: string;
        password: string;
    }[];
    currentURL: string;
}

const authTokens = {};
let config = {} as Config;
const CONFIG_FILE = "/app/data/data.json";
if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
} else {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE).toString());
}
const users = config?.users || [];

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.engine("hbs", handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials/`,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
    const authToken = req.cookies?.["AuthToken"];
    res.locals.user = authTokens[authToken];
    next();
});

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find((u) => u.email === email && hashedPassword === u.password);

    if (user) {
        const authToken = generateAuthToken();
        authTokens[authToken] = user;
        res.cookie("AuthToken", authToken);
        res.redirect("/config");
    } else {
        res.render("login", {
            message: "Invalid username or password",
            messageClass: "alert-danger",
        });
    }
});
app.post("/config/currentURL/save", (req, res) => {
    const { url } = req.body;

    config.currentURL = url;
    saveConfig();

    res.redirect("/config");
});
app.get("/config", (req, res) => {
    if (res.locals.user) {
        res.render("config", { url: config.currentURL });
    } else {
        res.render("login", {
            message: "Please login to continue",
            messageClass: "alert-danger",
        });
    }
});
app.get("/live", (req, res) => {
    res.render("empty", { layout: "live-frame", url: config.currentURL });
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening to port ${port}`));

function saveConfig() {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config));
}
