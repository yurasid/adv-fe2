// espects model wiht getCount method
<<<<<<< HEAD
module.exports = function Bar(options) {

    console.log('in ctB options = ', options);

    var elem = $('<div></div>');
=======
module.exports = function Bar( options ) {
  var elem = $( '<div></div>' );
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95

  var model = options.model;
  var progress = model.getCount();

  model.subscribe( function () {
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
    getCount: function () {
      return progress;
    },
    elem: elem
  };
};
