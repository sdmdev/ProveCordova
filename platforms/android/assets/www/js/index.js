/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	alert("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	alert("onDeviceReady");
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    	alert("multipart ...");
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess, fail);
     
    	//var first = "first parammm";
//    	var wsUrl = "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/SendMultimedia/";
//    
//    	var strArray = ["file:///storage/emulated/0/Download/guida_css.pdf", "file:///storage/emulated/0/Download/JavaScript.pdf"];
    	//var arrayToUpload = ['firsta', 'http:', strArray];
    	
 
  
    }
};


function fsSuccess(fs){
	//var first = "first parammm";
	alert("fsSuccess");
	alert(fs.name + " " + fs.root);
	fs.root.getDirectory("Download", {create: false, exclusive: false}, doDirectoryListing, FileError);
	
	
 
//	var wsUrl = "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/SendMultimedia/";

//	var strArray = ["file:///storage/emulated/0/Download/guida_css.pdf", "file:///storage/emulated/0/Download/JavaScript.pdf"];
//	console.log("fs.root.fullPath: " + fs.root.fullPath);
	
	//multipart.uploadFiles(success, error,  wsUrl, strArray);  	
 
}

//dirEntry needs to be a parameter of the function!
function doDirectoryListing(dirEntry) {
	alert("doDirectoryListing");
	
	alert("dirEntry.name:  " + dirEntry.name);
var directoryReader = dirEntry.createReader();
directoryReader.readEntries(gotFiles, FileError);
}

function gotFiles(entries)
{
 	alert( "FULL PATH : " + entries[0].fullPath);
	 for(var i in entries)
	    {
	      console.log(entries[i].name + entries[i].fullPath);
	    }
	
	var wsUrl = "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/SendMultimedia/";
	var strArray = ["file:///storage/sdcard0/Download/"+entries[0].name, "file:///storage/sdcard0/Download/" + entries[1].name];
	multipart.uploadFiles(success, error,  wsUrl, strArray);  
}

function error() {
	alert("error");
}

function success() {
	alert("successo");
}

function fail(error) {
	console.log("fail fs");
}

function dirSuccess(entries){
	console.log("entries: " + entries);
}

function load2()
{
                var params = 
                {              AuthenticationRequest:{
                                               "companyID": 10254,
                                               "identificationCode": "12314252389230853",
                                               "username": "marco.silvestro",
                                               "password": "Techmobile1"
                                               }
                };             
                           
                $.ajax({
                               beforeSend: function (xhr) {
                                               xhr.setRequestHeader('Access-Control-Allow-Methods', ' POST');
                                               xhr.setRequestHeader("Content-Type","application/json");
                                               xhr.setRequestHeader("Accept","application/json");
                               },
                               type: "POST",
                               url: "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/Authentication/",
                               data: JSON.stringify(params),                               
                               dataType: "json",
                               contentType: "application/json",

                               success: function(data) {
                            	   				alert("success ----");
                                               console.log(data);
                                               //alert("ok");
                                               //alert(data.AuthenticationResponse.requiredLogin);
                                               alert(data.AuthenticationResponse.error.description);
                               },
                               error: function(error) {
               	   								alert("error ----: " + error);
                                               console.log(JSON.stringify(error));
                                               //alert(error.status);
                               }
                });
}


function wsAuthentication(username, password)
{
				console.log("utente: " + username);
                var params = 
                {              AuthenticationRequest:{
                                               "companyID": 10254,
                                               "identificationCode": "12314252389230853",
                                               "username": username,
                                               "password": password
                                               }
                };             
                           
                $.ajax({
                               beforeSend: function (xhr) {
                                               xhr.setRequestHeader('Access-Control-Allow-Methods', ' POST');
                                               xhr.setRequestHeader("Content-Type","application/json");
                                               xhr.setRequestHeader("Accept","application/json");
                               },
                               type: "POST",
                               url: "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/Authentication/",
                               data: JSON.stringify(params),                               
                               dataType: "json",
                               contentType: "application/json",

                               success: function(data) {
                                               //alert(data.AuthenticationResponse.requiredLogin);
                                               alert(data.AuthenticationResponse.error.description);
                               },
                               error: function(error) {
               	   								alert("error: " + error);
                                               console.log(JSON.stringify(error));
                               }
                });
}