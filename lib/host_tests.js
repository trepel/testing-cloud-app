var expect = require('chai').expect;
var fh = require('fh-mbaas-api');
var request = require('request');

/**
 * Checks statusCode (200) of given URL
 * @param host  {string}  URL
 * @param done  {object}
 */
function checkHostStatus(host, done) {
  request.get(host, function(err, res) {
    expect(err).to.not.exist;
    expect(res.statusCode).to.eql(200);
    done();
  });
}

describe('Host API', function() {
  it('should get host URL', function(done) {
    fh.host(function(err, res) {
      try {
        expect(err).to.not.exist;
        expect(res.host).to.be.a('string');

        console.log(res.props);

        checkHostStatus(res.host, done);
      } catch (e) {
        done(e);
      }
    });
  });
});
