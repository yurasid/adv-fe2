// get DOM elements
/* global $ */
/* global Data */
/* global Handlebars */
var $rawJsonDomContainer = $('.raw-json'),
  $tableJsonContainer = $('.table-json'),
  rawJsonTemplate = Handlebars.compile( $('#raw-json-template').html() ),
  tableJsonTemplate = Handlebars.compile( $('#table-json-template').html() ),
  posts = Data.getPosts();

  // json helper
  Handlebars.registerHelper('json', function ( posts ) {
    return new Handlebars.SafeString( JSON.stringify( posts, null, '\t' ) );
  });

  // table block helper
  Handlebars.registerHelper('table', function (ctx, options) {
    // return '<div class=description-container>'
    //     + ctx.map( function(e, i) {
    //         var style = 'style="padding: 20px";';
    //         if ( i%2 ) {
    //             style += ';background: #ccc';
    //         }
    //         style += ':"';
    //         return '<div class="description"' + style + '>' + options.fn( ctx[i] ) + '</div>';
    //     } ).join('\n') + '</div>';
    return new Handlebars.SafeString( ctx.reduce( function( resultString, element, i ) {
      return resultString + '<div class="description">' + options.fn( ctx[i] ) + '</div>';
    }, '<div class="description-container">') + '</div>');
  } );

  // add changes to the DOM
  $rawJsonDomContainer.html( rawJsonTemplate( { 'posts': posts } ) );
  $tableJsonContainer.html( tableJsonTemplate({ 'posts': posts }) );
