var multipart = {
		
		uploadFiles: function (successCallback, errorCallback, serviceUrl, arrayRes) {
			cordova.exec(successCallback,
					errorCallback, 
					"Multipart",  // java class, service
					"uploadFiles", // action
					[{                  // and this array of custom arguments to create our entry
 		                "serviceUrl":serviceUrl,
		                "resPaths": [arrayRes]
 		            }]
			);
		}
};

