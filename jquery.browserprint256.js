//==========================Browserprint-256 v1.1============================
// To build an anonymous "identity", the browser is queried
// for a list of its plugins, the screen size and several other things, then
// hashes them.  These bits of information produce an unique "fingerprint";
// that can be used to recognize, identify, or even authenticate a device
// without intrusive software, or cookies.
//
// this library makes use of Chris Veness' sha256 javascript crypto library 
// available at https://github.com/chrisveness/crypto
//
// Copyright (c) 2016 Randy Delvaux under the MIT license.
// https://github.com/rcurtiss/browserprint-256
//
//
// Tools can have many uses. Please build responsibly.

( function($) {

  // Calling `jQuery.fingerprint()` will return an sha256 hash, i.e. said
  // fingerprint.

  $.fingerprint = function() {

    // This function, `_raw()`, uses several browser details which are
    // available to JS here to build a string, namely...
    //
    // * the user agent
    // * screen size
    // * color depth
    // * the timezone offset
    // * sessionStorage support
    // * localStorage support
    // * the list of all installed plugins (we're using their names,
    //    descriptions, mime types and file name extensions here)
    function _raw() {
      // That string is the return value.
      return [
        navigator.userAgent,
        [ screen.height, screen.width, screen.colorDepth ].join("x"),
        ( new Date() ).getTimezoneOffset(),
        !!window.sessionStorage,
        !!window.localStorage,
        $.map( navigator.plugins, function(p) {
          return [
            p.name,
            p.description,
            $.map( p, function(mt) {
              return [ mt.type, mt.suffixes ].join("~");
            }).join(",")
          ].join("::");
        }).join(";")
      ].join("###");
    }

    // `_sha256()` computes an sha256 hash using [sha256.js](https://github.com/chrisveness/crypto).
    function _sha256() {
      if ( typeof window.Sha256.hash === "function" ) {
        // The return value is the hashed fingerprint string.
        return md5( _raw() );
      }
      else {
        // If `window.Sha256.hash()` isn't available, an error is thrown.
        throw "sha256 unavailable, please get it from https://github.com/chrisveness/crypto";
      }
    }

    // Calling `$.fingerprint()` or `jQuery.fingerprint()` will return the hash.
    return _sha256();
  }

})(jQuery);
