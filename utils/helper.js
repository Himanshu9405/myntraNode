import crypto from "crypto";

export const sendError = (res, message) => {
  return res.status(200).send({
    success: false,
    message: message,
  });
};

export const catchError = (res, message, error) => {
  return res.status(500).send({
    success: false,
    message: message,
    error,
  });
};

export const errorHandler = (res,statusCode,errorMessage)=>{
  return res.status(statusCode).send({
    success: false,
    message: errorMessage,
  });
}

export const createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const token = buff.toString("hex");
      resolve(token);
    });
  });