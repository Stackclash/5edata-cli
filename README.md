5edata-cli
=================

A CLI tool to convert 5etools JSON and D&D Beyond character data to markdown files.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/5edata-cli.svg)](https://npmjs.org/package/5edata-cli)
[![Downloads/week](https://img.shields.io/npm/dw/5edata-cli.svg)](https://npmjs.org/package/5edata-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g 5edata-cli
$ 5edata-cli COMMAND
running command...
$ 5edata-cli (--version)
5edata-cli/0.0.0 win32-x64 node-v22.17.0
$ 5edata-cli --help [COMMAND]
USAGE
  $ 5edata-cli COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g 5edata-cli
$ 5edata-cli COMMAND
running command...
$ 5edata-cli (--version)
5edata-cli/0.0.0 win32-x64 node-v22.17.0
$ 5edata-cli --help [COMMAND]
USAGE
  $ 5edata-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`5edata-cli help [COMMAND]`](#5edata-cli-help-command)
* [`5edata-cli plugins`](#5edata-cli-plugins)
* [`5edata-cli plugins add PLUGIN`](#5edata-cli-plugins-add-plugin)
* [`5edata-cli plugins:inspect PLUGIN...`](#5edata-cli-pluginsinspect-plugin)
* [`5edata-cli plugins install PLUGIN`](#5edata-cli-plugins-install-plugin)
* [`5edata-cli plugins link PATH`](#5edata-cli-plugins-link-path)
* [`5edata-cli plugins remove [PLUGIN]`](#5edata-cli-plugins-remove-plugin)
* [`5edata-cli plugins reset`](#5edata-cli-plugins-reset)
* [`5edata-cli plugins uninstall [PLUGIN]`](#5edata-cli-plugins-uninstall-plugin)
* [`5edata-cli plugins unlink [PLUGIN]`](#5edata-cli-plugins-unlink-plugin)
* [`5edata-cli plugins update`](#5edata-cli-plugins-update)

## `5edata-cli help [COMMAND]`

Display help for 5edata-cli.

```
USAGE
  $ 5edata-cli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for 5edata-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `5edata-cli plugins`

List installed plugins.

```
USAGE
  $ 5edata-cli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ 5edata-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/index.ts)_

## `5edata-cli plugins add PLUGIN`

Installs a plugin into 5edata-cli.

```
USAGE
  $ 5edata-cli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into 5edata-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the 5EDATA_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the 5EDATA_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ 5edata-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ 5edata-cli plugins add myplugin

  Install a plugin from a github url.

    $ 5edata-cli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ 5edata-cli plugins add someuser/someplugin
```

## `5edata-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ 5edata-cli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ 5edata-cli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/inspect.ts)_

## `5edata-cli plugins install PLUGIN`

Installs a plugin into 5edata-cli.

```
USAGE
  $ 5edata-cli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into 5edata-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the 5EDATA_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the 5EDATA_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ 5edata-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ 5edata-cli plugins install myplugin

  Install a plugin from a github url.

    $ 5edata-cli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ 5edata-cli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/install.ts)_

## `5edata-cli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ 5edata-cli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ 5edata-cli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/link.ts)_

## `5edata-cli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins remove myplugin
```

## `5edata-cli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ 5edata-cli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/reset.ts)_

## `5edata-cli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/uninstall.ts)_

## `5edata-cli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins unlink myplugin
```

## `5edata-cli plugins update`

Update installed plugins.

```
USAGE
  $ 5edata-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/update.ts)_
<!-- commandsstop -->
* [`5edata-cli hello PERSON`](#5edata-cli-hello-person)
* [`5edata-cli hello world`](#5edata-cli-hello-world)
* [`5edata-cli help [COMMAND]`](#5edata-cli-help-command)
* [`5edata-cli plugins`](#5edata-cli-plugins)
* [`5edata-cli plugins add PLUGIN`](#5edata-cli-plugins-add-plugin)
* [`5edata-cli plugins:inspect PLUGIN...`](#5edata-cli-pluginsinspect-plugin)
* [`5edata-cli plugins install PLUGIN`](#5edata-cli-plugins-install-plugin)
* [`5edata-cli plugins link PATH`](#5edata-cli-plugins-link-path)
* [`5edata-cli plugins remove [PLUGIN]`](#5edata-cli-plugins-remove-plugin)
* [`5edata-cli plugins reset`](#5edata-cli-plugins-reset)
* [`5edata-cli plugins uninstall [PLUGIN]`](#5edata-cli-plugins-uninstall-plugin)
* [`5edata-cli plugins unlink [PLUGIN]`](#5edata-cli-plugins-unlink-plugin)
* [`5edata-cli plugins update`](#5edata-cli-plugins-update)

## `5edata-cli hello PERSON`

Say hello

```
USAGE
  $ 5edata-cli hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ 5edata-cli hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Stackclash/5edata-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `5edata-cli hello world`

Say hello world

```
USAGE
  $ 5edata-cli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ 5edata-cli hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Stackclash/5edata-cli/blob/v0.0.0/src/commands/hello/world.ts)_

## `5edata-cli help [COMMAND]`

Display help for 5edata-cli.

```
USAGE
  $ 5edata-cli help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for 5edata-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `5edata-cli plugins`

List installed plugins.

```
USAGE
  $ 5edata-cli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ 5edata-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/index.ts)_

## `5edata-cli plugins add PLUGIN`

Installs a plugin into 5edata-cli.

```
USAGE
  $ 5edata-cli plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into 5edata-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the 5EDATA_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the 5EDATA_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ 5edata-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ 5edata-cli plugins add myplugin

  Install a plugin from a github url.

    $ 5edata-cli plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ 5edata-cli plugins add someuser/someplugin
```

## `5edata-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ 5edata-cli plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ 5edata-cli plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/inspect.ts)_

## `5edata-cli plugins install PLUGIN`

Installs a plugin into 5edata-cli.

```
USAGE
  $ 5edata-cli plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into 5edata-cli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the 5EDATA_CLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the 5EDATA_CLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ 5edata-cli plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ 5edata-cli plugins install myplugin

  Install a plugin from a github url.

    $ 5edata-cli plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ 5edata-cli plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/install.ts)_

## `5edata-cli plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ 5edata-cli plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ 5edata-cli plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/link.ts)_

## `5edata-cli plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins remove myplugin
```

## `5edata-cli plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ 5edata-cli plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/reset.ts)_

## `5edata-cli plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/uninstall.ts)_

## `5edata-cli plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ 5edata-cli plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ 5edata-cli plugins unlink
  $ 5edata-cli plugins remove

EXAMPLES
  $ 5edata-cli plugins unlink myplugin
```

## `5edata-cli plugins update`

Update installed plugins.

```
USAGE
  $ 5edata-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.47/src/commands/plugins/update.ts)_
<!-- commandsstop -->
