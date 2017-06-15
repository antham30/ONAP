/**
 * This is common Controller to contains the resusable Validations etc.
 */

angular.module('app').factory('commonService', function () {
	
	var urlenc_iv = "0000";
	var urlenc_salt = "0000";
	var urlenc_keySize = 32;
	var urlenc_iterationCount = 10;
	var urlenc_pPhrase = "url";
	
	return {
		encryptParam: function(value) {
			var aesUtil = new AesUtil(urlenc_keySize, urlenc_iterationCount);
			var encrypt = aesUtil.encrypt(urlenc_salt, urlenc_iv, urlenc_pPhrase, ""+value);
			return encodeURIComponent(encrypt);
		},
		decryptParam: function(value) {
			var aesUtil = new AesUtil(urlenc_keySize, urlenc_iterationCount);
			value = decodeURIComponent(value);
			var decrypt = aesUtil.decrypt(urlenc_salt, urlenc_iv, urlenc_pPhrase, value);
			return decrypt;
		},
		decodeRouteParam: function(value) {
			return encodeURIComponent(encodeURIComponent(value));
		}
	}
	
});