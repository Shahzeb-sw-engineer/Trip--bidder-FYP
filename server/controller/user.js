const { UserModal, UserInfoModal } = require("../modal/User")
const TokenModel = require('../modal/Token')
const sendResponse = require("../utils/sendResponse")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendVerificationEmail = require('../utils/sendMail')
const { default: axios } = require("axios")
const { BidModal } = require("../modal/Bid")


const register = (req, res) => {
    if (req.body) {
        bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
            if (err) {
                sendResponse(req, res, false, "Error encrypting password: " + err, null);
                return
            }

            UserModal.findOne({ email: req.body.email })
                .then(dbUser => {
                    if (dbUser) {
                        sendResponse(req, res, false, "The Email Already exists, try another one ", err);
                        return
                    } else {
                        let user = new UserModal({
                            username: req.body.username,
                            email: req.body.email,
                            password: hashPassword,
                            status: req.body.status,
                            role: req.body.role,
                            isVerified: false
                        });

                        user.save()
                            .then(data => {
                                const token = new TokenModel({
                                    userID: user._id,
                                    token: crypto.randomBytes(16).toString('hex')
                                });

                                token.save()
                                    .then(savedToken => {
                                        const link = `http://${req.get('host')}/api/verify?token=${savedToken.token}&user=${user._id}`;
                                        sendVerificationEmail(req.body.email, link);
                                        sendResponse(req, res, true, "A verification email is sent to your account, please verify from Gmail", user);
                                    })
                                    .catch(tokenError => {
                                        sendResponse(req, res, false, "Error adding token: " + tokenError, null);
                                    });
                            })
                            .catch(err => {
                                sendResponse(req, res, false, "Error adding user: " + err, null);
                            });
                    }
                })
                .catch(err => {
                    sendResponse(req, res, false, "Error finding user: " + err, null);
                });
        });
    } else {
        sendResponse(req, res, false, "No data found in your request", null);
    }
};

const verfiyAccount = async (req, res) => {
    try {
        const { token, user: userID } = req.query;

        // Find the user with the given user id
        const dbuser = await UserModal.findOne({ _id: userID });
        if (!dbuser) {
            sendResponse(req, res, false, "The user not found", null)
            return
        }
        // get and check if the token is registered in db which is sent by the user 
        const dbtoken = await TokenModel.findOne({
            userID: dbuser._id,
            token: token
        })

        if (!dbtoken) {
            // sendResponse(req, res, false, "Invalid verification Link", null)
            res.send('<h1>Trip-bidder</h1><br><h5>We are Sorry! This link may be invalid or expired, Please Sign up again to continue</h5>')
            return
        }
        else {
            await UserModal.updateOne({ _id: userID }, { $set: { isVerified: true } });
            await TokenModel.deleteOne({ _id: dbtoken._id });

            let userData = await UserModal.findOne({ _id: userID })
            let role = userData.role

            let frontendUrl;;
            if (role == 'traveller') {
                frontendUrl = process.env.FRONTEND_URL + '/login';
            }
            else if (role == 'agent') {
                frontendUrl = `${process.env.FRONTEND_URL}/login?profile=false`;
            }
            // sendResponse(req, res, true, "Email verified successfully", null)

            res.send(`<h1>Verification Successfull!</h1><h5>Your acount verification is successfull, <a href="${frontendUrl}">Click here</a> to login</h5>`)

        }


    } catch (error) {
        console.error(error);
        sendResponse(req, res, false, "Internal Server Error", null)
    }
}

const login = async (req, res) => {
    try {
        if (!req.body) {
            return sendResponse(req, res, false, "No data found in your request", null);
        }

        const user = await UserModal.findOne({ email: req.body.email });

        if (!user) {
            return sendResponse(req, res, false, "User with this email not found", null);
        }

        if (!user.status) {
            return sendResponse(req, res, false, "User status is currently inactive", null);
        }

        // see the user email is verified ?
        if (!user.isVerified) {
            const tokenResult = await TokenModel.findOne({ userID: user._id });

            // if the user id with token is present in tokens collection means that email is not verified yet 
            if (tokenResult) {
                return sendResponse(req, res, false, "User email is not verified. Verify your email to continue.", null);
            }
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return sendResponse(req, res, false, "Invalid Password", null);
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, 'secret-value', { expiresIn: '1hr' });
        req.session.jwt = token;

        // Login successful
        sendResponse(req, res, true, "Login Successful", user);
    } catch (error) {
        // Handle any unexpected errors
        sendResponse(req, res, false, "An error occurred during login", error);
    }
};


