module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var name = options.name;
    var amount = options.amount || 10;

    function render() {
        elem.html(App.templates['resource']({
            name: name,
            amount: amount
        }));
        return this;
    }

    return {
        render: render,
        elem: elem,
        inc: function () {
            amount++;
            render();
        },
        dec: function () {
            amount--;
            render();
        }
    };
};
