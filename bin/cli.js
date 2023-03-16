#!/usr/bin/env node
const path = require('path');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const findUp = require('find-up');
const lib = require('../lib');

const showUsage = () => {
  console.log(
    commandLineUsage([
      {
        header: 'studio',
        content:
          'Design with web components. Assemble your pallette, paint your thoughts in the browser.\n\nUsage: studio <command> [options...]',
      },
      {
        header: 'Commands',
        content: [
          { name: 'start', summary: 'Start a local studio.' },
          {
            name: 'build',
            summary: 'Build a studio for production.',
          },
          { name: 'help', summary: 'Show this usage guide.' },
        ],
      },
      {
        header: 'Options',
        optionList: [
          {
            name: 'config',
            typeLabel: '{underline path}',
            description: 'Path to a config file.',
          },
        ],
      },
    ])
  );
};

/* eslint-disable consistent-return */
(async () => {
  const args = commandLineArgs([
    { name: 'command', defaultOption: true, defaultValue: 'start' },
    { name: 'config' },
    { name: 'help', type: Boolean },
  ]);

  if (args.command === 'help' || args.help) {
    return showUsage();
  }

  const cwd = process.cwd();
  const configPath = args.config
    ? path.resolve(cwd, args.config)
    : await findUp('studio.config.js', { cwd });

  if (!configPath) {
    console.error(
      'Please add a studio.config.js to the root of your project.'
    );
    process.exit(1);
  }

  const config = require(configPath);

  const studio = lib({
    cwd: path.dirname(configPath),
    ...config,
  });

  if (studio.hasOwnProperty(args.command)) {
    studio[args.command]((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    showUsage();
    process.exit(1);
  }
})();
