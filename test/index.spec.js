import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
  signInWithPopup,
  setDoc,
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  getDoc,
  deleteDoc,
} from '../src/firebase/init';
import {
  loginFirebase,
  registerFirebase,
  launchGoogleLogin,
  savePost,
  getPosts,
  updateNumberOfLikes,
  deletePost,
  updatePost,
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
  setDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(),
  exists: jest.fn(),
  deleteDoc: jest.fn(),
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

// Tets for the savePost function

describe('savePost', () => {
  const post = {
    post: 'Prueba de post',
    timestamp: '10:30',
    likes: [1, 2, 3],
  };

  it('should be a function', () => {
    expect(typeof savePost).toBe('function');
  });

  it('should call setDoc', async () => {
    await savePost();
    expect(setDoc).toHaveBeenCalled();
  });

  it('should call setDoc with parameters', async () => {
    await savePost(post);
    expect(setDoc).toHaveBeenCalledWith(doc(collection(), 'posts'), post);
  });
});

// Test for the getPosts function

describe('getPosts', () => {
  it('should be a function', () => {
    expect(typeof getPosts).toBe('function');
  });

  it('should call getPosts', async () => {
    await getPosts();
    expect(getDocs).toHaveBeenCalled();
  });

  it('should call getPosts with parameters', async () => {
    await getPosts();
    expect(getDocs).toHaveBeenCalledWith(query(collection(), orderBy('timestamp', 'desc')));
  });
});

// Tests for the updateNumberOfLikes function

describe('updateNumberOfLikes', () => {
  it('should be a function', () => {
    expect(typeof updateNumberOfLikes).toBe('function');
  });

  // it('should call updateNumberOfLikes', async () => {
  //   await updateNumberOfLikes();
  //   expect(updateDoc).toHaveBeenCalled();
  // });

  // it('should call updateNumberOfLikes with parameters', async () => {
  //   await updateNumberOfLikes();
  //   expect(updateDoc).toHaveBeenCalledWith(doc(collection(), 'posts'), post);
  // });
});

// Test for the deletePost function

describe('deletePost', () => {
  const db = 'TEST';
  const idPost = '123456789';

  it('should be a function', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('should call deletePost', async () => {
    await deletePost();
    expect(deleteDoc).toHaveBeenCalled();
  });

  it('should call deletePost with parameters', async () => {
    await deletePost(idPost);
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'posts', idPost));
  });
});

// Test for the updatePost function

describe('updatePost', () => {
  it('should be a function', () => {
    expect(typeof updatePost).toBe('function');
  });
});
