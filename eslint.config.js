const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
    //   "@nx/dependency-checks": [
    //   "error",
    //   {
    //     "buildTargets": ["build"], // add non standard build target names
    //     "checkMissingDependencies": true, // toggle to disable
    //     "checkObsoleteDependencies": true, // toggle to disable
    //     "checkVersionMismatches": true, // toggle to disable
    //     "ignoredDependencies": [], // these libs will be omitted from checks
    //     "ignoredFiles": ["*.spec.*"], // list of files that should be skipped for check
    //     "includeTransitiveDependencies": false, // collect dependencies transitively from children
    //     "useLocalPathsForWorkspaceDependencies": false // toggle to disable
    //   }
    // ],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['*.spec.ts', '*.spec.tsx'],
    rules: {
      '@nx/dependency-checks': 'off',
    }
  }
];
