import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    errorSendingPasswordResetEmail:
      "Error while sending email for password reset. Please try again later.",
    linkSentToEmail: "A link for resetting your password has been sent to your email",
    requestPasswordResetEmail:
      "Request a link for resetting your password to be sent to your email",
    email: "Email",
    send: "Send",
    password: "Password",
    signIn: "Sign in",
    signUp: "Sign up",
    forgotPassword: "Forgot password? Request reset here",
    confirmEmail: "Confirm your email by clicking on the link sent to your email",
    accountCreationFailed: "Account creation failed",
  },
  fi: {
    errorSendingPasswordResetEmail:
      "Sähköpostin lähettäminen salasanan vaihtamiseksi ei onnistunut. Yritä myöhemmin uudelleen.",
    linkSentToEmail: "Sähköpostiisi on lähetetty linkki salasanan vaihtamiseksi",
    requestPasswordResetEmail: "Tilaa salasanan palautuslinkki sähköpostiisi",
    email: "Sähköposti",
    send: "Lähetä",
    password: "Salasana",
    signIn: "Kirjaudu",
    signUp: "Rekisteröidy",
    forgotPassword: "Unohditko salasanasi? Palauta salasana täältä",
    confirmEmail: "Vahvista sähköpostiosoitteesi klikkaamalla sinne lähetettyä linkkiä",
    accountCreationFailed: "Tilin luonti ei onnistunut",
  },
});

export default strings;
