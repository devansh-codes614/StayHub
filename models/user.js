const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose"); // ✅ Correct spelling

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// ✅ Correct method name and target
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", userSchema); // ✅ Fix spelling
