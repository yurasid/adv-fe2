module.exports = function Resource( options ) {
  var elem = $( '<div></div>' );

  var resource = options.resource;

<<<<<<< HEAD
    console.log('in ctR options = ', options);

    // subscribe on resource
    resource.subscribe(function () {
        render();
    });
=======
  resource.subscribe( function () {
    render();
  } );
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95

  function render() {
    elem.html( App.templates[ 'resource' ]( {} ) );
    elem.find( '.resource__name' ).html( resource.getName() );
    elem.find( '.resource__val' ).html( resource.getCount() );

    return this;
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
