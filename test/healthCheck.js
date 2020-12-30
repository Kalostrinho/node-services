const expect = require('chai').expect
const ax = require('axios').default
const out = require('../helpers/format')
const axConfig = require('../helpers/config')

describe('HealthCheck', function (){
  this.timeout(10000)  // This is the MOCHA timeout

  it('should wait for the service to properly spawn', async () => {
    await wait()
  })

  it('should GET [200] while testing the "Welcome" endpoint', async () => {
    const response = await welcome()
    expect(
      response.status,
      `[Welcome] endpoint response was not 200 OK! (${response.status})`
    ).to.be.equal(200)
  })

  it('should GET proper message while testing the "Welcome" endpoint', async () => {
    const response = await welcome()
    expect(
      response.data.message,
      '[Welcome message] was different than expected!'
    ).to.include('Welcome')
    out.request(JSON.stringify(response.data, null, 2))
  })

})

/**
 * Primitive "SLEEP".
 * @param {number} [ms = 5000] - Delay in miliseconds
 */
const wait = (ms = 5000) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  })
}

/**
 * Send a basic GET request to wiremock service.
 * **_Uses "axios" to execute request._**
 */
const welcome = async () => {
  return await ax.get('/welcome', axConfig.defaultConfig)
}
