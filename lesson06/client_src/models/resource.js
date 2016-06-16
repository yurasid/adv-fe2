module.exports = Model.createModel( {
<<<<<<< HEAD
  init: function( options ) {
=======
  init: function ( options ) {
>>>>>>> master
    options = options || {};
    $.extend( this.attributes, {
      count: options.count || 0,
      name: options.name
    } );
  },
<<<<<<< HEAD
  inc: function( count ) {
=======
  inc: function ( count ) {
>>>>>>> master
    this.set(
            'count',
            this.get( 'count' ) + ( count || 1 )
        );
  },
<<<<<<< HEAD
  dec: function( count ) {
=======
  dec: function ( count ) {
>>>>>>> master
    this.set(
            'count',
            this.get( 'count' ) - ( count || 1 )
        );
  },
<<<<<<< HEAD
  getCount: function() {
    return this.get( 'count' );
  },
  getName: function() {
    return this.get( 'name' );
  },
  setCount: function( count ) {
    this.set( 'count', count );
  }
} )
=======
  getCount: function () {
    return this.get( 'count' );
  },
  getName: function () {
    return this.get( 'name' );
  },
  setCount: function ( count ) {
    this.set( 'count', count );
  }
} );
>>>>>>> master
