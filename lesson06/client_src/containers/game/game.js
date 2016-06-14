var GodGiftForm = require( 'containers/god-gift-form/god-gift-form.js' ),
  UserWealth = require( 'containers/user-wealth/user-wealth.js' ),
  Resource = require( 'models/resource.js' );

module.exports = function Game() {
  var elem = $( '<div></div>' ),
    resourcePromise = fetch( '/json-server/wealth' )
      .then( r => {
        return r.json();
      } )
      .then( j => {

        var resources = j.resources.map( r => new Resource( r ) ),
          giftForm = new GodGiftForm({ resources: resources }),
          userWealth = new UserWealth({ resources: resources });
        // create resources
        // e.g {count: 10, name: gold}

        // create GodGiftForm
        // {resources: resources}

        // create UserWealth
        // {resources: resources}

        return { 'ggf': giftForm, 'uw': userWealth };
      } );

  function render() {
    elem.html( App.templates[ 'game' ]( {} ) );
    elem.find( '.game__god-gift-form' ).html( resourcePromise.then( function( r ) {
      r.ggf.render().elem;
    } ) );
    elem.find( '.game__wealth' ).html( resourcePromise.then( function( r ) {
      r.uw.render().elem;
    } ) );
    return this;
  }

  return {
    render: render,
    elem: elem
  };
};
