/*
Resources:
http://www.html5rocks.com/en/tutorials/file/dndfiles/

save and load code based on:
  google-blockly-read-only/tests/playground.html
*/

(function() {
// Store globals as locals.
// http://www.nczonline.net/blog/2009/02/10/javascript-variable-performance/
var doc = document;
var body = doc.body;
var win = window;
var BlobBuilder = WebKitBlobBuilder;
var URL = webkitURL;
var Reader = FileReader;

(function(){
  var div = doc.createElement( 'div' );
  div.setAttribute( 'style', 'position: absolute; top: 80%;' );

  // Display 'Load' button instead of 'Choose File' default input text.
  // http://www.quirksmode.org/dom/inputfile.html
  div.innerHTML = '<button id="save">Save</button>' +
  '<button id="fakeload">Load</button>' +
  '<input type="file" id="load" style="display: none;"/>';

  body.appendChild( div );
})();

var loadInput = doc.getElementById( 'load' );
loadInput.addEventListener( 'change', load, false );
doc.getElementById( 'fakeload' ).onclick = function() { loadInput.click(); };
doc.getElementById( 'save' ).onclick = save;

var downloadLink = doc.createElement( 'a' );
downloadLink.download = 'maze.xml';

function save() {
  var xml = Blockly.Xml.workspaceToDom( Blockly.mainWorkspace );
  var data = Blockly.Xml.domToText( xml );

  // Store data in blob.
  var builder = new BlobBuilder();
  builder.append( data );
  var	blob = builder.getBlob();

  // Click on blob URL then delete the URL.
  var blobURL = URL.createObjectURL( blob );
  downloadLink.href = blobURL;

  downloadLink.click();
  webkitURL.revokeObjectURL( blobURL );
};

// Run on loadInput.click() from window.realClick.
function load( event ) {
  var files = event.target.files;
  
  // Only allow uploading one file.
  if ( files.length !== 1 )
    return;

  // FileReader
  var reader = new Reader();
  reader.onloadend = function( event ) {
    var target = event.target;
    // 2 === FileReader.DONE
    if ( target.readyState === 2 ) {
      var xml = Blockly.Xml.textToDom( target.result );
      Blockly.Xml.domToWorkspace( Blockly.mainWorkspace, xml );
    }
    // Reset value of input after loading
    // because Chrome will not fire a 'change' event
    // if the same file is loaded again.
    loadInput.value = '';
  };

  reader.readAsText( files[ 0 ] );
};
})();
