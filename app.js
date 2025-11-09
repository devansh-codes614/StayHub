// Load .env only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");

const User = require("./models/user");

// Routes
const userRoutes = require("./routes/user");
const listings = require("./routes/listing");
const reviews = require("./routes/review");


// ✅ DATABASE CONNECTION (Render + Local both supported)
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("✅ Connected to DB"))
  .catch((err) => console.log("❌ DB Connection Error:", err));


// ✅ VIEW ENGINE + MIDDLEWARE
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// ✅ SESSION STORE (MongoStore)
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // update once every 24h
});

store.on("error", function (err) {
  console.log("❌ SESSION STORE ERROR:", err);
});

// ✅ SESSION CONFIG
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());


// ✅ PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ FLASH + CURRENT USER
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// ✅ ROUTES
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRoutes);


// ✅ FIX: HOME PAGE → redirect to listings
app.get("/", (req, res) => {
  res.redirect("/listings");
});


// ✅ 404 HANDLER
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no! Something went wrong.";
  res.status(statusCode).render("error.ejs", { err });
});


// ✅ SERVER (PORT fix for Render)
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
