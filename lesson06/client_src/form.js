var Game = require( 'containers/game/game.js' );
<<<<<<< HEAD

var g = new Game();

console.log( g.render().elem ); 
$( '.content' ).html( g.render().elem );
=======

$( '.content' ).html( new Game().render().elem );

>>>>>>> master
