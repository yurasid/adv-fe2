var Resource = require( 'components/resource/resource.js' );

module.exports = function UserWealth( options ) {
  var elem = $( '<div></div>' );

  var resources = options.resources;

    console.log('in UW options = ', options);

    // create resouce components 
    // {resouce: resouce}
  ctResources = resources.map( function ( r ) {
    return new Resource( { resource: r } );
  } );

    var ctResources = resources.map(function (r) {
        return new Resource({ resource: r });
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
        elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
            return r.render().elem;
        }));
        return this;
    }

    return {
        render: render,
        elem: elem
    };
};
