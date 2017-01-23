var write = require( '../promise-file-write' );
var cPath1 = './test/test1.txt';
var cPath2 = './test/test2.txt';
var cPath3 = './test/test3.txt';
var cPath4 = './test/test4.txt';

write( cPath1, 'test1' )
.then( function( cPath ){
    console.log( '*** Test1' );
    console.log( cPath );
    console.log( ' ' );
}).done();

write( [ cPath2, cPath3, cPath4 ], 'test 2, 3, 4' )
.then( function( aPaths ){
    console.log( '*** Test2' );
    console.log( aPaths );
    console.log( ' ' );
}).done();