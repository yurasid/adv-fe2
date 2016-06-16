const
  express = require( 'express' ),
  bodyParser = require( 'body-parser' ),
  path = require( 'path' ),
  fs = require( 'fs' ),
  rmdir = require( 'rmdir' ),
  // promisify = require( 'promisify-node' ),
  // fsProm = promisify( 'fs' ),
  url = require( 'url' ),
  apiVersion = require( './package' ).version,
  app = express();

app.set( 'port', 5000 );

// configure Express to work with post requests and get access
// to response body
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

app.listen( app.get( 'port' ), () => {
  console.log( 'Node app is running on http://localhost:' + app.get( 'port' ) );
} );

app.get( '/', ( req, res ) => {
  const urlParsed = url.parse( req.url, true );
  console.log( urlParsed );

  res.send( '<html><body><h1>My web app http API! Version ' + apiVersion + ' </h1></body></html>' );
} );

// ;app.all( '/test/', ( req, res ) => {
//   res.send( '<html><body><h1>Hello test</h1></body></html>' );
// } )

// API
app.get( '/api/' + apiVersion + '/*', ( req, res ) => {
  answer( req, res );
} );

app.delete( '/api/' + apiVersion + '/*', ( req, res ) => {
  deleteResponse( req )
    .then( st => {
      const responseCode = st.status === 'success' ? 200 : 404;
      sendMsg( st, responseCode, res );
    } )
    .catch( err => console.log( err ) );
} );

app.post( '/api/' + apiVersion + '/*', ( req, res ) => {
  postResponse( req )
    .then( ok => sendMsg( ok, 200, res ) )
    .catch( err => sendMsg( err, 409, res ) );
} );

app.patch( '/api/' + apiVersion + '/*', ( req, res ) => {
  patchResponse( req )
  .then( ok => sendMsg( ok, 200, res ) )
  .catch( err => sendMsg( err, 404, res ) );
} );

/**
 * Return status message to PATCH request
 *
 * If entity successfully modified  -> 200 OK { status: 'success' }
 * If same entity found         -> 404 Not Found { status: 'fail' }
 *
 * @name postResponse
 * @param {Object} req - Express Response Object
 * @return {Promise}
 */
function patchResponse( req ) {
  return new Promise( ( resolve, reject ) => {
    const
      absDirPath = path.join( __dirname, getPathName( req ) ),
      bodyJson = JSON.stringify( req.body, null, 4 );

    fs.stat( absDirPath, ( err ) => {
      if ( err ) {
        // if directory not exist -> rejected
        console.log('fail:exist');
        console.log( 'error', err );
        reject({ status: 'fail' });
      } else {
        fs.writeFile( absDirPath + '/get.json', bodyJson, 'utf8', ( err ) => {
          if ( err ) {
            console.log( 'Can\'t write file', err );
            reject({ status: 'fail' });
          } else {
            console.log('ok:patched');
            resolve({ status: 'success'});
          }
        } );
      }
    } );
  } );
}

/**
 * Return status message to POST request
 *
 * If entity successfuly creted  -> 200 OK { status: 'success' }
 * If same entity found         -> 409 Conflict { status: 'fail' }
 *
 * @name postResponse
 * @param {Object} req - Express Response Object
 * @return {Promise}
 */
function postResponse( req ) {
  return new Promise( ( resolve, reject ) => {
    const absDirPath = path.join( __dirname, getPathName( req ) ),
      bodyJson = JSON.stringify( req.body, null, 4 );

    fs.stat( absDirPath, err => {
      if ( err ) {
        fs.mkdir( absDirPath, err => {
          if ( err ) {
            console.log( 'Can\'t create directory', err );
            reject({ status: 'fail' });
          } else {
            fs.writeFile( absDirPath + '/get.json', bodyJson, 'utf8', ( err ) => {
              if ( err ) {
                console.log( 'Can\'t write file', err );
                reject({ status: 'fail' });
              } else {
                console.log('ok:created');
                resolve({ status: 'success' });
              }
            } );
          }
        } );
      } else {
        console.log('fail:exist');
        reject({ status: 'fail' });
      }
    } );
  } );
  // check if directory exist
}

/**
 * Send response.
 *
 * @name sendMsg
 * @param {Object} messageJson
 * @param {Number} statusCode
 * @param {Object} res - Response Express object
 */
function sendMsg( messageJson, statusCode, res ) {
  res.status( statusCode ).json( messageJson ).end();
}

/**
 * Return promise fulfilled with status message to DELETE request
 * @name deleteResponse
 * @param {Object} req - Request Express object
 * @returns {Promise}
 */
