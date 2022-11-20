// every error that we get here we use the console to go through it, but for user it is not good experience hence mapping the type of errors and showing it to user
// every error has its unique code and its message err.code and err.message
// console.log(err.code, err.message);
// err.message is also not very readable to be directly shown to user
// mapping {the error(err code) : what should be shown to user(err message)}

const errorMapping = {
    "auth/email-already-in-use" : "Email already in use",
    "auth/wrong-password" : "Invalid credentials",
    "auth/weak-password" : "Password must be 6 or more characters",
    "auth/user-not-found" : "Please enter a valid email address or signup",
    "auth/unknown" : "Please try again later"
}

export default errorMapping;