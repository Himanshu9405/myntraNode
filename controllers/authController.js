import userModels from "../models/userModels.js";
import VerificationToken from "../models/verificationToken.js";
import { generateOTP,sendMail,generateEmailTemplate } from "../utils/mail.js";
import { catchError, createRandomBytes, sendError } from "../utils/helper.js";

const registerController = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email.trim()) {
      return sendError(res, "Email is missing!");
    }

    // check if the user is already exists
    let user = await userModels.findOne({ email });

    // if the user doesn't exist then create a new account
    if (!user) {
      if (!name.trim()) {
        return sendError(res, "Name is missing for new user registration!");
      }

      user = new userModels({
        name,
        email,
      });

      await user.save();
    }

    const OTP = generateOTP();

    await VerificationToken.findOneAndDelete({
      owner: user._id,
    });

    const verificationToken = new VerificationToken({
      owner: user._id,
      token: OTP,
    });

    await verificationToken.save();

    // send the otp to user mail
    await sendMail(
      user.name,
      user.email,
      "Verify your Email Account",
      generateEmailTemplate(OTP)
    );

    res.status(200).send({
      success: true,
      message: "Check your email for verification",
    });
  } catch (error) {
    console.error(error);
    catchError(res, "Error in Login or Registration", error);
  }
};

const verifyOTPController = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!email.trim() || !otp.trim()) {
        return sendError(res, "Email and OTP are required!");
      }
  
      const user = await userModels.findOne({ email });
      if (!user) return sendError(res, "User not found!");
  
      const verificationToken = await VerificationToken.findOne({
        owner: user._id,
      });

      if (!verificationToken) {
        return sendError(res, "Invalid OTP or OTP has expired.");
      }
  
      // Mark user as verified
      user.verified = true;
      await user.save();
  
      // Delete the used OTP
      await VerificationToken.findByIdAndDelete(verificationToken._id);
  
      res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        user,
      });
    } catch (error) {
      console.error(error);
      catchError(res, "Error in OTP Verification", error);
    }
  };

export { registerController,verifyOTPController };
