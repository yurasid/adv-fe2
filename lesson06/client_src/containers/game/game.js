var GodGiftForm = require( 'containers/god-gift-form/god-gift-form.js' );
var UserWealth = require( 'containers/user-wealth/user-wealth.js' );
var Resource = require( 'models/resource.js' );

var resourcePromise = fetch( '/json-server/wealth' )
  .then( function( r ) {
    return r.json();
  } ).catch( function( e ) {
    console.log( "Error while load resouces", e );
  } );

module.exports = function Game() {
  var elem = $( '<div></div>' );

  


    // create resources
    // e.g {count: 10, name: gold}
  var gold = new Resource( { name: 'gold', count: 10 } );
  var copper = new Resource( { name: 'copper', count: 30 } );

  var resources = [ gold, copper ];

    // create GodGiftForm
    // {resources: resources}
  var giftForm = new GodGiftForm( { resources: resources } );

    // create UserWealth
    // {resources: resources}
  var userWealth = new UserWealth( { resources: resources } );

  function render() {
    elem.html( App.templates[ 'game' ]( {} ) );
    elem.find( '.game__god-gift-form' ).html( giftForm.render().elem );
    elem.find( '.game__wealth' ).html( userWealth.render().elem );
    return this;
  }

  return {
    render: render,
    elem: elem
  };
};
