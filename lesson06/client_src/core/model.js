<<<<<<< HEAD
( function( global ) {
=======
( function ( global ) {
>>>>>>> master
  function Model() {
    this.attributes = {};
    this.subscribers = [];
    this.init.apply( this, arguments );
  }

<<<<<<< HEAD
  Model.prototype = {
    subscribe: function( cb ) {
      this.subscribers.push( cb );
    },
    notify: function( cb ) {
      this.subscribers.forEach( function( cb ) {
        cb( this );
      }.bind( this ) );
    },
    get: function( key ) {
      return this.attributes[ key ];
    },
    set: function( key, value ) {
      this.attributes[ key ] = value;
      this.notify();
    },
    init: function() {
      console.log( 'init' );
    }
  };
=======
<<<<<<< HEAD
    Model.prototype = {
        subscribe: function(cb) {
            this.subscribers.push(cb); 
        },
        notify: function(cb) {
            this.subscribers.forEach(function(cb) {
                cb(this);
            }.bind(this)); 
        },
        get: function(key) {
            return this.attributes[key];
        },
        set: function(key, value) {
            this.attributes[key] = value;
            this.notify();
        },
        init: function() {
            console.log('init');
        }
    };
>>>>>>> master

  global.Model = Model;
  Model.subscribeAll = function( models, cb ) {
    models.forEach( function( model ) {
      model.subscribe( cb );
    } );
  };
  Model.createModel = function( custom ) {
    var child = function() {
      return Model.apply( this, arguments );
    };

<<<<<<< HEAD
=======
       child.prototype = $.extend({}, Model.prototype, custom);
       return child;
=======
  Model.prototype = {
    subscribe: function ( cb ) {
      this.subscribers.push( cb );
    },
    notify: function ( cb ) {
      this.subscribers.forEach( function ( cb ) {
        cb( this );
      }.bind( this ) );
    },
    get: function ( key ) {
      return this.attributes[ key ];
    },
    set: function ( key, value ) {
      this.attributes[ key ] = value;
      this.notify();
    },
    init: function () {
      console.log( 'init' );
    }
  };
  global.Model = Model;
  Model.subscribeAll = function ( models, cb ) {
    models.forEach( function ( model ) {
      model.subscribe( cb );
    } );
  };
  Model.createModel = function ( custom ) {
    var child = function () {
      return Model.apply( this, arguments );
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
    };
>>>>>>> master
    child.prototype = $.extend( {}, Model.prototype, custom );
    return child;
  };

} )( window );
