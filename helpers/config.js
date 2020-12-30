/**
 * Default configuration for all AXIOS requests
 * This overrides default behavior of REJECTING promises
 * outside the 200's and 300's
 */
const defaultConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    validateStatus: function (status) {
        return true // To allow assert error status codes
    }
}

/**
 * Configuration using basic auth
 */
const basicAuth = {
    ...defaultConfig,
    auth: {
        username: 'admin',
        password: 'admin'
    }
}

module.exports = {
    defaultConfig,
    basicAuth,
}
