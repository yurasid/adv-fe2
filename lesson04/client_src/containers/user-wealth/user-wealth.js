var Resource = require('components/resource/resource.js');

module.exports = function UserWealth() {

    var elem = $('<div></div>');

    var resources = [
        { name: 'gold', amount: 20 },
        { name: 'copper', amount: 30 },
        { name: 'hugs', amount: 5 }
    ].map( function ( e ) {
        return new Resource( e );
    } );

    function render() {
        elem.html(App.templates['user-wealth']({}));
        resources.forEach( function ( e ) {
            elem.append(e.render().elem);
        } );
        return this;
    }

    return {
        render: render,
        elem: elem
    };
};
