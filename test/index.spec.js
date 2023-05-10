import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
  signInWithPopup,
} from '../src/firebase/init';
import {
  loginFirebase,
  registerFirebase,
  launchGoogleLogin,
} from '../src/firebase/auth.js';

jest.mock('../src/firebase/init.js', () => ({
  auth: jest.fn(() => ({ auth: 'TEST' })),
  provider: jest.fn(() => ({ provider: 'TEST' })),
  signInWithEmailAndPassword: jest.fn((authentication, email, password) => {
    if (!email || !password) {
      throw new Error('ERROR');
    }
    Promise.resolve({ user: 'admin' });
  }),
  createUserWithEmailAndPassword: jest.fn((authentication, email, password) => {
    if (!email || !password) {
      throw new Error('ERROR');
    }
    Promise.resolve({ user: 'admin' });
  }),
  signInWithPopup: jest.fn((authentication, provider) => {
    if (!provider) {
      throw new Error('ERROR');
    }
    Promise.resolve({ user: 'admin' });
  }),
}));

describe('Test for the login function', () => {
  const email = 'admin@test.com';
  const password = '123456789';
  it('should call signInWithEmailAndPassword', async () => {
    await loginFirebase(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call signInWithEmailAndPassword with parameters', async () => {
    await loginFirebase(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('Test for the create user function', () => {
  const email = 'admin@test.com';
  const password = '123456789';

  it('should call createUserWithEmailAndPassword', async () => {
    await registerFirebase(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call createUserWithEmailAndPassword with parameters', async () => {
    await registerFirebase(email, password);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

// testing function launchGoogleLogin

describe('Test for the login with google function', () => {
  it('should call launchGoogleLogin', async () => {
    await launchGoogleLogin();
    expect(signInWithPopup).toHaveBeenCalled();
  });
});
