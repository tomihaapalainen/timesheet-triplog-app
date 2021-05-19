import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    serverNotResponding: "Server is not responding. Please try again later.",
    errorSendingPasswordResetEmail:
      "Error while sending email for password reset. Please try again later.",
    linkSentToEmail: "A link for resetting your password has been sent to your email",
    requestPasswordResetEmail: "Request a link to reset your password",
    email: "Email",
    name: "Name",
    send: "Send",
    password: "Password",
    signIn: "Sign in",
    signUp: "Sign up",
    forgotPassword: "Forgot password? Request reset here",
    accountCreationFailed: "Account creation failed",
    emailAlreadyInUse: "Email is already in use",
    invalidEmail: "Invalid email address",
    passwordTooWeak: "Password is too weak. Must be atleast 6 characters.",
    emailPasswordAccountsAreNotEnabled: "Email & Password accounts are not enabled",
    register: "Create an account",
    alreadyRegistered: "Already have an account? Sign in here",
    signInToAccount: "Sign in to your account",
    noAccountYet: "No account? Register here",
  },
  fi: {
    serverNotResponding: "Palvelin ei vastaa. Ole hyvä ja yritä myöhemmin uudelleen.",
    errorSendingPasswordResetEmail:
      "Sähköpostin lähettäminen salasanan vaihtamiseksi ei onnistunut. Yritä myöhemmin uudelleen.",
    linkSentToEmail: "Sähköpostiisi on lähetetty linkki salasanan vaihtamiseksi",
    requestPasswordResetEmail: "Tilaa salasanan palautuslinkki sähköpostiisi",
    email: "Sähköposti",
    name: "Nimi",
    send: "Send",
    password: "Salasana",
    signIn: "Kirjaudu",
    signUp: "Rekisteröidy",
    forgotPassword: "Unohditko salasanasi? Palauta salasana täältä",
    accountCreationFailed: "Tilin luonti ei onnistunut",
    emailAlreadyInUse: "Sähköpostiosoite on jo käytössä",
    invalidEmail: "Sähköpostiosoite ei kelpaa",
    passwordTooWeak: "Salasana liian heikko. Salasanan tulee olla vähintään 6 merkkiä.",
    emailPasswordAccountsAreNotEnabled:
      "Sähköpostilla ja salasanalla rekisteröitävät tilit eivät ole käytössä",
    register: "Luo asiakastili",
    alreadyRegistered: "Joko sinulla on tili? Kirjaudu sisään täällä",
    signInToAccount: "Kirjaudu asiakastilillesi",
    noAccountYet: "Ei asiakastiliä? Luo tili täällä",
  },
});

export default strings;
