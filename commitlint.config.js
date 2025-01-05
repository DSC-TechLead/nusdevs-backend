export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'chore', 'style', 'docs', 'test']],
    'subject-case': [2, 'always', ['lower-case']],
    'header-max-length': [2, 'always', 72],
  },
};
