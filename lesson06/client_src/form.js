var Game = require( 'containers/game/game.js' );

var g = new Game();

console.log( g.render().elem ); 
$( '.content' ).html( g.render().elem );
