import { Assertion } from 'chai';
import _ from 'lodash';

export default function calledWithObjectContaining() {
    Assertion.addMethod('objectContaining', objectContaining);

    function objectContaining(matchObject) {
        new Assertion(this._obj).to.be.spy;

        const spy = this._obj.__spy;
        const calls = spy.calls;


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
