const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name']
    },
    email:{
        type:String,
        required:[true,'Please enter Email Address']
    },
    password:{
        type:String,
        required:[true,'Please enter Password'],
        minlength: [6, "Min 6 Chars"],
        select: false
    },
    avtar: {
        public_id: String,
        url: String,
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    verifyOTP:String,
    verifyOTPexpires:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date
})

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getToken = async function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET)
}

userSchema.methods.generateOTP =  function(){
    function generateRandomNumber() {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
    }

    return generateRandomNumber();
}



module.exports = mongoose.model("User", userSchema)