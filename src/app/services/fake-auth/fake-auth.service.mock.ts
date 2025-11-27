export class FakeAuthServiceMock {
  login = jest.fn();
  logout = jest.fn();
  isLoggedIn = jest.fn();
}
