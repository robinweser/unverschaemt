var view = {
    totalHeight: undefined,
    scrollTops: [],
    currentDot: undefined,
    pages: ["about", "team", "skill", "products", "socials", "contact"],
    scrolling: false,
    init: function () {
        view.totalHeight = obscene.getFirstTag("html").clientHeight;
        view.scrollTops.push(0);
        view.pages.forEach(function (item) {
            var page = obscene.getId(item);
            var add = 60;
            if (item == "team") {
                add -= 200;
            } else if (item == "contact") {
                add += 60;
            }
            view.scrollTops.push(page.offsetTop + (view.totalHeight / 2) - add);
        });
    },
    openInstagram: function () {
        window.location.href = "http://instagram.com/unverschaemt_official";
    },
    openOpenSource: function () {
        window.location.href = "http://unverschaemt.github.io";
    },
    onPageLoad: function () {
        view.doLayout();
        view.currentDot = 0;
    },
    onPageScroll: function () {
        for (var i = view.pages.length; i >= 0; --i) {
            if (window.pageYOffset >= view.scrollTops[i]) {
                view.setNavigationDot(i);
                return;
            }
        }
    },
    setNavigationDot: function (dot) {
        if (dot != view.currentDot) {
            document.getElementsByClassName("active")[0].classList.remove("active");
            obscene.getFirstTag("nav").getElementsByTagName("li")[dot].getElementsByTagName("span")[0].classList.add("active");
            view.hideNavigationText(view.currentDot);
            view.showNavigationText(dot);
            view.currentDot = dot;
        }
        if (dot == 0) {
            view.hide(document.getElementsByClassName("fa-chevron-up")[0]);
        } else {
            view.show(document.getElementsByClassName("fa-chevron-up")[0]);
        }
    },
    doLayout: function () {
        document.body.style.setProperty("height", view.totalHeight);
        var ul = document.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0];
        ul.style.setProperty("margin-top", ((view.totalHeight - ul.clientHeight - 20) / 2) + "px");
        view.init();
    },
    show: function (el) {
        return el.classList.contains("invisible") && el.classList.remove("invisible");
    },
    hide: function (el) {
        return el.classList.contains("invisible") && el.classList.add("invisible");
    },
    closeNewsletterButton: function () {
        var newsletterButton = obscene.getFirstTag("header").getElementsByTagName("button")[0];
        setTimeout(obscene.setStyle(newsletterButton, "border-radius", "50x"), 800);
        setTimeout(obscene.setStyle(newsletterButton, "opacity", "0.3"), 200);
        setTimeout(obscene.setStyle(newsletterButton, "z-index", "-1"), 801);
        setTimeout(function () {
            newsletterButton.innerHTML = "Sent"
        }, 800);
    },
    showNewsletterBox: function () {
        document.getElementById('newsletter-container').style.display = "inline-block";
        document.getElementById('newsletter-mail').value = "";
        setTimeout('document.getElementById("newsletter-box").classList.remove("scale-out")', 30);
        document.getElementById('subscribe-newsletter').focus();
    },
    hideNewsletterBox: function (force) {
        var targetItem = event.target.toString();
        if (targetItem.indexOf("Dialog") != -1 || targetItem.indexOf("Unknown") != -1 || force == true) {
            document.getElementById('newsletter-box').classList.add("scale-out");
            setTimeout('document.getElementById("newsletter-container").style.display = "none"', 420);
        }
    },
    showNavigationText: function (dot) {
        var navigationText = obscene.getFirstTag("nav").getElementsByTagName("li")[dot].getElementsByTagName("p")[0];

        navigationText.classList.remove("invisible");
        setTimeout(function () {
            navigationText.classList.add("invisible");
        }, 800);
    },
    hideNavigationText: function (dot) {
        obscene.getFirstTag("nav").getElementsByTagName("p")[dot].classList.add("invisible");
    },
    scrollTo: function (index) {
        if (index == "home") {
            index = 0;
            //view.parallaxBackground(true);
        } else {
            index = view.pages.indexOf(index) + 1;
        }
        var main = obscene.getFirstTag("main");
        main.classList.add("transition-800");
        obscene.setStyle(main, "margin-top", (window.pageYOffset - (view.scrollTops[index] + (index == 0 ? 0 : 200))) + "px");
        setTimeout('obscene.getFirstTag("main").classList.remove("transition-800")', 800);
        setTimeout('obscene.getFirstTag("main").style.marginTop = "0px"', 805);
        setTimeout('document.body.scrollTop = ' + (view.scrollTops[index] + (index == 0 ? 0 : 200)), 810);
        setTimeout('view.onPageScroll()', 820);
    },
    showPopup: function (success, failResponse) {
        popup.style.display = "inline-block";
        if (success) {
            popup.getElementsByTagName("h2")[0].innerHTML = translation.get('success');
            message.innerHTML = failResponse;
        } else {
            popup.getElementsByTagName("h2")[0].innerHTML = translation.get('failure');
            message.innerHTML = failResponse;
        }
        setTimeout('document.getElementById("message-box").classList.remove("scale-out")', 30);
    },
    hidePopup: function () {
        document.getElementById('message-box').classList.add("scale-out");
        setTimeout('popup.style.display = "none"', 420);
    }
};

window.onload = view.onPageLoad;
window.onresize = view.doLayout;