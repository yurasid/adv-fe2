// espects model wiht getCount method
module.exports = function Bar(options) {

    console.log('in ctB options = ', options);

    var elem = $('<div></div>');

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
