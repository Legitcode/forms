var test = require('tap').test,
    reactable\-forms = require(__dirname + '/../../lib/index.js');

reactable\-forms(function (err) {
    test('unit', function (t) {
        t.equal(err, null, 'error object is null');
        t.end();
    });
});