const nodemailer = require('nodemailer')

const sendVerificationEmail = (email, link) => {
    let smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // const linkToFrontend = `http://localhost:5173/api/verify?token=${user.verificationToken}`;

    const mailOptions = {
        to: email,
        from: "No-Reply@tripbidder.com",
        subject: "Please confirm your Email account for Trip-Bidder",
        html: "Hello Its from Trip-bidder team!<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            // console.log("Email sent Successfully ");
        }
    });
}

module.exports = sendVerificationEmail