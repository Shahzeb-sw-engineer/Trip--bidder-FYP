const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        value: Date.now()
    }
}, { timestamps: true })


const UserInfoSchema = new mongoose.Schema({
    userID: { type: String, ref: 'users' },
    fullName: { type: String },
    profileImage: { type: String },
    phone: {
        type: String,
        unique: false
    },
    slogan: { type: String },
    bio: { type: String },
    businessName: { type: String },
    businessEmail: { type: String },
    businessBio: { type: String },
    accomodation: { type: Boolean },
    localAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    role: { type: String, required: true }
}, { collection: 'userInfo' })


exports.UserModal = mongoose.model('users', UserSchema)
exports.UserInfoModal = mongoose.model('usersInfo', UserInfoSchema)
