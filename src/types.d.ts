export type Options = {
  /**
   * Represents the root element font size or returns the root element font size based on the input parameter
   * @default 37.5
   */
  rootValue: number;
  /**
   * The decimal numbers to allow the REM units to grow to.
   * @default 5
   */
  unitPrecision: number;
  /**
   * The selectors to ignore and leave as px.
   * - If value is string, it checks to see if selector contains the string.
   *    - `['body']` will match `.body-class`
   * - If value is regexp, it checks to see if the selector matches the regexp.
   *    - `[/^body$/]` will match `body` but not `.body`
   * @default []
   */
  selectorBlackList: (string | RegExp)[];
  /**
   * The properties that can change from px to rem.
   * - Values need to be exact matches.
   * - Use wildcard `*` to enable all properties. Example: `['*']`
   * - Use `*` at the start or end of a word. (`['*position*']` will match `background-position-y`)
   * - Use `!` to not match a property. Example: `['*', '!letter-spacing']`
   * - Combine the "not" prefix with the other prefixes. Example: `['*', '!font*']`
   * @default ["font", "font-size", "line-height", "letter-spacing"]
   */
  propList: string[];
  /**
   * Replaces rules containing rems instead of adding fallbacks.
   * @default true
   */
  replace: boolean;
  /**
   * Allow px to be converted in media queries.
   * @default false
   */
  mediaQuery: false;
  /**
   * Set the minimum pixel value to replace.
   * @default 0
   */
  minPixelValue: number;
  /**
   * The file path to ignore and leave as px.
   * - If value is string, it checks to see if file path contains the string.
   *    - `'exclude'` will match `\project\postcss-pxtorem\exclude\path`
   * - If value is regexp, it checks to see if file path matches the regexp.
   *    - `/exclude/i` will match `\project\postcss-pxtorem\exclude\path`
   * - If value is function, you can use exclude function to return a true and the file will be ignored.
   *    - the callback will pass the file path as a parameter, it should returns a Boolean result.
   *    - `function (file) { return file.indexOf('exclude') !== -1; }`
   * @default null
   */
  exclude: string | Regexp | ((file: string) => boolean) | null;
};

export type UserOptions = Partial<Options>;
