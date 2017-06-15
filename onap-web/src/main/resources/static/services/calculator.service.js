var encryptService = angular.module('encryptService', [])
.service('Calculator', function () {
	var iv = "00000000000000000000000000000000";
		var salt = "00000000000000000000000000000000";
		var keySize = 128;
		var iterationCount = 10000;
		var pPhrase = "aesalgoisbestbes";
		var aesUtil = new AesUtil(keySize, iterationCount);
    this.squareDec = function (a) { 
	
	
		var ab = aesUtil.decrypt(salt, iv, pPhrase, a);
		
	return ab;
	};
	this.squareEnc = function (ab) {

		var abc = aesUtil.encrypt(salt, iv, pPhrase, ab);
		
	return abc;
	}

});