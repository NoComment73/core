describe('Files tests', function() {
	describe('File name validation', function() {
		it('Validates correct file names', function() {
			var fileNames = [
				'boringname',
				'something.with.extension',
				'now with spaces',
				'.a',
				'..a',
				'.dotfile',
				'single\'quote',
				'  spaces before',
				'spaces after   ',
				'allowed chars including the crazy ones $%&_-^@!,()[]{}=;#',
				'汉字也能用',
				'und Ümläüte sind auch willkommen'
			];
			for ( var i = 0; i < fileNames.length; i++ ) {
				try {
					expect(Files.isFileNameValid(fileNames[i])).toEqual(true);
				}
				catch (e) {
					fail();
				}
			}
		});
		it('Detects invalid file names', function() {
			var fileNames = [
				'',
				'     ',
				'.',
				'..',
				'back\\slash',
				'sl/ash',
				'lt<lt',
				'gt>gt',
				'col:on',
				'double"quote',
				'pi|pe',
				'dont?ask?questions?',
				'super*star',
				'new\nline',
				' ..',
				'.. ',
				'. ',
				' .'
			];
			for ( var i = 0; i < fileNames.length; i++ ) {
				var threwException = false;
				try {
					Files.isFileNameValid(fileNames[i]);
					fail();
				}
				catch (e) {
					threwException = true;
				}
				expect(threwException).toEqual(true);
			}
		});
	});
});
