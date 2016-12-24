# browserprint-256
==========================Browserprint-256 v1.1============================

To build an anonymous "identity", the browser is queried
for a list of its plugins, the screen size and several other things, then
hashes them.  These bits of information produce an unique "fingerprint";
that can be used to recognize, identify, or even authenticate a device
without intrusive software, or cookies.

this library makes use of Chris Veness' sha256 javascript crypto library 
available at https://github.com/chrisveness/crypto

Copyright (c) 2016 Randy Delvaux under the MIT license.
https://github.com/rcurtiss/browserprint-256

Tools can have many uses. Please build responsibly.
