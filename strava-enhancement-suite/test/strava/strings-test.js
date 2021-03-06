test('Strings tests', function() {
	var s = 'the {0} in {1} stays mainly on the {2}';
	equal(s.format(['rain', 'spain', 'plain']), 'the rain in spain stays mainly on the plain', 'simple text replacement');
	
	s = 'try some numbers: {0}, {1}';
	equal(s.format([123, 456]), 'try some numbers: 123, 456', 'replacement with numeric values');
});
