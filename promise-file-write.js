/**
 * 01-23-2017
 * Asynchronously write files with promise flow control.
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */

var Q = require( 'q' );
var fs = require( 'fs' );
var resolve = require( 'promise-resolve-path' );

var writeFile = module.exports = function( aDest, cData, oOptions ){ // jshint ignore:line
    var deferred = Q.defer();
    var cDestType = typeof aDest;

    // Determines the options of the files we are writing to.
    oOptions = oOptions || {};

    switch( true ) {
    case ( cDestType === 'string' ):
        aDest = [aDest];
        break;

    case Array.isArray( aDest ):
        break;

    default:
        deferred.reject( 'Invalid source path argument: '.concat( aDest ) );
        return deferred.promise;

    }// /switch()
    
    resolve( aDest )
    .then(function( aPaths ){
        var i, l = aPaths.length;
        var aPromises = [];

        // Loop over each file path and write it's data.
        for( i = 0; i < l; i++ ) {
            aPromises.push( writeOneFile( aPaths[ i ], cData, oOptions ) );
        }// /for()
        
        // Either wait for all paths to be read or reject one.
        return Q.all( aPromises );
    })
    .then(function(){
        if( cDestType === 'string' )  {
            deferred.resolve( aDest[0] );
        }
        else {
            deferred.resolve( aDest );
        }
    })
    .fail(function( err ){
       deferred.reject( err );
    }).done();

    return deferred.promise;
};// /writeFile()


var writeOneFile = function( cPath, cData, oOptions ) {
    var deferred = Q.defer();

    fs.writeFile( cPath, cData, oOptions, function ( err ) {
        if ( err ) {
            return deferred.reject( err );
        }

        
        deferred.resolve();
    });

    return deferred.promise;

};// /writeOneFile()