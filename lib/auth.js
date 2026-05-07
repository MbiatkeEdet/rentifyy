const USERS_KEY = 'rentify_users';
const SESSION_KEY = 'rentify_session';

const isBrowser = typeof window !== 'undefined';

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const getUsers = () => {
  if (!isBrowser) return [];
  const raw = localStorage.getItem(USERS_KEY);
  return safeParse(raw) || [];
};

export const userExists = (email) => {
  const users = getUsers();
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const createUser = ({ name, email, password, userType = 'seeker' }) => {
  if (!isBrowser) return null;
  const users = getUsers();
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    userType,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const authenticateUser = (email, password) => {
  if (!isBrowser) return null;
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user || null;
};

export const getCurrentUser = () => {
  if (!isBrowser) return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return safeParse(raw);
};

export const setCurrentUser = (user) => {
  if (!isBrowser) return null;
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
};

export const clearCurrentUser = () => {
  if (!isBrowser) return;
  localStorage.removeItem(SESSION_KEY);
};
