import chai, { expect } from 'chai';
import calledWithObjectContaining from './called-with-object-containing';

chai.use(calledWithObjectContaining);

describe('Called With Object Containing', () => {
  let spy;

  beforeEach(() => {
    spy = chai.spy();
  });

  it('should assert method is being used on a spy', () => {
    const notASpy = {};
    expect(() => {
      expect(notASpy).to.not.have.been.called.with.objectContaining({ a: 'b' });
    }).to.throw('expected [object Object] to be a spy');
  });

  it('should throw useful error if spy has not been called', () => {
    expect(() => {
      expect(spy).not.to.have.been.called.with.objectContaining({ a: 'b' });
    }).to.throw('Spy has not been called');
  });

  context('Match object has single property', () => {
    context('Spy called with exact match', () => {
      it('should assert true', () => {
        spy({ a: 'b' });
        expect(spy).to.have.been.called.with.objectContaining({ a: 'b' });
      });
    });

    context('Spy called with object containing match', () => {
      it('should assert true', () => {
        spy({ a: 'b', c: 'd' });
        expect(spy).to.have.been.called.with.objectContaining({ a: 'b' });
      });
    });

    context('Spy called with nothing like a match', () => {
      it('should assert false', () => {
        spy('not even an object');
        expect(spy).not.to.have.been.called.with.objectContaining({ a: 'b' });
      });
    });

    context('Spy has been called with an object with same property but different value', () => {
      it('should assert false', () => {
        spy({ a: 'hmm not a match' });
        expect(spy).not.to.have.been.called.with.objectContaining({ a: 'b' });
      });
    });

  });

  context('Match object has multiple properties', () => {
    context('Spy called with exact match', () => {
      it('should assert true', () => {
        spy({ a: 'b', c: 'd' });
        expect(spy).to.have.been.called.with.objectContaining({ a: 'b', c: 'd' });
      });
    });

    context('Spy called with object containing match', () => {
      it('should assert true', () => {
        spy({ a: 'b', c: 'd', e: 'f' });
        expect(spy).to.have.been.called.with.objectContaining({ a: 'b', c: 'd' });
      });
    });

    context('Spy called with nothing like a match', () => {
      it('should assert false', () => {
        spy('not even an object');
        expect(spy).not.to.have.been.called.with.objectContaining({ a: 'b', c: 'd' });
      });
    });

    context('Spy has been called with an object with a partial match', () => {
      it('should assert false', () => {
        spy({a: 'b'});
        expect(spy).not.to.have.been.called.with.objectContaining({a: 'b', c: 'd'});
      });

      context('and one property which matches but whose value is different', () => {
        it('should assert false', () => {
          spy({ a: 'b', c: 'hmm not a match' });
          expect(spy).not.to.have.been.called.with.objectContaining({ a: 'b', c: 'd' });
        });
      });
    });
  });
});
