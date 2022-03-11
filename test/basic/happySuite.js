const expect = require('chai').expect
const out = require('../../helpers/format')
const req = require('../../helpers/requests')
const TOTAL_EMPLOYEES = 5
const DARK_SIDE_EMPLOYEES = 2
const LIGHT_SIDE_EMPLOYEES = 3
const SUCCESS = 200
const CREATED = 201
const NO_CONTENT = 204

describe('BASIC: Happy path suite', () => {
  
  it(`should GET all employees at once`, async () => {
    const res = await req.getEmployees()
    expect(
      res.status,
      `[Employees] response was not ${SUCCESS}! (${res.status} instead)`
    ).to.be.equal(SUCCESS)
  })

  it(`should GET the proper number of employees (${TOTAL_EMPLOYEES})`, async () => {
    const res = await req.getEmployees()
    expect(
      res.data.employees.length,
      `Expected ${TOTAL_EMPLOYEES} employees but there were ${res.data.employees.length})`
    ).to.be.equal(TOTAL_EMPLOYEES)
  })

  for (const ID of [1, 2, 3, 4, 5]) {
    it(`should GET employee with ID = ${ID}`, async () => {
      const res = await req.getEmployees({ id: ID})
      expect(
        res.data.id,
        `[Employee ID: ${ID}] did not match! (Id retrieved: ${res.data.id})`
      ).to.be.equal(ID)
      out.request(JSON.stringify(res.data, null, 2))
    })
  }

  it(`should GET ${DARK_SIDE_EMPLOYEES} employees leaned towards the dark side`, async () => {
    const res = await req.getEmployees({ params: ['side=dark'] })
    expect(
      res.data.employees.length,
      `Expected ${DARK_SIDE_EMPLOYEES} [dark side employees] but there were ${res.data.employees.length}`
    ).to.be.equal(DARK_SIDE_EMPLOYEES)
  })

  it(`should GET ${LIGHT_SIDE_EMPLOYEES} employees leaned towards the light side`, async () => {
    const res = await req.getEmployees({ params: ['side=light'] })
    expect(
      res.data.employees.length,
      `Expected ${LIGHT_SIDE_EMPLOYEES} [dark side employees] but there were ${res.data.employees.length}`
    ).to.be.equal(LIGHT_SIDE_EMPLOYEES)
  })

  it(`should POST a new employee`, async () => {
    const data = {
      "first-name": 'Alan',
      "last-name": 'Zinho',
      "dark-side": true,
      "level": 9,
    }
    const res = await req.postEmployee(data)
    expect(
      res.status,
      `[Employees] response was not ${CREATED}! (${res.status} instead)`
    ).to.be.equal(CREATED)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should UPDATE an existing employee by its ID`, async () => {
    const data = {
      "first-name": 'Alan',
      "last-name": 'Zinho',
      "dark-side": true,
      "level": 9,
    }
    const res = await req.putEmployee(data, 1)
    expect(
      res.status,
      `[Employees] response was not ${SUCCESS}! (${res.status} instead)`
    ).to.be.equal(SUCCESS)
    out.request(JSON.stringify(res.data, null, 2))
  })

  it(`should DELETE an existing employee by its ID`, async () => {
    const res = await req.deleteEmployee(1)
    expect(
      res.status,
      `[Employees] response was not ${NO_CONTENT}! (${res.status} instead)`
    ).to.be.equal(NO_CONTENT)
  })
})