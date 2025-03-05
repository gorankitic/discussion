const transporter = require("./emailTransporter");

const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: "Discussion <kiticgoran90@gmail.com>",
        to,
        subject,
        html
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;