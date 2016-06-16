var Bar = require( 'components/bar/bar.js' );
var TuneControls = require( 'components/tune-controls/tune-controls.js' );

module.exports = function GiftTunner( options ) {
  var elem = $( '<div></div>' );

<<<<<<< HEAD
  console.log( 'in GT options = ', options );

  var resource = options.resource;
=======
<<<<<<< HEAD
    console.log('in GT options = ', options);

    var resource = options.resource;
=======
  var resource = options.resource;
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
>>>>>>> master

  var bar = new Bar( {
    model: resource
  } );
  var controls = new TuneControls( {
    model: resource
  } );

  function render() {
    elem.html( App.templates[ 'gift-tunner' ]( {} ) );

    elem.find( '.gift-tunner__name' ).html( options.name );
    elem.find( '.gift-tunner__bar' ).html( bar.render().elem );
    elem.find( '.gift-tunner__controls' ).html( controls.render().elem );

    return this;
  }

  return {
    render: render,
<<<<<<< HEAD
    getCount: function() {
      return bar.getCount();
    },
    elem: elem
  }
=======
    getCount: function () {
      return bar.getCount();
    },
    elem: elem
  };
>>>>>>> master
};
