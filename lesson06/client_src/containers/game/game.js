var GodGiftForm = require( 'containers/god-gift-form/god-gift-form.js' );
var UserWealth = require( 'containers/user-wealth/user-wealth.js' );
var Resource = require( 'models/resource.js' );

module.exports = function Game() {
  var elem = $( '<div></div>' );

  // create resources
  // e.g {count: 10, name: gold}
  var gold = new Resource( {
    count: 10,
    name: 'gold'
  } );
  var copper = new Resource( {
    count: 30,
    name: 'copper'
  } );

  var resources = [ gold, copper ];

  // create GodGiftForm
  // {resources: resources}

  var giftForm = new GodGiftForm( {
    resources: resources
  } );

  // create UserWealth
  // {resources: resources}
  var userWealth = new UserWealth( {
    resources: resources
  } );

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
