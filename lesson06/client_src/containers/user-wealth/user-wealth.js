var Resource = require( 'components/resource/resource.js' );

module.exports = function UserWealth( options ) {
  var elem = $( '<div></div>' );

  var resources = options.resources;

<<<<<<< HEAD
  console.log( 'in UW options = ', options );

    // create resouce components
=======
<<<<<<< HEAD
    console.log('in UW options = ', options);

    // create resouce components 
=======
    // create resouce components
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
>>>>>>> master
    // {resouce: resouce}
  ctResources = resources.map( function ( r ) {
    return new Resource( { resource: r } );
  } );

<<<<<<< HEAD
  var ctResources = resources.map( function( r ) {
    return new Resource( { resource: r } );
  } );
=======
<<<<<<< HEAD
    var ctResources = resources.map(function (r) {
        return new Resource({ resource: r });
    });
>>>>>>> master

  function render() {
    elem.html( App.templates[ 'user-wealth' ]( {} ) );
    elem.find( '.user-wealth__resources' ).html( ctResources.map( function( r ) {
      return r.render().elem;
    } ) );
    return this;
  }

<<<<<<< HEAD
=======
    return {
        render: render,
        elem: elem
    };
=======
  function render() {
    elem.html( App.templates[ 'user-wealth' ]( {} ) );
    elem.find( '.user-wealth__resources' ).html( ctResources.map( function ( r ) {
      return r.render().elem;
    } ) );
    return this;
  }

>>>>>>> master
  return {
    render: render,
    elem: elem
  };
<<<<<<< HEAD
=======
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
>>>>>>> master
};
