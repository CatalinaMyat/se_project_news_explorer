const FAKE_TOKEN_KEY = "newsExplorer_fake_token";
const FAKE_USER_KEY = "newsExplorer_fake_user";

export function register({ email, password, name }) {
  return new Promise((resolve) => {
    const user = {
      _id: `fake-user-${Date.now()}`,
      name,
      email,
      password,
    };

    try {
      window.localStorage.setItem(FAKE_USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn("Could not save fake user to localStorage:", e);
    }

    resolve(user);
  });
}

export function authorize({ email, password }) {
  return new Promise((resolve, reject) => {
    const storedUser = window.localStorage.getItem(FAKE_USER_KEY);

    if (!storedUser) {
      reject(new Error("No registered user found. Please sign up first."));
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      reject(new Error("Failed to parse fake user from localStorage."));
      return;
    }

    if (user.email !== email || user.password !== password) {
      reject(new Error("Invalid email or password."));
      return;
    }

    const token =
      window.localStorage.getItem(FAKE_TOKEN_KEY) || `fake-token-${Date.now()}`;

    try {
      window.localStorage.setItem(FAKE_TOKEN_KEY, token);
    } catch (e) {
      console.warn("Could not save fake token to localStorage:", e);
    }

    resolve({ token, user });
  });
}

export function checkToken(tokenFromApp) {
  return new Promise((resolve, reject) => {
    const storedToken =
      tokenFromApp || window.localStorage.getItem(FAKE_TOKEN_KEY);
    const storedUser = window.localStorage.getItem(FAKE_USER_KEY);

    if (!storedToken || !storedUser) {
      reject(new Error("No valid fake token/user found."));
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      resolve(user);
    } catch (e) {
      reject(new Error("Failed to parse fake user from localStorage."));
    }
  });
}

export function fakeLogout() {
  try {
    window.localStorage.removeItem(FAKE_TOKEN_KEY);
  } catch (e) {
    console.warn("Could not clear fake auth data:", e);
  }
}
