$(function() {

    // set likes to 8
    fetch('/json-server/posts/466', {
        method: 'PATCH',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify({ likeCount: 8 })
    }).catch(function (e) {
        console.log( 'Fuck! ...', e);
    });

    // get sum of all likes
    fetch('/json-server/posts', {
        method: 'GET'
    }).then(function (r) {
        return r.json();
    }).then(function (j) {
        var numOfLikes =  j.reduce(function (l, o) {
            if (!o.likeCount) return l;
            return l += +(o.likeCount);
        }, 0);
        $('.container__likes').html('count of likes - ' + numOfLikes);
    }).catch(function (e) {
        console.log('Oh crap ...', e);
    });

    //---------------------------------------------------------------------------


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

});
