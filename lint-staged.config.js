/* eslint-disable @typescript-eslint/explicit-function-return-type */
// eslint-disable-next-line no-undef
module.exports = {
  // this will check Typescript files
  // '**/*.(ts|tsx)': () => 'tsc --noEmit',

  // This will lint and format TypeScript and                                             //JavaScript files
  'src/**/*.(ts|tsx|js)': (filenames) => [
    `eslint --fix ${filenames.join(' ')} --max-warnings=0`,
    `prettier --write ${filenames.join(' ')}`
  ],

  // this will Format MarkDown and JSON
  'src/**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`
};
