const yargs = require('yargs')
const out = require('./format')
const sh = require('shelljs')

/**
 * Helper module to treat command line arguments properly
 */
module.exports = yargs
  .version(false)
  .option('v', {
    alias: 'version',
    describe: 'Show version.',
    type: 'boolean'
  })
  .option('c', { 
    alias: 'only-clean',
    describe: 'Run "clean-up" ONLY.', 
    type: 'boolean'
  })
  .option('no-check', { 
    describe: 'Skip health check.', 
    type: 'boolean'
  })
  .option('no-clean',{
    describe: 'Skip initial clean up (USE WITH CAUTION).', 
    type: 'boolean'
  }).argv
