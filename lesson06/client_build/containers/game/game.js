var GodGiftForm = require( 'containers/god-gift-form/god-gift-form.js' ),
  UserWealth = require( 'containers/user-wealth/user-wealth.js' ),
  Resource = require( 'models/resource.js' );

module.exports = function Game() {
  var elem = $( '<div></div>' ),
    resourcePromise = fetch( '/json-server/wealth' )
      .then( r => r.json() )
      .then( j => j.resources.map( r => new Resource( r ) ) )
      .catch( e => console.log( 'Error in Game constructor ', e ) );

  function render() {
    elem.html( App.templates[ 'game' ]( {} ) );
    resourcePromise.then( r => {

      elem.find( '.game__god-gift-form' )
        .html( new GodGiftForm( { resources: r } ).render().elem );
      elem.find( '.game__wealth' )
        .html( new UserWealth( { resources: r } ).render().elem );
    } )
    .catch( e => console.log( 'Error in render() function ', e ) );
    return this;
  }

  return {
    render: render,
    elem: elem
  };
};
