const nx = require('@nx/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const requireExtensions = require('eslint-plugin-require-extensions');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['**/dist'],
  },
  {
    ...requireExtensions.configs.recommended,
    plugins: {
      "require-extensions": requireExtensions,
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      "@nx/dependency-checks": [
        "error",
        {
          "buildTargets": ["build"], // add non standard build target names
          "checkMissingDependencies": true, // toggle to disable
          "checkObsoleteDependencies": true, // toggle to disable
          "checkVersionMismatches": true, // toggle to disable
          "ignoredDependencies": [], // these libs will be omitted from checks
          "ignoredFiles": ["*.spec.*"], // list of files that should be skipped for check
          "includeTransitiveDependencies": false, // collect dependencies transitively from children
          "useLocalPathsForWorkspaceDependencies": false // toggle to disable
        }
      ],
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
    settings: {
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        },
        "typescript": {
          "project": ["packages/*/tsconfig.*?json", "tsconfig.base.json"],
        }
      }
    }
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
