var translation = {
    get: function(text) {
        return translation[text][config.language];
    },
    mailSent: {
        "de": "Sie haben eine Mail erhalten.<br>Bitte bestätigen Sie diese.",
        "en": "We have sent a mail to you.<br>Please verify your mail."
    }
    alreadySubscribed: {
        "de": "Sie haben bereits<br>abonniert.",
        "en": "You already<br>have subscribed."
    },
    tryAgainOrContact: {
        "de": "Bitte erneut versuchen<br>oder uns kontaktieren.",
        "en": "Please try again<br>or contact us."
    },
    tryAgain: {
        "de": "Bitte erneut versuchen.",
        "en": "Please try again."
    },
    requestSent: {
        "de": "Anfrage gesendet.",
        "en": "Request sent."
    },
    notValidMail: {
        "de": "Keine gültige Mail.",
        "en": "Not a valid mail."
    },
    enterRequest: {
        "de": "Bitte geben Sie<br> eine Anfrage an.",
        "en": "Please enter<br>a request."
    }
}
