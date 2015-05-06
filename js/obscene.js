var obscene = {
    getFirstTag: function(tag) {
        return document.getElementsByTagName(tag)[0];
    },
    getId: function(id) {
        return document.getElementById(id);
    },
    setStyle: function(el, property, value) {
        el.style.setProperty(property, value);
    }
};
