const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide name.'],
    },
    email: {
        type: String,
        required: [true, 'You must provide email.'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide valid email.']
    },
    password: {
        type: String,
        required: [true, 'You must provide password.'],
        validate: [validator.isStrongPassword, 'Password is not strong enough.'],
        select: false
    },
    photoUrl: {
        type: String
    }
}, { timestamps: true });


// Pre-save mongoose document hook/middleware to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance methods assigned to methods object of Mongoose schema are available on all model documents
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;