function deleteResponse( req ) {
  const filePath = path.join( __dirname, getPathName( req ), 'get.json' ),
    dirPath = path.join( __dirname, getPathName( req ) );
  // new Promise with status msg
  return new Promise( ( resolve, reject ) => {
    // check if file exist
    fs.stat( filePath, ( err, statObj ) => {
      if ( err ) {
        // no file, so api is not consistent. Must be get.json in the folder
        resolve({ status: 'fail', debugMsg: 'DEBUG: No file found or no get.json in directory' });
        return;
      }
      if ( !statObj.isFile() ) {
        // there is not a file
        reject('Error while reading file. This is not a file dude.\n stat.isFile() === false WTF?');
        return;
      }
      // remove dir recursively ( https://www.npmjs.com/package/rmdir )
      // native implementation sync and async /(-_-)\
      // http://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
      rmdir( dirPath, ( err, msg ) => {
        if ( err ) {
          reject( err );
          return;
        }
        resolve({ status: 'success', debugMsg: msg });
      } );
    } );
  } );
}

function answer( req, res ) {
  getResponse( req ).then( data => {
    if ( data ) {
      res.status(200)
         .json( data )
         .end();
    }
  } ).catch( e => {
    console.error( 'Error in app.get():\n ', e );
    res.status(404)
        .json( [
          {
            'info': {
              'success': false,
              'error': '404'
            }
          } ] ).end();
  } );
}

//
// function getFileName( req ) {
//  return ( req.path + '/' + req.method.toLowerCase() + '.json' )
//  .replace( '/' + apiVersion + '/', '/' );
//  }

/**
 * Get relative path if file system from request
 *
 * @name getPathName
 * @param {Object} req - Request Express object
 * @returns {string} relative path in file system
 */
function getPathName( req ) {
  return req.path.replace( '/' + apiVersion + '/', '/' );
}


function getResponse( req ) {
  return new Promise( ( resolve, reject ) => {
    const dirPath = path.join( __dirname, getPathName( req ) );
    fs.readdir( dirPath, ( err, dirs ) => {
      console.log( dirs );
      if ( err ) {
        reject( err );
      }
      // there is no such path ( no file, no directory )
      if ( !dirs ) {
        reject( 'No files found ' );
        return;
      }
      const promArray = dirs.filter( dir => {
        // Filter only dirs, not files
        const absPath = dirPath + '/' + dir;
        try {
          // TODO: refactor with fs.stat (async version)
          return fs.statSync( absPath ).isDirectory();
        } catch ( error ) {
          console.log( 'Error in fs.stat().isDirectory()', error );
        }
      } ).map( dir => {
        // Make array of Promises that fulfilled with get.json files
        // TODO: remove this two ugly const
        const absPath = dirPath + '/' + dir,
          filePath = absPath + '/' + req.method.toLowerCase() + '.json';
        return new Promise( ( resolveChild, rejectChild ) => {
          fs.readFile( filePath, 'utf8', ( err, data ) => {
            // data is string
            if ( err ) {
              rejectChild( err );
            }
            console.log( JSON.parse( data ) );
            resolveChild( JSON.parse( data ) );
          } );
        } );
      } );
      // if all files read without errors fulfilled parent promise.
      Promise.all( promArray ).then( a => {
        // if there is no subdirs in folder, return method.json file
        if ( !a.length ) {
          const filePath = dirPath + '/' + req.method.toLowerCase() + '.json';
          fs.readFile( filePath, 'utf8', ( err, data ) => {
            if ( err ) {
              console.log( err );
            }
            resolve( JSON.parse( data ) );
          } );
        } else {
          // merge all arrays with fulfilled promises to one
          // end return with resolve() function
          resolve( a.reduce( ( resutArrar, arr ) => {
            return resutArrar.concat( arr );
          }, [] ) );
        }
      } ).catch( e => {
        console.log( 'Error, FUUUU >>>>>> ...' + e );
        reject( e );
      } );
    } );
  } );
}


/*
 function render( req, res ) {
 var resultArr = [ 'foo' ];
 var filePath = path.join( __dirname, getFileName( req ) );
 var dirPath = path.join( __dirname, getPathName( req ) );
 console.log( req.method, filePath );
 // /Users/puzankov/work/fs/node-js-getting-started/api/users/get.json

 fs.readdir( dirPath, function( err, dir ) {
 if ( err ) {
 console.log( 'Error in dierctory read', err );
 }

 dir.forEach( function( elem, idx ) {
 var absPath = dirPath + '/' + elem;
 if ( fs.statSync( absPath ).isDirectory() ) {
 fs.readFile( absPath + '/' + req.method.toLocaleLowerCase() + '.json', 'utf8', function read( err, data ) {
 if ( err ) {
 throw err;
 }

 } );
 }
 } );
 } );



 if ( fs.statSync( filePath ) ) {

 res.setHeader( 'content-type', 'application/json' );

 fs.createReadStream( filePath ).pipe( res );
 } else {
 console.log( 'no such file', filePath );

 res
 .status( 404 )
 .json( [
 {
 'info': {
 'success': false,
 'code': 12345
 }
 }
 ] )
 .end();
 }
 }
 */

//
//app.get('/api/1.0/users', function (req, res) {
//    res.send(users);
//});
//
//app.get('/api/1.0/users/:userId', function (req, res) {
//
//    console.log(req.query);
//
//    res.send(user);
//});



