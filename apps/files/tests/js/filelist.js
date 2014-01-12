describe('FileList tests', function() {
	beforeEach(function() {
		// init horrible parameters
		$('<input type="hidden" id="dir" value="/subdir"></input>').append('body');
		$('<input type="hidden" id="permissions" value="31"></input>').append('body');
	});
	afterEach(function() {
		$('#dir, #permissions').remove();
	});
	it('generates file element with correct attributes when calling addFile', function() {
		var lastMod = new Date(10000);
		var $tr = FileList.addFile('testName.txt', 1234, lastMod, false, false, {download_url: 'test/download/url'});
		
		expect($tr).toBeDefined();
		expect($tr[0].tagName.toLowerCase()).toEqual('tr');
		expect($tr.attr('data-type')).toEqual('file');
		expect($tr.attr('data-file')).toEqual('testName.txt');
		expect($tr.attr('data-size')).toEqual('1234');
		//expect($tr.attr('data-permissions')).toEqual('31');
		//expect($tr.attr('data-mime')).toEqual('plain/text');
	});
	it('generates dir element with correct attributes when calling addDir', function() {
		var lastMod = new Date(10000);
		var $tr = FileList.addDir('testFolder', 1234, lastMod, false);
		
		expect($tr).toBeDefined();
		expect($tr[0].tagName.toLowerCase()).toEqual('tr');
		expect($tr.attr('data-type')).toEqual('dir');
		expect($tr.attr('data-file')).toEqual('testFolder');
		expect($tr.attr('data-size')).toEqual('1234');
		//expect($tr.attr('data-permissions')).toEqual('31');
		//expect($tr.attr('data-mime')).toEqual('httpd/unix-directory');
	});
});
