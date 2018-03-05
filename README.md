# chai-spies-augment
Additions to the [chai-spies](https://github.com/chaijs/chai-spies) library

Adds:
 * Ability to easily inspect the parameters a spy has been called with
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
### Accessing spy call parameters
```js
const spy = chai.spy();
 
spy(1, 2, 3);
spy('a', 'b', 'c');
 
const args = spy.args(); // ['a', 'b', 'c']
const argsFor = spy.argsFor(0); // [1, 2, 3] 
```
### Checking for partial object

```js
const spy = chai.spy();
 
spy({ a: 'b', c: 'd' });
spy(1, 'a', { b: 'c' });
 
expect(spy).to.have.been.called.with.objectContaining({ a: 'b' }); // true
expect(spy).to.have.been.called.with.objectContaining({ b: 'c' }); // true
```
