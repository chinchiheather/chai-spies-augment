import chai from 'chai';

export default function () {
  const originalSpy = chai.spy;
  chai.spy = function (name, fn) {
    const spy = originalSpy(name, fn);

    /**
     * Returns array of arguments from spy's last call
     */
    spy.args = function () {
      return this.argsFor(this.__spy.calls.length - 1);
    };

    /**
     * Returns array of arguments from specified call on spy
     * @param callIdx {number}
     */
    spy.argsFor = function (callIdx) {
      return this.__spy.calls[callIdx][0];
    };

    return spy;
  };
}
