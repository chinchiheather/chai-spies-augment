# chai-spies-augment
Additions to the [chai-spies](https://github.com/chaijs/chai-spies) library

Adds:
 * Ability to easily inspect a the parameters a spy has been called with
 * Ability to check if a spy was called with a partial object

## Usage
```
const spy = chai.spy();
...
const args = spy.args(); // gets the arguments from the most recent call to the spy
const argsFor = spy.argsFor(2); // gets the arguments from a particular call to the spy
```

```
const spy = chai.spy();
...
expect(spy).to.have.been.called.with.objectContaining({ a: 'b' });
```
