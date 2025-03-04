import User from "../models/user.js";

let message = "";
export const errorMessage = () => message;

function checkPasswordCriteria(password) {
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&^*])(?=.{8,})/;

    let isValid = passwordCriteria.test(password);

    return isValid ? true : false;
}

export const validateLoginForm = (formInfo) => {
    const { email, password } = formInfo;

    if (!email || !password) {
        message = "All fields are required.";
        return false;
    }

    return true;
};

export const validateRegisterForm = async (formInfo) => {
    const { name, email, password, confirmPassword } = formInfo;

    if (!name || !email || !password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    const isEmailRegistered = await User.findOne({ email: email });
    if (isEmailRegistered) {
        message = "An account with this email already exists.";
        return false;
    }

    const isPasswordValid = checkPasswordCriteria(password);

    if (isPasswordValid) {
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";

        return false;
    }

    return true;
};

export const validateChangePasswordForm = (formInfo) => {
    const { password, confirmPassword } = formInfo;

    if (!password || !confirmPassword) {
        message = "All fields are required.";
        return false;
    }

    const isPasswordValid = checkPasswordCriteria(password);

    if (isPasswordValid) {
        if (password !== confirmPassword) {
            message = "Passwords don't match.";

            return false;
        }
    } else {
        message =
            "Invalid Password! Password must contain: 1 lower and upper case letter, 1 digit, 1 special character and must be a minimum of 8 characters.";

        return false;
    }

    return true;
};
