import { existsSync, promises } from 'fs';
import { VersionData } from 'nx/src/command-line/release/version';
import { parse, stringify } from 'ini';
import path from 'path';
import semver from 'semver';


const semverSort = (a: string, b: string) => {
  const aSemver = semver.parse(a);
  const bSemver = semver.parse(b);
  if (!aSemver || !bSemver) {
    return 0;
  }
  return semver.compare(aSemver, bSemver);
};

const fetchCache: Record<string, string[]> = {};

const fetchPublishedVersions = async (packageName: string): Promise<string[]> => {
  if (fetchCache[packageName]) {
    return fetchCache[packageName];
  }

  const res = await fetch(`https://registry.npmjs.org/${packageName}`);
  const json = await res.json();
  const versions = Object.keys(json.versions);
  
  /**
  * A list of published versions sorted and filtered to exclude prereleases
  */
  const filterPrereleases = versions.filter(v => !semver.prerelease(v));

  const result = filterPrereleases.length ? filterPrereleases.sort(semverSort) : versions.sort(semverSort);

  if (result.length === 0) {
    console.log('versions', versions);
    throw new Error(`No remote versions found for ${packageName} at https://registry.npmjs.org/${packageName}`);
  }

  fetchCache[packageName] = result;
  return result;
};


const getLatestVersion = async (packageName: string, version: string): Promise<[string, boolean]> => {
  const versions = await fetchPublishedVersions(packageName);
  const latestVersion = versions.sort(semverSort).at(-1)
  if (!latestVersion) {
    throw new Error('No remote versions found [latest]');
  }
  return [latestVersion, semver.gt(version, latestVersion)];
}

const getLatestMinorVersion = async (packageName: string, version: string) => {
  const versions = await fetchPublishedVersions(packageName);
  const major = semver.major(version);

  const filtered = versions.filter(version => semver.major(version) === major)
  const lastVersion = filtered.sort(semverSort).at(-1);
  if (!lastVersion) {
    throw new Error('No remote versions found [minor]');
  }
  return [lastVersion, semver.gt(version, lastVersion)];
}

const detectTag = async (packageName: string, version: string) => {
  const [prereleaseName,] = semver.prerelease(version) ?? [undefined]
  const isPreRelease = prereleaseName !== undefined;

  
  const [latestVersion, isLatestVersion] = await getLatestVersion(packageName, version);
  const [latestMinorVersion, isLatestMinorVersion] = await getLatestMinorVersion(packageName, version);
    
  
  // Every release requires a tag
  // Prereleases get their prelease name as tag
  // Latest major version gets latest
  // Anything else gets v1-lts, v2-lts, etc.
  
  if (isPreRelease) {
    return prereleaseName;
  } else if (isLatestVersion) {
    return 'latest';
  } else if (isLatestMinorVersion) {
    return `v${semver.major(version)}-lts`;
  } else {
    console.error(`You are trying to publish a version that is not the latest major or major.minor version`)
    console.error('Target version you want to publish: ', version)
    console.error('Latest version: ', latestVersion)
    console.error('Latest minor version: ', latestMinorVersion)
    process.exit(1);
  }
};

const writeFile = async (path: string, content: string, dryRun = true) => {
  if (dryRun) {
    console.log(`[DRY RUN] Writing file ${path}`);
    console.log(content);
    return;
  }
  return promises.writeFile(path, content);
};

export const writeDistTag = async (versionData: VersionData, dryRun = true) => {
  Object.entries(versionData).forEach(async ([packageName, versionData]) => {
    const PROJECT_DIR = path.join(process.env.NX_WORKSPACE_ROOT, 'packages', packageName);
    const NPM_RC = path.join(PROJECT_DIR, '.npmrc');
    if (!existsSync(PROJECT_DIR)) {
      throw new Error(`Package ${packageName} does not exist in dist`);
    }

    if (!versionData.newVersion) {
      throw new Error(`No new version specified for package ${packageName}`);
    }

    const tag = await detectTag(packageName, versionData.newVersion);

    if (!existsSync(NPM_RC)) {
      const ini = {
        'dist-tag': tag,
      }
      await writeFile(NPM_RC, stringify(ini), dryRun);
    } else {
      const ini = await promises.readFile(NPM_RC, 'utf-8');
      const parsed = parse(ini);
      parsed['dist-tag'] = tag;
      await writeFile(NPM_RC, stringify(parsed), dryRun);
    }

    console.log(`Tag for ${packageName} is ${tag}`);
  });
};