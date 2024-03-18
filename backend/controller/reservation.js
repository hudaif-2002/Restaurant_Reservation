import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  // Check for required fields
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    // return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
    return res.status(400).json({
                success: false,
                message: "Please Fill Full Reservation Form!",
              });
}

  // Phone number validation
  if (phone && phone.length > 10) {
    return res.status(400).json({
      success: false,
      message: "Phone number cannot exceed 10 digits",
    });
  }


// Handle first name validation
if (!firstName || firstName.length < 3 || firstName.length > 30) {
    return res.status(400).json({
      success: false,
      message: "First name must be between 3 and 30 characters",
    });
  }
  
  // Handle last name validation
  if (!lastName || lastName.length < 3 || lastName.length > 30) {
    return res.status(400).json({
      success: false,
      message: "Last name must be between 3 and 30 characters",
    });
  }
  
  
  // Handle email validation
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }
  
  function isValidEmail(email) {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // Other validations for email, first name, last name, etc. can be added here...

  try {
    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
};
