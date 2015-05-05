//--CONFIG
var contentHeight;
var scrollTop;
var foundersScrollTop;
var scrollTops;
var pages = 9;
var currentDot;
var firstLoad = true;
var memberPicsReleased = false;
var milestonesReleased = false;
var socialNetworksReleased = false;
//--CONFIG-END


//SOCIAL-MEDIA
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
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
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/de_DE/sdk.js#xfbml=1&appId=254135427968559&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function loadFacebook() {
    window.location.href = "https://www.facebook.com/unverschamt";
}

function loadInstagram() {
    window.location.href = "http://instagram.com/unverschaemt_official";
}

function loadTumblr() {
    window.location.href = "http://blog.unverschaemt.net";
}

function loadPage() {
    relocateContentElements();
    setTimeout('logo.classList.remove("opacity-hidden")', 200);
    setTimeout('document.getElementById("scroll-arrow").classList.remove("opacity-hidden")', 2500);
    scrollTop = 0;
    currentDot = 0;
}

function relocateContentElements() {
    var paddingTop = ((document.childNodes[1].clientHeight - logo.clientHeight) / 2);
    if (document.childNodes[1].clientWidth > 1105) {
        landing.style.padding = (paddingTop - 10) + "px 3%" + (paddingTop + 10) + "px 3%";
    } else {
        landing.style.padding = (paddingTop - 50) + "px 3%" + "3% 3%";
    }
    navigation.childNodes[3].style.marginTop = (contentHeight - navigation.childNodes[3].clientHeight + 40) / 2 + "px";
    initializeHeight();
    resizeTriangles();
    if (!firstLoad) {
        slideNavigation();
        firstLoad = false;
    }
}

function resizeTriangles() {
    var newWidth = document.body.clientWidth;
    var triangleTopLeft = document.getElementsByClassName('triangle-top-left');
    var triangleTopRight = document.getElementsByClassName('triangle-top-right');
    var triangleBottomLeft = document.getElementsByClassName('triangle-bottom-left');
    var triangleBottomRight = document.getElementsByClassName('triangle-bottom-right');
    for (var i = 0; i < triangleTopLeft.length; ++i) {
        triangleTopLeft[i].style.borderWidth = "110px " + newWidth + "px 0 0";
    }
    for (var i = 0; i < triangleTopRight.length; ++i) {
        triangleTopRight[i].style.borderWidth = "0 " + newWidth + "px 110px 0";
    }
    for (var i = 0; i < triangleBottomLeft.length; ++i) {
        triangleBottomLeft[i].style.borderWidth = "110px 0 0 " + newWidth + "px";
    }
    for (var i = 0; i < triangleBottomRight.length; ++i) {
        triangleBottomRight[i].style.borderWidth = "0 0 110px " + newWidth + "px";
    }
}

function initializeHeight() {
    contentHeight = document.getElementsByTagName("html")[0].clientHeight;
    var halfContentHeight = (contentHeight / 2);
    scrollTops = [];
    scrollTops.push(0);
    scrollTops.push(member.offsetTop - halfContentHeight - 60);
    scrollTops.push(document.getElementById('about-us').offsetTop - halfContentHeight);
    scrollTops.push(document.getElementById('stock-party').offsetTop - halfContentHeight - 120);
    scrollTops.push(document.getElementById('monster-safari').offsetTop - halfContentHeight - 120);
    scrollTops.push(instagram.offsetTop - halfContentHeight);
    scrollTops.push(document.getElementById('social-networks').offsetTop - halfContentHeight - 120);
    scrollTops.push(impressum.offsetTop - halfContentHeight);
    scrollTops.push(contact.offsetTop - halfContentHeight);
}

function validateEmail(email) {
    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
}


function openNewsletterForm() {
    document.getElementById('newsletter-container').style.display = "inline-block";
    document.getElementById('newsletter-mail').value = "";
    setTimeout('document.getElementById("newsletter-box").classList.remove("scale-out")', 30);
    document.getElementById('subscribe-newsletter').focus();
}

function hideNewsletterForm(force) {
    var targetItem = event.target.toString();
    if (targetItem.indexOf("Dialog") != -1 || targetItem.indexOf("Unknown") != -1 || force == true) {
        document.getElementById('newsletter-box').classList.add("scale-out");
        setTimeout('document.getElementById("newsletter-container").style.display = "none"', 420);
    }
}

function aboNewsletter() {
    var getNewsletterButtonText = document.getElementById('subscribe-newsletter').innerHTML;
    var mail = document.getElementById('newsletter-mail').value;
    if (validateEmail(mail)) {
        sendNewsletterSubscriptionMail(mail);
    } else {
        showPopup(false, "Not a valid mail.");
    }
}

function closeNewsletterButton() {
    setTimeout('document.getElementById("subscribe-newsletter").style.borderRadius = "50px"', 800);
    setTimeout('document.getElementById("subscribe-newsletter").innerHTML = "Sent"', 800);
    setTimeout('document.getElementById("subscribe-newsletter").style.opacity = 0.3', 200);
    setTimeout('document.getElementById("subscribe-newsletter").style.zIndex = "-1"', 801);
}

