import oclifPrettierConfig from '@oclif/prettier-config'

/** @type {import('prettier').Config} */
export default {
  ...oclifPrettierConfig,
  bracketSpacing: true,
  semi: false,
  singleQuote: true,
}
