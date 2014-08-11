package eu.techmobile.multipart;

 import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

public class Multipart extends CordovaPlugin{

	private static final String MULTIPART_TAG = null;


	@Override
	public boolean execute(final String action, final JSONArray args,
			final CallbackContext callbackContext) throws JSONException {

		final Context context = this.cordova.getActivity();
		
		Log.d(MULTIPART_TAG, "FIRS: " + args.length());
		Log.d(MULTIPART_TAG, "getJSONObject(0): " + args.getJSONObject(0));
		JSONObject argObject = args.getJSONObject(0);
		 Log.d(MULTIPART_TAG, "argObject:serviceUrl: " + argObject.getString("serviceUrl"));
		
		// sincronizza il modulo definito in action
		cordova.getThreadPool().execute(new Runnable() {
			@Override
			public void run() {
				try {
					uploadFiles(context, action, args, callbackContext);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}				
			}


		});
		return true;
	}
	
	private static void uploadFiles(Context context, String action, final JSONArray args, CallbackContext callbackContext) throws JSONException {
		String requestURL = null;
		JSONArray resPaths = null;
		String charset = "UTF-8";
    	Log.d(MULTIPART_TAG, "ROOT EXTERNAL: " + Environment.getExternalStorageDirectory() + " ROOT: " + Environment.getRootDirectory());
		JSONObject argObject = args.getJSONObject(0);
		 Log.d(MULTIPART_TAG, "argObject:serviceUrl::: " + argObject.getString("serviceUrl"));
		 
		 requestURL = argObject.getString("serviceUrl");
		 resPaths = argObject.getJSONArray("resPaths");
		 Log.d(MULTIPART_TAG, "GET:: " + resPaths.get(0));

//
//		 
//		File uploadFile1 = new File(Environment.getExternalStorageDirectory() + "/Download/JavaScript.pdf");
//		File uploadFile2 = new File(Environment.getExternalStorageDirectory() + "/Download/imperial_1_smallbanner.jpg");

		
		//String requestURL = "http://192.168.1.236:8090/Merp-Core/services/rest/mobileService/SendMultimedia/";
		try {
				
			Log.d(MULTIPART_TAG, "before multipart");
			MultipartUtility multipart = new MultipartUtility(requestURL, charset);
			Log.d(MULTIPART_TAG, "before addHeaderField");

			multipart.addHeaderField("User-Agent", "CodeJava");
			multipart.addHeaderField("Test-Header", "Header-Value");
			Log.d(MULTIPART_TAG, "before addFormField");

			multipart.addFormField("description", "descr");
			multipart.addFormField("keywords", "Java,upload");
			 
			Log.d(MULTIPART_TAG, "resPaths.length(): " + resPaths.length());

			 for (int i = 0; i < resPaths.length(); i++) {
				 File fileToPost = new File(resPaths.get(i).toString());
				 multipart.addFilePart("fileUpload", fileToPost);
				 Log.d(MULTIPART_TAG, "added " + resPaths.get(i).toString());
			 }
//			multipart.addFilePart("fileUpload", uploadFile1);
//			multipart.addFilePart("fileUpload", uploadFile2);

			List<String> response = multipart.finish();
			Log.d(MULTIPART_TAG, "SERVER REPLIED");

			System.out.println("SERVER REPLIED:");
			
			for (String line : response) {
				System.out.println(line);
			}
		} catch (IOException ex) {
			System.err.println(ex);
		}
	
	}
}

