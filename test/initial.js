const { wiremockHealthCheck } = require('../helpers/commands')

const expect = require('chai').expect
const ax = require('axios').default

describe('Initial', function (){
  
  this.timeout(7000)  // Wait to ensure service is ready!
  
  it('HealthCheck: Welcome', async () => {
    const response = await welcome()
    expect(
      response.status,
      `[Welcome] endpoint response was not 200 OK! (${response.status})`
    ).to.be.equal(200)
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
  await wait()
  return await ax.get('http://localhost:3000/welcome')
}
