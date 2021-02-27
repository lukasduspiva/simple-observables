declare module 'simple-observables' {
  type Observer<T> = (value: T) => void;

  type CreateObservableGet<T> = () => T;
  type CreateObservableSet<T> = (newValue: T) => void;
  type CreateObservableSubscribe<T> = (observer: Observer<T>) => void;
  type CreateObservableUnsubscribe<T> = (observer: Observer<T>) => void;

  function createObservable<T>(
    initialValue: T,
  ): [
    CreateObservableGet<T>,
    CreateObservableSet<T>,
    CreateObservableSubscribe<T>,
    CreateObservableUnsubscribe<T>,
  ];
}
