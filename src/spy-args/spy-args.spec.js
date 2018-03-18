import chai, { expect } from 'chai';
import spyArgs from './spy-args';

describe('Spy Args', () => {
  let originalSpy;
  let spy;

  beforeEach(() => {
    originalSpy = chai.spy;
    spyArgs();
    spy = chai.spy();
  });

  afterEach(() => {
    chai.spy = originalSpy;
  });

  it('leaves chai.spy methods intact', () => {
    expect(chai.spy, 'chai.spy.on method should still be available').to.have.property('on');
    expect(chai.spy, 'chai.spy.sandbox method should still be available').to.have.property('sandbox');
    expect(chai.spy, 'chai.spy.interface method should still be available').to.have.property('interface');
    expect(chai.spy, 'chai.spy.restore method should still be available').to.have.property('restore');
    expect(chai.spy, 'chai.spy.returns method should still be available').to.have.property('returns');
  });

  describe('args', () => {
    it('returns argument array when called with single argument', () => {
      spy('a');
      expect(spy.args()).to.eql(['a'],
        'should return arg array when spy has been called once');
      spy('b');
      expect(spy.args()).to.eql(['b'],
        'should return most recent arg array when spy has been called more than once');
    });

    it('returns argument array when called with multiple arguments', () => {
      spy('a', 'b', 'c');
      expect(spy.args()).to.eql(['a', 'b', 'c'],
        'should return arg array when spy has been called once');
      spy('d', 'e', 'f');
      expect(spy.args()).to.eql(['d', 'e', 'f'],
        'should return most recent arg array when spy has been called more than once');
    });

    it('throws useful error when no calls have been made', () => {
      expect(() => spy.args()).to.throw('Spy has not been called')
    })
  });

  describe('argsFor', () => {
    it('returns arguments array for specified call index', () => {
      spy('a');
      spy(1, 2, 3);
      spy(['b', 'c', 'd']);
      expect(spy.argsFor(0)).to.eql(['a'],
        'should return argument array for call index 0');
      expect(spy.argsFor(1)).to.eql([1, 2, 3],
        'should return argument array for call index 1');
      expect(spy.argsFor(2)).to.eql([['b', 'c', 'd']],
        'should return argument array for call index 2');
    });

    it('throws useful error if passed an invalid call index', () => {
      expect(() => spy.argsFor(0)).to.throw('Invalid call index for spy');
      spy('a');
      expect(() => spy.argsFor(1)).to.throw('Invalid call index for spy');
    });
  });
});
