// expects model whit inc, dec methods
//
module.exports = function TuneControls( options ) {
  var elem = $( '<div></div>' );

  var model = options.model;

  function render() {
    elem.html( App.templates[ 'tune-controls' ]( {} ) );
    subscribeHandlers( elem );

    return this;
  }

  function subscribeHandlers() {
<<<<<<< HEAD
    elem.find( '.tune-controls__inc' ).click( function() {
      model.inc();
    } );
    elem.find( '.tune-controls__dec' ).click( function() {
=======
    elem.find( '.tune-controls__inc' ).click( function () {
      model.inc();
    } );
    elem.find( '.tune-controls__dec' ).click( function () {
>>>>>>> master
      model.dec();
    } );
  }

  return {
    render: render,
    elem: elem
  };
};
