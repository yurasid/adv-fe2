var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var Wealth = require('containers/user-wealth/user-wealth.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    function render() {
        elem.html(App.templates['game']({}));
        elem.find('.wealth').append(new Wealth().render().elem);
        elem.find('.god-gift-form').append(new GodGiftForm().render().elem);
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
