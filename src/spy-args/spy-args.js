import chai from 'chai';

/**
 * Adds methods to a spy to easily retrieve the paramaters it has been called with
 *
 * @example
 * const spy = chai.spy();
 *
 * spy(1, 2, 3);
 * spy('a', 'b', 'c');
 *
 * const args = spy.args(); // ['a', 'b', 'c']
 * const argsFor = spy.argsFor(0); // [1, 2, 3]
 *
 */
export default function () {
  const originalSpy = chai.spy;
  chai.spy = function (name, fn) {
    const spy = originalSpy(name, fn);

    /**
     * Returns array of arguments from spy's most recent call
     */
    spy.args = function () {
      const calls = this.__spy.calls;
      if (calls.length > 0) {
        return this.argsFor(calls.length - 1);
      } else {
        throw new Error('ERROR::spy.args: Spy has not been called');
      }
    };

    /**
     * Returns array of arguments from specified call on spy
     * @param callIdx {number}
     */
    spy.argsFor = function (callIdx) {
      const calls = this.__spy.calls;
      if (calls[callIdx]) {
        return calls[callIdx];
      } else {
        throw new Error('ERROR::spy.argsFor: Invalid call index for spy');
      }
    };

    return spy;
  };

  // Add all the property functions back on to chai.spy object
  // Code above will have removed things like chai.spy.on, chai.spy.sandbox, etc.
  for (const key in originalSpy) {
    chai.spy[key] = originalSpy[key];
  }
}
