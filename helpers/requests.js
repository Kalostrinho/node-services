const ax = require('axios').default
const axConfig = require('./config')

/**
 * Send a basic GET request to wiremock service without credentials.
 */
const getEmployeesNoAuth = async () => {
    let res
    try {
      res = await ax.get('/company/employees', axConfig.defaultConfig)
    } catch(e) {
      res = e
    }
    return res
  }
  
  /**
   * Send a basic GET request to wiremock service with valid credentials.
   * @param {Object} [options] - The options ot send to request
   * @param {number} [options.id = 0] - The ID of an employee. Defaults to 0.
   * @param {Object[]} [options.params = []] - The query params to add to the request in the form of "key=value". Defaults to none.
   */
  const getEmployees = async (options) => {
    let res
    let defOptions = {
      id: 0,
      params: []
    }
    const opts = {...defOptions, ...options}
    try {
      let uri = opts.id !== 0
        ? `/company/employees/${opts.id}`
        : '/company/employees'
      for (const param of opts.params) {
        uri += uri.includes('employees?')
          ? `&${param}`
          : `?${param}`
      }
      res = await ax.get(uri, axConfig.basicAuth)
    } catch(e) {
      res = e
    }
    return res
  }
  
  /**
   * Send a basic POST request to wiremock service with valid credentials.
   * @param {Object} data - The request body for posting a new employee
   */
  const postEmployee = async (data) => {
    let res
    try {
      let uri = '/company/employees'
      res = await ax.post(uri, data, axConfig.basicAuth)
    } catch(e) {
      res = e
    }
    return res
  }
  
  /**
   * Send a basic PUT request to wiremock service with valid credentials.
   * @param {Object} data - The request body for updating a new employee
   * @param {Object} id - The ID of the employee to update
   */
  const putEmployee = async (data, id) => {
    let res
    try {
      let uri = `/company/employees/${id}`
      res = await ax.put(uri, data, axConfig.basicAuth)
    } catch(e) {
      res = e
    }
    return res
  }
  
  /**
   * Send a basic DELETE request to wiremock service with valid credentials.
   * @param {Object} id - The ID of the employee to delete
   */
  const deleteEmployee = async (id) => {
    let res
    try {
      let uri = `/company/employees/${id}`
      res = await ax.delete(uri, axConfig.basicAuth)
    } catch(e) {
      res = e
    }
    return res
  }

  module.exports = {
      getEmployees,
      getEmployeesNoAuth,
      postEmployee,
      putEmployee,
      deleteEmployee,
  }