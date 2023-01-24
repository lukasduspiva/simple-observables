import { createObservable } from '../createObservable';

describe('createObservable', () => {
  it('should be defined', () => {
    expect(createObservable).toBeDefined();
  });
  it('should be function', () => {
    expect(typeof createObservable).toBe('function');
  });
  it('should return array when called', () => {
    expect(Array.isArray(createObservable())).toBe(true);
  });
  describe('when called with no argument', () => {
    describe('when focusing on `getValue` (first destructured value)', () => {
      it('should be a function', () => {
        const [getValue] = createObservable();
        expect(typeof getValue).toBe('function');
      });
      it('should return `undefined` when called', () => {
        const [getValue] = createObservable();
        expect(getValue()).toBe(undefined);
      });
    });
    describe('when focusing on `setValue` (second destructured value)', () => {
      it('should be a function', () => {
        const [_getValue, setValue] = createObservable();
        expect(typeof setValue).toBe('function');
      });
      it('when called with a value, the value should be then returned by `getValue`', () => {
        const [getValue, setValue] = createObservable();
        setValue(':-)');
        expect(getValue()).toBe(':-)');
      });
    });
    describe('when focusing on `subscribe` (third destructured value)', () => {
      it('should be a function', () => {
        const [_getValue, _setValue, subscribe] = createObservable();
        expect(typeof subscribe).toBe('function');
      });
      describe('when called with a "observer" function', () => {
        it('the function should be invoked by argument supplied to `setValue` once it is called', () => {
          const observer = jest.fn();
          const [_getValue, setValue, subscribe] = createObservable();
          subscribe(observer);
          setValue(':-P');
          expect(observer.mock.calls.length).toBe(1);
          expect(observer.mock.calls[0][0]).toBe(':-P');
        });
      });
    });
    describe('when focusing on `unsubscribe` (fourth destructured value)', () => {
      it('should be a function', () => {
        const [_getValue, _setValue, _subscribe, unsubscribe] =
          createObservable();
        expect(typeof unsubscribe).toBe('function');
      });
      it('should remove the effect of subscription, so once `setValue` is called it no longer invokes observer', () => {
        const observer = jest.fn();
        const [getValue, setValue, subscribe, unsubscribe] = createObservable();
        subscribe(observer);
        setValue(':-X');
        unsubscribe(observer);
        setValue(':-S');
        expect(getValue()).toBe(':-S');
        expect(observer.mock.calls.length).toBe(1);
        expect(observer.mock.calls[0][0]).toBe(':-X');
      });
    });
  });
  describe('when called with a argument', () => {
    describe('when focusing on `getValue` (first destructured value)', () => {
      it('should return the passed argument', () => {
        const [getValue] = createObservable(':-O');
        expect(getValue()).toBe(':-O');
      });
    });
  });
});
