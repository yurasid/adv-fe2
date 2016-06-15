$( function() {

  function setLikes( likes ) {
    fetch( '/json-server/posts/466', {
      method: 'PATCH',
      headers: new Headers( {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      } ),
      body: JSON.stringify( { likeCount: likes } )
    } ).catch( function( e ) {
      console.log( 'Fuck! ...', e );
    } );
  }

  setLikes( 8 );

    // get sum of all likes
  function sumOfLikes() {
    return fetch( '/json-server/posts', {
      method: 'GET'
    } ).then( function( r ) {
      return r.json();
    } ).then( function( j ) {
      return j.reduce( function( l, o ) {
        if ( !o.likeCount ) return l;
        return l += +( o.likeCount );
      }, 0 );
    } ).catch( function( e ) {
      console.log( 'Oh crap ...', e );
    } );
  }

  sumOfLikes().then( function( res ) {
    $( '.container__likes' ).html( 'count of likes - ' + res );
  } ).catch( function( e ) {
    console.log( 'Error in sumOfLikes call', e );
  } );

    //---------------------------------------------------------------------------

  /**
   * Return Promise with array of { userId: comment_text } objects
   */
  function getCommentsObject( postId ) {
    return fetch( '/json-server/posts/' + postId )
      .then( function( r ) {
        return r.json();
      } )
      .then( function( j ) {
        return j.comments.reduce( function( res, comment ) {
          res[ comment.user ] = comment.text;
          return res;
        }, {} );
      } )
      .catch( function( e ) {
        console.log( 'Error on getPosts()' + e );
      } );
  }

  /**
   * Return Promise with { id: userId, name: userName } object
   */
  function getUserObject( userId ) {
    return fetch( '/json-server/users/' + userId )
      .then( function( r ) {
        return r.json();
      } )
      .then( function( j ) {
        return { id: j.id, name: j.name };
      } ).catch( function( e ) {
        console.log( 'Error in getUser()', e );
      } );
  }

  var namesAndComments = getCommentsObject( 466 )
    .then( function( comments ) {
      return Promise.all( Object.keys( comments ).map( function( id ) {
        return getUserObject( id );
      } ) )
      .then( function( users ) {
        return users.map( function( u ) {
          return {
            name: u.name,
            text: comments[ u.id ]
          };
        } );
      } ).catch( console.log );
    } ).catch( console.log );

  namesAndComments.then( function( e ) {
    e.forEach( function( i ) {
      console.log( i );
      $( '.container__other' )
        .append( i.name.toUpperCase() + ': ' +
          i.text.toLowerCase() + '; ' );
    } );
  } )

  // function pairsUserPost ( post ) {
  //   return fetch( posts_url + ''+post )
  //     .then( r => r.json() )
  //     .then( j => {
  //       var texts = j.comments.map( e => {
  //         return { text: e.text, id: e.user };
  //       } );
  //         Promise.all( texts.map( e => {
  //           return fetch( users_url + e.id )
  //             .then( r => r.json() )
  //             .then( j => {
  //               return { name: j.name, id: j.id };
  //             } )
  //             .catch( console.log );
  //           } ) ).then( users => {
  //           return users.map( ( u ) => {
  //                 return texts.reduce( ( r, t ) => {
  //                       if ( t.id === u.id ) {
  //                           r.name = u.name;
  //                           r.text = t.text;
  //                       }
  //                       return r;
  //                   }, {} );
  //               } );
  //           } );
  //       } );
  // }
  //
  //
  // pairsUserPost( 466 ).then( e => {
  //   e.foreach( i => {
  //     $( '.container__other' )
  //       .append( i.name.touppercase() + ': ' +
  //         i.text.tolowercase() + '; ' );
  //   } );
  // } ).catch( console.log );

    /**
    fetch('/json-server/posts/466')
        .then( r => r.json() )
        .then( j => {
            // this is object with id and text of comment
            var commentTextes = j.comments.map( c => {
                return { text: c.text, id: c.user };
            } );

            // make array with users url's
            var userUrls = commentTextes.map( c => '/json-server/users/' + c.id );

            // get Users by Ids
            Promise.all( userUrls.map( u => fetch(u) ) )
                .then( arr => arr.map( r => r.json() ) )
                .then( arr => {
                    return arr.map( p => {
                        p.then( u => {
                            commentTextes.forEach( c => {
                                if (c.id === u.id) {
                                    $('.container__other')
                                        .append(u.name.toUpperCase() +
                                                ': ' +
                                                c.text + ' ; ');
                                }
                            } );
                        } );
                    } );
                } );
        } )
        .catch( e => console.log( "ERRERERRROR " + e ) );
        */
} );
