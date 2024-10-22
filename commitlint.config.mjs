export default {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'body-max-line-length': [2, 'always', '500'],
  },
};
