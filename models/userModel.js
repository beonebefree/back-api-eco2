const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
},
{
    timestamps: true,
});

//password encriptada 
userSchema.pre('save', async function (next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await  bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)