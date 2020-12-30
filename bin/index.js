#!/usr/bin/env node
const sh = require('shelljs')
const args = require('../helpers/args')
const cmd = require('../helpers/commands')
const out = require('../helpers/format')
//out.subTitle(`ARGUMENTS => ${JSON.stringify(args)}`)

//  --- Check for requirements to make this CLI work and welcome users afterwards...
if (!sh.which('docker')) {
  out.warning('\n⚠️   Seems that DOCKER is not installed  ⚠️')
  out.general('   ⓘ  Visit https://docs.docker.com/docker-for-mac/install/\n')
  sh.exit(1)
}
if (!sh.which('node')) {
  out.warning('\n⚠️   Seems that NODE is not installed  ⚠️')
  out.general('   ⓘ  Visit https://nodejs.org/en/download/')
  out.general('   ⓘ  You can also try using HomeBrew: "brew install node"\n')
  sh.exit(1)
}

//  --- Starting...
sh.exec('clear')
out.welcome()

//  --- Initial cleaning
if (!args['no-clean']) {
  if (args.c) out.title('✨ DON\'T WORRY! IT WOULD ONLY CLEAN UP AND EXIT! ✨')
  cmd.clean()
}

if (!args.c) {
  
  out.subTitle(`🐳 WORKING WITH DOCKER 🐳`)
  //  --- Create & images from DOCKERFILE...
  cmd.createDockerImage()
  cmd.verifyDockerImage()
  //  --- Mount & verify running state of the docker container...
  cmd.mountDockerImage()
  cmd.verifyImageMount()

  //  --- Running health check on WireMock container...
  if (!args['no-check']) {
    out.subTitle(`🏥 HEALTH CHECK 🏥`)
    cmd.wiremockHealthCheck()
  }

  //  --- Running tests...
  if (!args['no-tests']) {
    out.subTitle(`🛠 RUNNING TESTS 🛠`)
    cmd.runBasicTests()
  }
  
  //  --- Providing feedback to users...
  cmd.provideFeedback()

} else {
  out.title('🤣 SEE? I TOLD YOU! 🤣')
}
