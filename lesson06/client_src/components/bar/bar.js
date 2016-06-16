// espects model wiht getCount method
<<<<<<< HEAD
module.exports = function Bar( options ) {
=======
<<<<<<< HEAD
module.exports = function Bar(options) {
>>>>>>> master

  console.log( 'in ctB options = ', options );

<<<<<<< HEAD
  var elem = $( '<div></div>' );
=======
    var elem = $('<div></div>');
=======
module.exports = function Bar( options ) {
  var elem = $( '<div></div>' );
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
>>>>>>> master

  var model = options.model;
  var progress = model.getCount();

<<<<<<< HEAD
  model.subscribe( function() {
=======
  model.subscribe( function () {
>>>>>>> master
    progress = model.getCount();
    render();
  } );

  function render() {
    elem.html( App.templates[ 'bar' ]( {
      progress: Array( progress )
    } ) );
    return this;
  }

  return {
    render: render,
<<<<<<< HEAD
    getCount: function() {
      return progress;
    },
    elem: elem
  }
=======
    getCount: function () {
      return progress;
    },
    elem: elem
  };
>>>>>>> master
};
