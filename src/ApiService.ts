export class ApiService {
  static getUsers(): Promise<string[]> {
    return new Promise((res) => {
      setTimeout(() => res(["ivan", "ola"]), 1000);
    });
  }
}
