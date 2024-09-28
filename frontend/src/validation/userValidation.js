function registerValidation(name, email, mobile, password, confirm, toast) {
  name = name.trim();
  email = email.trim();
  mobile = mobile.trim();
  password = password.trim();
  confirm = confirm.trim();

  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  //   const mobileRegex = /^\+?[1-9]\d{1,14}$/;
  //   const passRegex =
  //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!name || !email || !mobile || !password || !confirm) {
    return toast.error("All fields are required", {
      hideProgressBar: true,
      className: "custom-toast-error",
      autoClose: 2000,
    });
  } else {
    return true;
  }

  //   if (!emailRegex.test(email)) {
  //     return toast.error("Invalid email format", {
  //       hideProgressBar: true,
  //       className: "custom-toast-error",
  //       autoClose: 2000,
  //     });
  //   }

  //   if (!mobileRegex.test(mobile)) {
  //     return toast.error("Invalid mobile number", {
  //       hideProgressBar: true,
  //       className: "custom-toast-error",
  //       autoClose: 2000,
  //     });
  //   }

  //   if (!passRegex.test(password)) {
  //     return toast.error(
  //       "Password must be at least 8 characters long, contain one uppercase, one lowercase, one digit, and one special character",
  //       {
  //         hideProgressBar: true,
  //         className: "custom-toast-error",
  //         autoClose: 2000,
  //       }
  //     );
  //   }

  //   if (password !== confirm) {
  //     return toast.error("Passwords do not match", {
  //       hideProgressBar: true,
  //       className: "custom-toast-error",
  //       autoClose: 2000,
  //     });
  //   }
}

export default registerValidation;