const addNewUser = (req, res) => {
    if (req.body) {
        let userData = req.body; // get all data sent through api
        userData._id = userData.userID; // set the document id as userid for better searching for future

        let userInfo = new UserInfoModal(userData)
        userInfo.save(userInfo)
            .then(result => {
                sendResponse(req, res, true, "Data Added Successfully", result)
            })
            .catch(err => {
                sendResponse(req, res, false, "Error Adding Data", err)
                console.log(err)
            })
    }
    else {
        sendResponse(req, res, false, "No data found in your request", null)
    }
}

const getUserById = (req, res) => {
    const id = req.params.id;
    if (id) {
        UserModal.findOne({ _id: id })
            .then(response => {
                if (response) {
                    sendResponse(req, res, true, 'User found successfully', response)
                }
                else {
                    sendResponse(req, res, false, 'User not found', null)
                }
            })
            .catch(err => {
                sendResponse(req, res, false, 'Error fetching User', err)
            })
    }
    else {
        sendResponse(req, res, false, 'Id not found', null)
    }
}

const getUserByIdAndRole = (req, res) => {
    const id = req.params.id;
    const role = req.params.role;
    if (id && role) {
        UserInfoModal.findOne({ userID: id, role: role })
            .then(response => {
                if (response) {
                    sendResponse(req, res, true, 'User found successfully', response)
                }
                else {
                    sendResponse(req, res, false, 'User not found', null)
                }
            })
            .catch(err => {
                sendResponse(req, res, false, 'Error fetching User', err)
            })
    }
    else {
        sendResponse(req, res, false, 'Id not found', null)
    }
}

const getAllUsers = (req, res) => {
    UserModal.find()
        .then(response => {
            if (response) {
                sendResponse(req, res, true, "Users found successfully", response)
            }
            else {
                sendResponse(req, res, false, 'Users not found', null)
            }
        })
}

const getAgentStats = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "ID not found", null)
        }
        const completedBids = await BidModal.find({ userID: id, status: "accepted" });
        const data = {
            completedBids: completedBids
        }

        // console.log(completedBids)
        sendResponse(req, res, true, "Statistics found successfully", data)


    }
    catch (err) {
        sendResponse(req, res, false, "Error processing your request", err)
        console.log(err)
    }
}

const updateUserInfo = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return sendResponse(req, res, false, "User id not found", null);
    }

    try {
        const { fullName, profileImage, phone } = req.body;
        // console.log(req.body);

        const updateUser = await UserInfoModal.findOneAndUpdate({ _id: userId }, { fullName: fullName, profileImage: profileImage, phone: phone })

        // update the username same as full name
        const userDetails = await fetch(`${process.env.BACKEND_URL}/api/updateUsername/${userId}/${fullName}`);
        const userDetailsData = await userDetails.json();

        if (updateUser) {
            sendResponse(req, res, true, "User updated successfully", updateUser);
        } else {
            sendResponse(req, res, false, "Error updating user", null);
        }

    } catch (err) {
        console.error("Error updating user:", err);
        return sendResponse(req, res, false, "Error processing request, try again", null);
    }
};

const updateUsername = async (req, res) => {
    const userId = req.params.id;
    const username = req.params.username;
    if (!userId || !username) {
        return sendResponse(req, res, false, "User details not found", null);
    }

    try {

        const updateUser = await UserModal.findOneAndUpdate({ _id: userId }, { username: username })

        if (updateUser) {
            sendResponse(req, res, true, "Username updated successfully", updateUser);
        } else {
            sendResponse(req, res, false, "Error updating username", null);
        }

    } catch (err) {
        console.error("Error updating user:", err);
        return sendResponse(req, res, false, "Error processing request, try again", null);
    }
};




const updateUserStaus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        if (!id || !status) {
            return sendResponse(req, res, false, "User id or status not found", null);
        }

        let response = await UserModal.findOneAndUpdate({ _id: id }, { status: status })
        if (response) {
            sendResponse(req, res, true, "User status updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating User status ", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error Proceeding Request, try again", null)
    }
}


module.exports =
{
    register,
    login,
    addNewUser,
    verfiyAccount,
    getUserById,
    getUserByIdAndRole,
    getAllUsers,
    updateUserInfo,
    updateUserStaus,
    updateUsername,
    getAgentStats
}