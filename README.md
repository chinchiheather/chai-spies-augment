# chai-spies-augment
Additions to the [chai-spies](https://github.com/chaijs/chai-spies) library

Adds:
 * Ability to easily inspect a the parameters a spy has been called with
 * Ability to check if a spy was called with a partial object

## Install
```bash
npm install --save-dev chai-spies-augment
```

Then in your test setup file where you are loading chai spies
```js
import chaiSpies from 'chai-spies';
import chaiSpiesAugment from 'chai-spies-augment';
...
chai.use(chaiSpies);
chai.use(chaiSpiesAugment);
```

## Usage
```js
const spy = chai.spy();
...
const args = spy.args(); // gets the arguments from the most recent call to the spy
const argsFor = spy.argsFor(2); // gets the arguments from a particular call to the spy
```

```js
const spy = chai.spy();
...
expect(spy).to.have.been.called.with.objectContaining({ a: 'b' });
```
