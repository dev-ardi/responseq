export default class ResponseQ<T> {
  private q: (T | Error)[] = [];
  private waiting: ((t: T | Error) => void) | null = null;
  
   
  public push(fn: () => Promise<T>): void {
    const settle = (t: T | Error) => {
      if (this.waiting) {
        this.waiting(t);
        this.waiting = null;
      } else {
        this.q.push(t);
      }
    }

    fn()
      .then(settle)
      .catch(settle);
  }

  // Blocks if the there is not a settled promise. If there are no promises
  // it will block indefinitely.
  public async pop(): Promise<T | Error> {
    if (this.q.length === 0) {
      return new Promise((resolve) => {
        this.waiting = resolve;
      });
    }
    return this.q.shift() as T | Error;
  }
}
