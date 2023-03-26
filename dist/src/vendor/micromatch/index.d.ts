export = micromatch;
/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} `list` List of strings to match.
 * @param {String|Array<string>} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */
declare function micromatch(list: string | Array<string>, patterns: string | Array<string>, options: Object): any[];
declare namespace micromatch {
    export { micromatch as match };
    /**
     * Returns a matcher function from the given glob `pattern` and `options`.
     * The returned function takes a string to match as its only argument and returns
     * true if the string is a match.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.matcher(pattern[, options]);
     *
     * const isMatch = mm.matcher('*.!(*a)');
     * console.log(isMatch('a.a')); //=> false
     * console.log(isMatch('a.b')); //=> true
     * ```
     * @param {String} `pattern` Glob pattern
     * @param {Object} `options`
     * @return {Function} Returns a matcher function.
     * @api public
     */
    export function matcher(pattern: string, options: Object): Function;
    /**
     * Returns true if **any** of the given glob `patterns` match the specified `string`.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.isMatch(string, patterns[, options]);
     *
     * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
     * console.log(mm.isMatch('a.a', 'b.*')); //=> false
     * ```
     * @param {String} `str` The string to test.
     * @param {String|Array} `patterns` One or more glob patterns to use for matching.
     * @param {Object} `[options]` See available [options](#options).
     * @return {Boolean} Returns true if any patterns match `str`
     * @api public
     */
    export function isMatch(str: string, patterns: string | any[], options: any): boolean;
    import any = isMatch;
    export { any };
    /**
     * Returns a list of strings that _**do not match any**_ of the given `patterns`.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.not(list, patterns[, options]);
     *
     * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
     * //=> ['b.b', 'c.c']
     * ```
     * @param {Array} `list` Array of strings to match.
     * @param {String|Array} `patterns` One or more glob pattern to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Array} Returns an array of strings that **do not match** the given patterns.
     * @api public
     */
    export function not(list: any[], patterns: string | any[], options?: Object): any[];
    /**
     * Returns true if the given `string` contains the given pattern. Similar
     * to [.isMatch](#isMatch) but the pattern can match any part of the string.
     *
     * ```js
     * var mm = require('micromatch');
     * // mm.contains(string, pattern[, options]);
     *
     * console.log(mm.contains('aa/bb/cc', '*b'));
     * //=> true
     * console.log(mm.contains('aa/bb/cc', '*d'));
     * //=> false
     * ```
     * @param {String} `str` The string to match.
     * @param {String|Array} `patterns` Glob pattern to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Boolean} Returns true if any of the patterns matches any part of `str`.
     * @api public
     */
    export function contains(str: string, pattern: any, options: Object): boolean;
    /**
     * Filter the keys of the given object with the given `glob` pattern
     * and `options`. Does not attempt to match nested keys. If you need this feature,
     * use [glob-object][] instead.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.matchKeys(object, patterns[, options]);
     *
     * const obj = { aa: 'a', ab: 'b', ac: 'c' };
     * console.log(mm.matchKeys(obj, '*b'));
     * //=> { ab: 'b' }
     * ```
     * @param {Object} `object` The object with keys to filter.
     * @param {String|Array} `patterns` One or more glob patterns to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Object} Returns an object with only keys that match the given patterns.
     * @api public
     */
    export function matchKeys(obj: any, patterns: string | any[], options: Object): Object;
    /**
     * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.some(list, patterns[, options]);
     *
     * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
     * // true
     * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
     * // false
     * ```
     * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
     * @param {String|Array} `patterns` One or more glob patterns to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Boolean} Returns true if any `patterns` matches any of the strings in `list`
     * @api public
     */
    export function some(list: string | any[], patterns: string | any[], options: Object): boolean;
    /**
     * Returns true if every string in the given `list` matches
     * any of the given glob `patterns`.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.every(list, patterns[, options]);
     *
     * console.log(mm.every('foo.js', ['foo.js']));
     * // true
     * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
     * // true
     * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
     * // false
     * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
     * // false
     * ```
     * @param {String|Array} `list` The string or array of strings to test.
     * @param {String|Array} `patterns` One or more glob patterns to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Boolean} Returns true if all `patterns` matches all of the strings in `list`
     * @api public
     */
    export function every(list: string | any[], patterns: string | any[], options: Object): boolean;
    /**
     * Returns true if **all** of the given `patterns` match
     * the specified string.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.all(string, patterns[, options]);
     *
     * console.log(mm.all('foo.js', ['foo.js']));
     * // true
     *
     * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
     * // false
     *
     * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
     * // true
     *
     * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
     * // true
     * ```
     * @param {String|Array} `str` The string to test.
     * @param {String|Array} `patterns` One or more glob patterns to use for matching.
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Boolean} Returns true if any patterns match `str`
     * @api public
     */
    export function all(str: string | any[], patterns: string | any[], options: Object): boolean;
    /**
     * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.capture(pattern, string[, options]);
     *
     * console.log(mm.capture('test/*.js', 'test/foo.js'));
     * //=> ['foo']
     * console.log(mm.capture('test/*.js', 'foo/bar.css'));
     * //=> null
     * ```
     * @param {String} `glob` Glob pattern to use for matching.
     * @param {String} `input` String to match
     * @param {Object} `options` See available [options](#options) for changing how matches are performed
     * @return {Array|null} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
     * @api public
     */
    export function capture(glob: string, input: string, options: Object): any[] | null;
    /**
     * Create a regular expression from the given glob `pattern`.
     *
     * ```js
     * const mm = require('micromatch');
     * // mm.makeRe(pattern[, options]);
     *
     * console.log(mm.makeRe('*.js'));
     * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
     * ```
     * @param {String} `pattern` A glob pattern to convert to regex.
     * @param {Object} `options`
     * @return {RegExp} Returns a regex created from the given pattern.
     * @api public
     */
    export function makeRe(...args: any[]): RegExp;
    /**
     * Scan a glob pattern to separate the pattern into segments. Used
     * by the [split](#split) method.
     *
     * ```js
     * const mm = require('micromatch');
     * const state = mm.scan(pattern[, options]);
     * ```
     * @param {String} `pattern`
     * @param {Object} `options`
     * @return {Object} Returns an object with
     * @api public
     */
    export function scan(...args: any[]): Object;
    /**
     * Parse a glob pattern to create the source string for a regular
     * expression.
     *
     * ```js
     * const mm = require('micromatch');
     * const state = mm(pattern[, options]);
     * ```
     * @param {String} `glob`
     * @param {Object} `options`
     * @return {Object} Returns an object with useful properties and output to be used as regex source string.
     * @api public
     */
    export function parse(patterns: any, options: Object): Object;
    /**
     * Process the given brace `pattern`.
     *
     * ```js
     * const { braces } = require('micromatch');
     * console.log(braces('foo/{a,b,c}/bar'));
     * //=> [ 'foo/(a|b|c)/bar' ]
     *
     * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
     * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
     * ```
     * @param {String} `pattern` String with brace pattern to process.
     * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
     * @return {Array}
     * @api public
     */
    export function braces(pattern: string, options: Object): any[];
    /**
     * Expand braces
     */
    export function braceExpand(pattern: any, options: any): any[];
}
