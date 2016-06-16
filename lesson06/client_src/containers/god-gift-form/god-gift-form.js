<<<<<<< HEAD
var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {

    console.log('in GGF option = ', options);

    var elem = $('<div></div>');

    var BASE_HATE = 50; // can be propogated from game
    var resources = options.resources;

    var hate = new Hate(BASE_HATE);

    var godHateIndicator = new GodHateIndicator({
        hate: hate 
    });

    // use it as map of gift impact 
    var godPrefer = {
        'gold': 6,
        'copper': 2
    };

    // create tuner resources (resource model) tuneResource
    // 
    var tuneResourceGold = new Resource({ name: 'gold', count: godPrefer.gold });
    var tuneResourceCopper = new Resource({ name: 'copper', count: godPrefer.copper });

    var tunnerResources = [ tuneResourceGold, tuneResourceCopper ];

    // create gift components(gift-tuner) with tunerResouce 
    //
    var tunnerResourceGold = new GiftTunner({ name: 'gold', resource: tuneResourceGold });
    var tunnerResourceCopper = new GiftTunner({ name: 'copper', resource: tuneResourceCopper });
    var tunners = [ tunnerResourceGold, tunnerResourceCopper ];

    // subscribe on tuner resouces 
    // onChange -> set changes in reseouce
    //
    
    // subscribe on tunner resoures
    // onChange -> recalculate and set hate count
    //

    tuneResourceGold.subscribe(function () {
        // 
        // Calculate Hate
        //
        
    });

    tuneResourceCopper.subscribe(function () {
        var deltaCopper = tuneResourceCopper.getCount() - godPrefer.copper;
        var deltaHate = deltaCopper * 1;
        var currentHate = hate.getCount();
        hate.setCount(currentHate- deltaHate);
    });



    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__tunners').html(tunners.map(function(tunner) {
            return tunner.render().elem;
        }));
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log(
                'send gift [' + 
                tunnerResources.map(function(resource) {
                    return resource.getName() + ':' + resource.getCount()
                }) +
                ']'
            );
        });
    }

    return {
        render: render,
        elem: elem
    }
=======
const GiftTunner = require( 'containers/gift-tunner/gift-tunner.js' );
const GodHateIndicator = require( 'containers/god-hate-indicator/god-hate-indicator.js' );
const Resource = require( 'models/resource.js' );
const Hate = require( 'models/hate.js' );

module.exports = function GodGiftForm( options ) {
  const elem = $( '<div></div>' );

  // can be propogated from game
  const BASE_HATE = 50;
  const resources = options.resources;

  const hate = new Hate( BASE_HATE );

  const godHateIndicator = new GodHateIndicator( {
    hate: hate
  } );

  // use it as map of gift impact
  const godPrefer = {
    gold: 6,
    copper: 2
  };

  // create tuner resources (resource model) tuneResource
  //
  const tuneResourceGold = new Resource( {
    name: 'gold',
    count: godPrefer.gold
  } );
  const tuneResourceCopper = new Resource( {
    name: 'copper',
    count: godPrefer.copper
  } );
  const tunnerResources = [ tuneResourceGold, tuneResourceCopper ];

  // create gift components(gift-tuner) with tunerResouce
  //
  const tunnerResourceGold = new GiftTunner( {
    resource: tuneResourceGold
  } );
  const tunnerResourceCopper = new GiftTunner( {
    resource: tuneResourceCopper
  } );
  const tunners = [ tunnerResourceGold, tunnerResourceCopper ];

  // subscribe on tuner resouces
  // onChange -> set changes in reseouce
  //
  Model.subscribeAll( tunnerResources, function () {
    const cpResources = resources.reduce( ( tR, r ) => {
      tR[ r.getName() ] = r;
      return tR;
    }, {} );

    const tunerResources = tunnerResources.reduce( ( tR, r ) => {
      tR[ r.getName() ] = r;
      return tR;
    }, {} );

    const goldGift = tunerResources.gold.getCount();
    const copperGift = tunerResources.copper.getCount();
    const deltaGold = goldGift - godPrefer.gold;
    const deltaCopper = copperGift - godPrefer.copper;

    cpResources.gold.setCount( cpResources.gold.getCount() - deltaGold );
    cpResources.copper.setCount( cpResources.copper.getCount() - deltaCopper );

  } );

  // subscribe on tunner resoures
  // onChange -> recalculate and set hate count
  //
  
  Model.subscribeAll( tunnerResources, function () {
    const tunerResources = tunnerResources.reduce( ( tR, r ) => {
      tR[ r.getName() ] = r;
      return tR;
    }, {} );

    const goldGift = tunerResources.gold.getCount();
    const copperGift = tunerResources.copper.getCount();
    const deltaGold = goldGift - godPrefer.gold;
    const deltaCopper = copperGift - godPrefer.copper;

    hate.setCount( hate.getCount() - deltaGold * 4 - deltaCopper );

    godPrefer.gold = goldGift;
    godPrefer.copper = copperGift;
  } );

  function render() {
    elem.html( App.templates[ 'god-gift-form' ]( {} ) );

    elem.find( '.god-gift-form__tunners' ).html( tunners.map( function ( tunner ) {
      return tunner.render().elem;
    } ) );
    elem.find( '.god-gift-form__hate' ).html( godHateIndicator.render().elem );

    subscribeHandlers( elem );

    return this;
  }

  function subscribeHandlers( elem ) {
    elem.find( '.god-gift-form__send' ).click( function () {
      console.log(
        'send gift [' +
          tunnerResources.map( function ( resource ) {
            return resource.getName() + ':' + resource.getCount();
          } ) +
        ']'
      );
    } );
  }

  return {
    render: render,
    elem: elem
  };
>>>>>>> 434869a3a12768e7f63befcc375cd48d24191f95
};
