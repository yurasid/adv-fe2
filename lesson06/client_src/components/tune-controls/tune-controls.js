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
    elem.find( '.tune-controls__inc' ).click( function () {
      model.inc();
    } );
    elem.find( '.tune-controls__dec' ).click( function () {
      model.dec();
    } );
  }

<<<<<<< HEAD
    return {
        render: render,
        elem: elem
    };
=======
  return {
    render: render,
    elem: elem
  };
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
};
