import { program } from 'commander'

import pkg from '../package.json' with { type: 'json' }

console.log(pkg.version)

program
  .name('5edata-cli')
  .description('CLI tool for interacting with 5edata services')
  .version(pkg.version)
  .option('-v, --verbose', 'Enable verbose output')
  .action((options) => {
    if (options.verbose) {
      console.log('Verbose mode enabled')
    }
    console.log('5edata-cli is running...')
  })

program.parse(process.argv)
