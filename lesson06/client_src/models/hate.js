module.exports = Model.createModel( {
<<<<<<< HEAD
  init: function( count ) {
    this.attributes.count = count || 0;
  },
  inc: function( count ) {
=======
  init: function ( count ) {
    this.attributes.count = count || 0;
  },
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
  setCount: function( count ) {
    this.set( 'count', count );
  }
} )

=======
  getCount: function () {
    return this.get( 'count' );
  },
  setCount: function ( count ) {
    this.set( 'count', count );
  }
} );
>>>>>>> master
