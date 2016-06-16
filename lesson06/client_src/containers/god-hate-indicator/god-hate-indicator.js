var Bar = require( 'components/bar/bar.js' );

module.exports = function GodLoveInicator( options ) {
  var elem = $( '<div></div>' );

  var bar = new Bar( {
    model: options.hate
  } );

<<<<<<< HEAD
  console.log( 'in GHI options = ', options );

  function render() {
    elem.html( App.templates[ 'god-hate-indicator' ]( {} ) );
=======
<<<<<<< HEAD
    console.log('in GHI options = ', options);

    function render() {
        elem.html(App.templates['god-hate-indicator']({}));
=======
  function render() {
    elem.html( App.templates[ 'god-hate-indicator' ]( {} ) );
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
>>>>>>> master

    elem.find( '.god-hate-indicator__bar' ).html( bar.render().elem );
    return this;
  }

  return {
    render: render,
    elem: elem,
<<<<<<< HEAD
    inc: function( count ) {
      bar.inc( count );
    },
    dec: function( count ) {
      bar.dec( count );
    }
  }
=======
    inc: function ( count ) {
      bar.inc( count );
    },
    dec: function ( count ) {
      bar.dec( count );
    }
  };
>>>>>>> master
};
