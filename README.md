# promise-file-write
Asynchronously write files with promise flow control.

## Installation

Install by npm.

```shell
npm install git+https://github.com/lucentminds/promise-file-write.git
```

### Useage:

```js
var write = require( 'promise-file-write' );

write( '/path/to/file.txt', 'Foo bar baz', { encoding: 'utf-8' } )
.then(function( cPath ){

    console.log( cPath );

});
```

## Examples

Write one file.

```js
write( '/path/to/file.txt', 'Foo bar baz' )
.then(function( cPath ){

    console.log( 'Path written:', cPath );

});
```

Write "Foo bar baz" to multiple files.

```js
write( ['/path/to/file1.txt', '/path/to/file2.txt'], 'Foo bar baz' )
.then(function( aPaths ){

    console.log( aPaths );

});
```