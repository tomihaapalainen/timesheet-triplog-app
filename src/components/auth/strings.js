import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    signInWithGoogle: "Sign in with Google",
    signInWithFacebook: "Sign in with Facebook",
    errorSendingPasswordResetEmail:
      "Error while sending email for password reset. Please try again later.",
    linkSentToEmail: "A link for resetting your password has been sent to your email",
    requestPasswordResetEmail: "Request a link to reset your password",
    email: "Email",
    send: "Send",
    password: "Password",
    signIn: "Sign in",
    signUp: "Sign up",
    forgotPassword: "Forgot password? Request reset here",
    confirmEmail: "Confirm your email by clicking on the link sent to your email",
    accountCreationFailed: "Account creation failed",
    emailAlreadyInUse: "Email is already in use",
    invalidEmail: "Invalid email address",
    passwordTooWeak: "Password is too weak. Must be atleast 6 characters.",
    emailPasswordAccountsAreNotEnabled: "Email & Password accounts are not enabled",
  },
  fi: {
    signInWithGoogle: "Kirjaudu Google-tilillä",
    signInWithFacebook: "Kirjaudu Facebook-tilillä",
    errorSendingPasswordResetEmail:
      "Sähköpostin lähettäminen salasanan vaihtamiseksi ei onnistunut. Yritä myöhemmin uudelleen.",
    linkSentToEmail: "Sähköpostiisi on lähetetty linkki salasanan vaihtamiseksi",
    requestPasswordResetEmail: "Tilaa salasanan palautuslinkki sähköpostiisi",
    email: "Sähköposti",
    send: "Send",
    password: "Salasana",
    signIn: "Kirjaudu",
    signUp: "Rekisteröidy",
    forgotPassword: "Unohditko salasanasi? Palauta salasana täältä",
    confirmEmail: "Vahvista sähköpostiosoitteesi klikkaamalla sinne lähetettyä linkkiä",
    accountCreationFailed: "Tilin luonti ei onnistunut",
    emailAlreadyInUse: "Sähköpostiosoite on jo käytössä",
    invalidEmail: "Sähköpostiosoite ei kelpaa",
    passwordTooWeak: "Salasana liian heikko. Salasanan tulee olla vähintään 6 merkkiä.",
    emailPasswordAccountsAreNotEnabled:
      "Sähköpostilla ja salasanalla rekisteröitävät tilit eivät ole käytössä",
  },
});

export default strings;