function sendNewsletterSubscriptionMail(mail) {
    var request = new XMLHttpRequest();
    request.open("POST", "php/sendSubscriptionMail.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function receive() {
        if (request.readyState == 4) {
            if (request.responseText == "1") {
                showPopup(true, "We have sent a mail to you. <br>Please verify your mail.");
                closeNewsletterButton();
                hideNewsletterForm(true);
            } else {
                if (request.responseText == "2") {
                    showPopup(true, "You already <br>have subscribed.")
                } else {
                    showPopup(false, "Please try again <br>or contact us.");
                }
            }
        }
    }
    request.send("mail=" + mail);
}

function unsubscribeNewsletter(mail) {
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

function showNavigationText(dot) {
    document.getElementsByClassName("navigation-text")[dot].classList.add("opacity-full");
    setTimeout('document.getElementsByClassName("navigation-text")[' + dot + '].classList.remove("opacity-full")', 800);
}

function hideNavigationText(dot) {
    document.getElementsByClassName("navigation-text")[dot].classList.remove("opacity-full");
}

function setNavigationDot(dot) {
    if (dot != currentDot) {
        document.getElementsByClassName("current")[0].classList.remove("current");
        document.getElementsByClassName("navigation-dot")[dot].classList.add("current");
        hideNavigationText(currentDot);
        showNavigationText(dot);
        currentDot = dot;
    }
    if (dot == 0) {
        document.getElementById("scroll-arrow").classList.remove("opacity-hidden");
        document.getElementById("navigation-home").classList.add("opacity-hidden");
    } else {
        document.getElementById("navigation-home").classList.remove("opacity-hidden");
    }
    if (dot == 1) {
        document.getElementById("scroll-arrow").classList.add("opacity-hidden");
        if (!memberPicsReleased) {
            memberPicsReleased = true;
            for (var i = 0; i < 5; ++i) {
                setTimeout('founder.getElementsByTagName("figure")[' + i + '].classList.remove("opacity-hidden")', i * 150);
            }
        }
    }
    if (dot == 2) {
        if (!milestonesReleased) {
            milestonesReleased = true;
            for (var i = 0; i < 3; ++i) {
                setTimeout('document.getElementsByClassName("milestone-graph")[' + i + '].getElementsByTagName("img")[0].classList.remove("opacity-hidden")', i * 150);
                setTimeout('document.getElementsByClassName("milestone")[' + i + '].classList.remove("opacity-hidden")', i * 150);
            }
        }
    }
    if (dot == 6) {
        if (!socialNetworksReleased) {
            socialNetworksReleased = true;
            for (var i = 0; i < 3; ++i) {
                setTimeout('document.getElementsByClassName("social-network-follow")[' + i + '].classList.remove("opacity-hidden")', i * 150);
                setTimeout('document.getElementsByClassName("social-network")[' + i + '].classList.remove("opacity-hidden")', i * 150);
            }
        }
    }
}

function slideNavigation() {
    scrollTop = window.pageYOffset;
    for (var i = pages - 1; i >= 0; --i) {
        if (scrollTop >= scrollTops[i]) {
            setNavigationDot(i);
            return;
        }
    }
}

function scrollToPage(index) {
    document.body.classList.add("transition-800");
    document.body.style.marginTop = (scrollTop - (scrollTops[index] + (index == 0 ? 0 : 300))) + "px";
    setTimeout('document.body.classList.remove("transition-800")', 800);
    setTimeout('document.body.style.marginTop = "0px"', 801);
    setTimeout('document.body.scrollTop = ' + (scrollTops[index] + (index == 0 ? 0 : 300)), 805);
    slideNavigation();
}

function showPopup(success, failResponse) {
    popup.style.display = "inline-block";
    if (success) {
        popup.getElementsByTagName("h2")[0].innerHTML = "Success";
        message.innerHTML = failResponse;
    } else {
        popup.getElementsByTagName("h2")[0].innerHTML = "Failed";
        message.innerHTML = failResponse;
    }
    setTimeout('document.getElementById("message-box").classList.remove("scale-out")', 30);
}

function closePopup() {
    document.getElementById('message-box').classList.add("scale-out");
    setTimeout('popup.style.display = "none"', 420);
}

function sendContactRequest() {
    var contactMail = document.getElementById('contact-mail').value;
    var contactSubject = escape(document.getElementById('contact-subject').value);
    var contactRequest = document.getElementById('contact-request').value;
    contactRequest = contactRequest.replace(/(\r\n|\n|\r)/gm, "<br>");
    contactRequest = escape(contactRequest);
    if (contactRequest != "" && contactRequest != undefined) {
        if (validateEmail(contactMail)) {
            var request = new XMLHttpRequest();
            request.open("POST", "php/contact.php", true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.onreadystatechange = function receive() {
                if (request.readyState == 4) {
                    if (request.responseText) {
                        document.getElementById('contact-subject').value = "";
                        document.getElementById('contact-request').value = "";
                        showPopup(true, "Request sent.");
                    } else {
                        showPopup(false, "Try again.");
                    }
                }
            }
            request.send("mail=" + contactMail + "&subject=" + contactSubject + "&message=" + contactRequest);
        } else {
            showPopup(false, "Not a valid mail.");
        }
    } else {
        showPopup(false, "Enter a request.");
    }
}
window.onbeforeunload = function (e) {
    window.scrollTo(0, 0);
};
window.onload = loadPage;
window.onresize = relocateContentElements;