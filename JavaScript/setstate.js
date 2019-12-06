function useState(defaultState) {
  const state = defaultState;
  const setState = newState => (state = newState);
  return [state, setState];
}
