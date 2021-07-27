const mongoose = require('mongoose');
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');

var studentSchema = new mongoose.Schema({

    name: {
        type: String,
        default: ""
        },

    email: {
        type: String,
        required: true,
        trim: true
    },

    rollno: {
        type: Number
    },
    role: {
        type: Number,
        default: 0
    },
    batch: {
        type: String
    },
    resetCode: String,
    expireCode: Date,
    newUser: {
        type: Boolean,
        default: true
    },
    year: {
        type: String
    },
    encry_password: {
        type: String
    },
    salt: String,

},
 {timestamps: true}
);


studentSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4(); 
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

studentSchema.methods = {

    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "" ;
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest("hex")
        } catch (error) {
            return "";
        }
    }
}


module.exports = mongoose.model("Student",studentSchema);