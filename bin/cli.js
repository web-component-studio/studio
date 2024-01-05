#!/usr/bin/env node
import {resolve, dirname} from 'path';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import { findUp } from 'find-up';

import lib from '../lib/index.js';

// set production mode for Vite to prevent dev Lit builds
// from being imported
process.env.NODE_ENV = 'production';

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
    ? resolve(cwd, args.config)
    : await findUp('studio.config.js', { cwd });

  if (!configPath) {
    console.error(
      'Please add a studio.config.js to the root of your project.'
    );
    process.exit(1);
  }

  const config = import(configPath);

  const studio = lib({
    cwd: dirname(configPath),
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
