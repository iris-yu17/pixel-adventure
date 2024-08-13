function throttle(fn: Function, t: number) {
  let timerId: number | null = null;

  return function (arg?: any) {
    if (!timerId) {
      fn(arg);
      timerId = setTimeout(() => {
        timerId = null;
      }, t);
      ;
    }
  };
};

export default throttle;