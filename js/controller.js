var controller = {
    validateEmail: function(email) {
        var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    },
    aboNewsletter: function() {
        var mail = document.getElementById('newsletter-mail').value;
        if (controller.validateEmail(mail)) {
            controller.sendNewsletterSubscriptionMail(mail);
        } else {
            view.showPopup(false, translation.get('notValidMail'));
        }
    },
    sendNewsletterSubscriptionMail: function(mail) {
        var request = new XMLHttpRequest();
        request.open("POST", "php/sendSubscriptionMail.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function receive() {
            if (request.readyState == 4) {
                if (request.responseText == "1") {
                    view.showPopup(true, translation.get('mailSent'));
                    view.closeNewsletterButton();
                    view.hideNewsletterForm(true);
                } else {
                    if (request.responseText == "2") {
                        view.showPopup(true, translation.get('alreadySubscribed'))
                    } else {
                        view.showPopup(false, translation.get('tryAgainOrContact'));
                    }
                }
            }
        }
        request.send("mail=" + mail);
    },
    sendContactRequest: function() {
        var contactMail = document.getElementById('contact-mail').value;
        var contactSubject = escape(document.getElementById('contact-subject').value);
        var contactRequest = document.getElementById('contact-request').value;
        contactRequest = contactRequest.replace(/(\r\n|\n|\r)/gm, "<br>");
        contactRequest = escape(contactRequest);
        if (contactRequest != "" && contactRequest != undefined) {
            if (controller.validateEmail(contactMail)) {
                var request = new XMLHttpRequest();
                request.open("POST", "php/contact.php", true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.onreadystatechange = function receive() {
                    if (request.readyState == 4) {
                        if (request.responseText) {
                            document.getElementById('contact-subject').value = "";
                            document.getElementById('contact-request').value = "";
                            view.showPopup(true, translation.get('requestSent'));
                        } else {
                            view.showPopup(false, translation.get('tryAgain'));
                        }
                    }
                }
                request.send("mail=" + contactMail + "&subject=" + contactSubject + "&message=" + contactRequest);
            } else {
                view.showPopup(false, translation.get('notValidMail'));
            }
        } else {
            view.showPopup(false, translation.get('enterRequest'));
        }
    },
    unsubscribeNewsletter: function(mail) {
        var reqquest = new XMLHttpRequest();
        request.open("POST", "php/unsubscribe.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function receive() {
            if (request.readyState == 4) {
                //TODO echo abfangen
            }
        }
        request.send("mail=" + mail);
    }
}

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-52552266-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/de_DE/sdk.js#xfbml=1&appId=254135427968559&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
