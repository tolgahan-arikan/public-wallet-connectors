import { releaseVersion, releaseChangelog } from 'nx/release'
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { writeDistTag } from '../lib/writeDistTag.js';

const bumpVersion = async () => {
  const options = await yargs(hideBin(process.argv))
    .version(false) // don't use the default meaning of version in yargs
    .option('version', {
      description:
        'Explicit version specifier to use',
      type: 'string',
      choices: ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch'],
    })
    .option('preId', {
      description: 'The identifier for prerelease versions, defaults to "alpha"',
      type: 'string',
      default: 'alpha',
    })
    .option('dryRun', {
      alias: 'd',
      description:
        'Whether or not to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: true,
    })
    .option('verbose', {
      description:
        'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: false,
    })
    .parseAsync();

  /**
   * Additional configs for bumping version and changelog can be found in nx.json
   */

  // Bumps the version to disk
  const { workspaceVersion, projectsVersionData} = await releaseVersion({
    specifier: options.version,
    preid: options.preId,
    dryRun: options.dryRun,
    verbose: options.verbose,
  });

  console.log('Project version data:', projectsVersionData);
  

  // Updates the changelog according to conventional commits
  await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
  });

  await writeDistTag(projectsVersionData, options.dryRun);
};

export default bumpVersion;

if (require.main === module) {
  bumpVersion().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
