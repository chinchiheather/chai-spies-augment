import { Assertion } from 'chai';
import _ from 'lodash';

/**
 * Adds option to check if a spy was called with a partial object
 * This will check if any paramater, in any of the spy's calls, is an object containing the passed in value
 *
 * @example
 * const spy = chai.spy();
 *
 * spy({ a: 'b', c: 'd' });
 * spy(1, 'a', { b: 'c' });
 *
 * expect(spy).to.have.been.called.with.objectContaining({ a: 'b' }); // true
 * expect(spy).to.have.been.called.with.objectContaining({ b: 'c' }); // true
 *
 */
export default function () {
  Assertion.addMethod('objectContaining', objectContaining);

  function objectContaining(matchObject) {
    new Assertion(this._obj).to.be.spy;

    const spy = this._obj.__spy;
    const calls = spy.calls;
    if (calls.length === 0) {
      throw Error('ERROR::objectContaining: Spy has not been called');
    }

    const callsContainObject = calls.some(
      args => args.some(
        arg => argContainsObject(arg, matchObject)));

    this.assert(
      callsContainObject === true,
      `expected spy to have been called with object containing #{exp}
       actual calls: #{act}`,
      'expected spy not to have been called with object containing #{exp}',
      matchObject,
      JSON.stringify(calls)
    );
  }

  function argContainsObject(arg, matchObject) {
    const matchTotal = Object.keys(matchObject).length;
    let matches = 0;

    if (typeof arg === 'object') {
      for (const key in matchObject) {
        const value = matchObject[key];
        if (Array.isArray(value) || typeof value === 'object') {
          if (_.isEqual(value, arg[key])) {
            matches++;
          }
        } else if (arg[key] === value) {
          matches++;
        }
      }
    }

    return matches === matchTotal;
  }
}
