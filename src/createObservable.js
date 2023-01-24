export function createObservable(initialValue) {
  let value = initialValue;
  let subscriptions = [];

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
    subscriptions.forEach((subscription) => subscription(newValue));
  }

  function subscribe(subscription) {
    subscriptions = [...subscriptions, subscription];
  }

  function unsubscribe(subscription) {
    subscriptions = subscriptions.filter(
      (testedSubscription) => testedSubscription !== subscription,
    );
  }

  return [getValue, setValue, subscribe, unsubscribe];
}
