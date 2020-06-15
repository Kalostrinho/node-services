/**
 * Helper module to format output nicely
 */
const chalk = require('chalk')
const boxen = require('boxen')

/**
 * Prints out a stylized title message.
 * @param {string} msg - The title to set
 */
function title(msg){
  const bxOpts = {
    padding: {
      top: 0, 
      bottom: 0,
      left: 30,
      right: 30
    },
    float: 'center',
    borderStyle: 'double',
    borderColor: 'cyan',
    backgroundColor: '#012C45'
  }
  console.log(`\n${boxen(chalk.greenBright.bold(msg), bxOpts)}\n`)
}

/**
 * Prints out a stylized sub-title message.
 * @param {string} msg - The sub-title to set
 */
function subTitle(msg){
  const bxOpts = {
    padding: {
      top: 0, 
      bottom: 0,
      left: 3,
      right: 3
    },
    margin: {
      top: 1, 
      bottom: 0,
      left: 1,
      right: 0
    },
    borderStyle: 'round',
    borderColor: 'cyan',
    backgroundColor: 'black'
  }
  console.log(`${boxen(chalk.blueBright.bold.italic(msg), bxOpts)}\n`)
}

/**
 * Prints out a stylized notification message.
 * @param {string} msg - The notification to set
 */
function notification(msg){
  const bxOpts = {
    padding: {
      top: 0, 
      bottom: 0,
      left: 3,
      right: 3
    },
    margin: {
      top: 1, 
      bottom: 0,
      left: 1,
      right: 0
    },
    borderStyle: 'doubleSingle',
    borderColor: 'blue',
    backgroundColor: 'black'
  }
  console.log(`${boxen(chalk.blueBright.bold.italic(msg), bxOpts)}\n`)
}

/**
 * Prints out a general message
 * @param {string} msg - The title to set
 */
function general(msg){
  console.log(`${chalk.cyanBright.bold(msg)}`)
}

/**
 * Prints out an error message
 * @param {string} msg - The title to set
 */
function error(msg){
  console.log(`${chalk.redBright.bold(msg)}`)
}

/**
 * Prints out a success message
 * @param {string} msg - The title to set
 */
function success(msg){
  console.log(`${chalk.greenBright.bold(msg)}`)
}

/**
 * Prints out a warning message
 * @param {string} msg - The title to set
 */
function warning(msg){
  console.log(`${chalk.yellowBright.bold(msg)}`)
}

/**
 * Prints out a welcome message
 */
function welcome(){
  const bxOpts = {
    padding: {
      top: 1, 
      bottom: 1,
      left: 20,
      right: 20
    },
    float: 'center',
    borderStyle: 'doubleSingle',
    borderColor: 'cyan',
    backgroundColor: 'black'
  }
  let msg = `${' '.repeat(17)}---   W E L C O M E   ---
  This tool will spawn a new local service for you to test.
  Congrats! You must have ${chalk.italic('Docker')} and ${chalk.italic('NodeJS')} properly installed.`
  console.log(`${boxen(chalk.cyanBright.bold(msg), bxOpts)}\n`)
}

module.exports = {
  title,
  subTitle,
  notification,
  general,
  error,
  success,
  warning,
  welcome
}