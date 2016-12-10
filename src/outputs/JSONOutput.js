class JSONOutput {
  constructor( res ) {
    this.res = res;
  }

  display( data ) {
    this.res.set( {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': 'Thu, 18 Nov 1971 01:00:00 GMT'
    } );
    if ( data[Symbol.iterator] ) {
      let d;
      const commandList = [];
      const iterator    = data[Symbol.iterator]();
      while ( d = iterator.next() ) {
        if ( d.done ) {
          break;
        }
        commandList.push( d.value )
      }

      this.res.json( commandList );
    } else {
      this.res.json( data );
    }

  }

  static describe() {
    return 'json'
  }
}

module.exports = JSONOutput;