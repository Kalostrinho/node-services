const expect = require('chai').expect
const out = require('../../helpers/format')
const req = require('../../helpers/requests')
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const NOT_FOUND = 404
  
describe(`BASIC: Error handling suite`, () => {
    
  it('should NOT GET any employees without basic credentials', async () => {
    const res = await req.getEmployeesNoAuth()
    expect(
      res.status,
      `[Employees] response status was not ${UNAUTHORIZED}! (${res.status} instead)`
    ).to.be.equal(UNAUTHORIZED)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it('should NOT GET an employee with an unexistent ID', async () => {
    const res = await req.getEmployees({
      id: 8
    })
    expect(
      res.status,
      `[Employees] response status was not ${NOT_FOUND}! (${res.status} instead)`
    ).to.be.equal(NOT_FOUND)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should NOT POST a new employee while using an incomplete payload`, async () => {
    const data = {
      "first-name": 'Alan',
      "last-name": 'Zinho',
      "level": 9,
    }
    const res = await req.postEmployee(data)
    expect(
      res.status,
      `[Employees] response was not ${BAD_REQUEST}! (${res.status} instead)`
    ).to.be.equal(BAD_REQUEST)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should NOT UPDATE an existing employee while using an incomplete payload`, async () => {
    const data = {
      "first-name": 'Alan',
      "last-name": 'Zinho',
      "level": 9,
    }
    const res = await req.putEmployee(data, 1)
    expect(
      res.status,
      `[Employees] response was not ${BAD_REQUEST}! (${res.status} instead)`
    ).to.be.equal(BAD_REQUEST)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should NOT UPDATE an employee while using an unexistent ID`, async () => {
    const data = {
      "first-name": 'Alan',
      "last-name": 'Zinho',
      "dark-side": true,
      "level": 9,
    }
    const res = await req.putEmployee(data, 9)
    expect(
      res.status,
      `[Employees] response was not ${NOT_FOUND}! (${res.status} instead)`
    ).to.be.equal(NOT_FOUND)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should NOT DELETE an employee while using an unexistent ID`, async () => {
    const res = await req.deleteEmployee(6)
    expect(
      res.status,
      `[Employees] response was not ${NOT_FOUND}! (${res.status} instead)`
    ).to.be.equal(NOT_FOUND)
    out.request(JSON.stringify(res.data, null, 2))
  })

})