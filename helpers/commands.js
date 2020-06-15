/**
 * Helper module to execute shell commands
 */
const sh = require('shelljs')
const chalk = require('chalk')
const out = require('./format')

/**
 * Cleans up all Docker images created by the script
 */
function clean(){
  let start = new Date()
  out.warning('\n⚠️   First we clean!  ⚠️')
  out.warning('\n   ⓘ  Will ONLY remove docker images used by this script!')
  out.subTitle(`🧹 CLEANING UP 🧹`)
  out.general(`⏳ => Remove docker images used by this script and danggling images...`)
  sh.exec('docker rm -f $(docker ps -a --filter ancestor=node_service:latest --format="{{.ID}}")', { silent: true })
  sh.exec('docker system prune -f', { silent: true })
  sh.exec('docker rmi $(docker images | grep -E "node_service|openjdk")', { silent: true })
  out.success('✅ => Clean-up finished!')
  _elapsedTime(start)
}

/**
 * Creates the docker image to use.
 * @param {boolean} [quiet = true] - Whether to display STDOUT
 */
function createDockerImage(quiet = true) {
  let start = new Date()
  out.general('⏳ => Creating docker image ["node_service"]... ')
  const cmd = 'docker build -t node_service:latest .'
  const res = _execute(cmd)
  if (res.code === 1) {
    out.error(`\n💣  OOOH NO! 💥\nSomething just exploded here!\n${'🔥'.repeat(20)}\n${JSON.stringify(res, null, 2)}\n`)
    sh.exit(1)
  }
  if (!quiet) out.notification(res.out)
  out.success('✅ => Docker image ["node_service"] has been created!')
  _elapsedTime(start)
}

/**
 * Runs the image created.
 * @param {boolean} [quiet = true] - Whether to display STDOUT
 */
function mountDockerImage(quiet = true) {
  let start = new Date()
  out.general('⏳ => Mounting docker image ["node_service"]... ')
  const cmd = 'docker run -d -p 3000:3000 -it node_service:latest'
  const res = _execute(cmd)
  if (res.code === 1) {
    out.error(`\n💣  OOOH NO! 💥\nSomething just exploded here!\n${'🔥'.repeat(20)}\n${JSON.stringify(res, null, 2)}\n`)
    sh.exit(1)
  }
  if (!quiet) out.notification(res.out)
  out.success('✅ => Docker container with ["node_service"] has been started!')
  _elapsedTime(start)
}

/**
 * Verifies the creation of the docker image.
 * @param {boolean} [quiet = false] - Whether to display STDOUT
 */
function verifyDockerImage(quiet = false) {
  out.general('⏳ => Verifying docker image was created... ')
  const cmd = 'docker image list --format "[{{.Repository}}] is now created! (Size: {{.Size}})" | grep -E "node_service|openjdk"'
  const res = _execute(cmd)
  if (res.code === 1) {
    out.error(`\n💣  OOOH NO! 💥\nUnable to verify image creation!\n${'🔥'.repeat(20)}\n${JSON.stringify(res, null, 2)}\n`)
    sh.exit(1)
  }
  if (!quiet) out.notification(res.out)
}

/**
 * Verifies docker image is running properly.
 * @param {boolean} [quiet = false] - Whether to display STDOUT
 */
function verifyImageMount(quiet = false) {
  out.general('⏳ => Verifying docker container running... ')
  const cmd = 'docker ps --format "[{{.Names}}] container is now [{{.Status}}] using [{{.Image}}] image!" | grep -E "node_service"'
  const res = _execute(cmd)
  if (res.code === 1) {
    out.error(`\n💣  OOOH NO! 💥\nUnable to verify container mount!\n${'🔥'.repeat(20)}\n${JSON.stringify(res, null, 2)}\n`)
    sh.exit(1)
  }
  if (!quiet) out.notification(res.out)
}

/**
 * Runs a small health check on the service running within the mounted container.
 * 
 * **_Wiremock service is mounted on http://localhost:3000_**
 */
function wiremockHealthCheck(){
  let start = new Date()
  out.general(`⏳ => Check Wiremock services within the container`)
  const res = _execute('npm run test:healthcheck')
  if (res.code === 0) {
    out.success(`✅ => 200 OK! Wiremock is up & running!`)
  } else {
    out.error(`💣 Unable to verify Wiremock service! 💥\n🔥🔥🔥🔥🔥\n${JSON.stringify(res, null, 2)}\n`)
    sh.exit(1)
  }
  _elapsedTime(start)
}

/**
 *  **************************
 *      **************************
 *            PRIVATE METHODS
 *      **************************
 *  **************************
 */

/**
 * Returns the elapsed time in miliseconds based on a starting time.
 * @param {date} start - The starting time
 * @returns {string} - The elapsed time since "start" in miliseconds
 */
function _elapsedTime(start){
  const end = new Date() - start
  out.warning(`⏱  => ${chalk.italic(`Completed after ${(end / 1000).toFixed(3)} seconds`)}\n${'- '.repeat(20)}`)
}

/**
 * @private
 * Executes a shell command.
 * 
 * **_If an error occurrs, execution is killed and attempts to clean_**
 * @param {string} cmd - The main command to execute
 * @returns {Object} - Returns information about the command executed
 */
function _execute(cmd) {
  let toReturn = {}
  const command = sh.exec(cmd, { silent: true})
  toReturn.command = cmd
  toReturn.code = command.code
  toReturn.out = command.stdout
  toReturn.err = command.stderr
  return toReturn
}

/**
 * @private
 * Returns standard options for the spinner that will be created.
 */
function _standardSpinner(desc) {
  return {
    text: chalk.italic.cyan(desc), 
    color: 'yellow',
    spinner: 'line',
    indent: 2
  }
}

module.exports = {
  clean,
  createDockerImage,
  mountDockerImage,
  verifyDockerImage,
  verifyImageMount,
  wiremockHealthCheck
}







