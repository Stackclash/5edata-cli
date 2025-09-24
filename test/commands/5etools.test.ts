import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('5etools', () => {
  it('runs 5etools cmd', async () => {
    const { stdout } = await runCommand('5etools')
    expect(stdout).to.contain('5etools command executed')
  })

  it('runs 5etools --name oclif', async () => {
    const { stdout } = await runCommand('5etools --name oclif')
    expect(stdout).to.contain('5etools command executed')
  })
})
