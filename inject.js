// https://groups.google.com/a/chromium.org/group/chromium-extensions/browse_thread/thread/eced9d2adffa763f/b5a030f07d6960eb?lnk=gst&q=injected+script+tag#b5a030f07d6960eb
// https://github.com/kurrik/chrome-extensions/blob/master/script-jquery/contentscript.js
var script = document.createElement( 'script' );  
script.src = chrome.extension.getURL( 'save_load_content_script.js' ); 
document.head.appendChild( script );
