import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);
const DEMO_TOKEN = 'local-demo-token';

const defaultUser = {
  name: 'VisionTrust Admin',
  role: 'Security Analyst',
  email: 'admin@visiontrust.ai',
};

const seededUsers = [
  {
    id: 'demo-admin',
    name: 'VisionTrust Admin',
    email: 'admin@visiontrust.ai',
    password: 'admin123',
    role: 'Security Analyst',
  },
];

function getStoredSession() {
  if (typeof window === 'undefined') return { user: null, token: null };

  try {
    const storedUser = localStorage.getItem('visiontrust-user');
    const storedToken = localStorage.getItem('visiontrust-token');

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
    };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const savedSession = getStoredSession();
  const [user, setUser] = useState(savedSession.user);
  const [token, setToken] = useState(savedSession.token);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(savedSession.token));
  const [registeredUsers, setRegisteredUsers] = useState(seededUsers);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('visiontrust-theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = themeMode;

    if (typeof window !== 'undefined') {
      localStorage.setItem('visiontrust-theme', themeMode);
    }
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (user) {
      localStorage.setItem('visiontrust-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('visiontrust-user');
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (token) {
      localStorage.setItem('visiontrust-token', token);
    } else {
      localStorage.removeItem('visiontrust-token');
    }
  }, [token]);

  useEffect(() => {
    const restoreSession = async () => {
      if (!token || token === DEMO_TOKEN || typeof window === 'undefined') return;

      try {
        const { data } = await api.get('/auth/me');
        const nextUser = data?.data || user;

        if (nextUser) {
          setUser({
            name: nextUser.name,
            role: nextUser.role || 'Verified Analyst',
            email: nextUser.email,
          });
          setIsAuthenticated(true);
        }
      } catch {
        logout();
      }
    };

    restoreSession();
  }, [token]);

  const applySession = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    setIsAuthenticated(Boolean(nextToken));
  };

  const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    if (!normalizedName || !normalizedEmail || !password) {
      throw new Error('Please complete all fields.');
    }

    const existingUser = registeredUsers.find((entry) => entry.email.toLowerCase() === normalizedEmail);
    if (existingUser) {
      throw new Error('This email is already registered. Please sign in instead.');
    }

    try {
      const { data } = await api.post('/auth/register', {
        name: normalizedName,
        email: normalizedEmail,
        password,
      });

      const payload = data?.data;
      const nextUser = payload?.user || {
        name: normalizedName,
        email: normalizedEmail,
        role: 'Verified Analyst',
      };
      const nextToken = payload?.token || null;

      applySession(
        {
          name: nextUser.name,
          role: nextUser.role || 'Verified Analyst',
          email: nextUser.email,
        },
        nextToken
      );

      return {
        name: nextUser.name,
        role: nextUser.role || 'Verified Analyst',
        email: nextUser.email,
      };
    } catch (error) {
      const newUser = {
        id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
        name: normalizedName,
        email: normalizedEmail,
        password,
        role: 'Verified Analyst',
      };

      setRegisteredUsers((current) => [...current, newUser]);
      applySession({ name: normalizedName, role: 'Verified Analyst', email: normalizedEmail }, DEMO_TOKEN);
      return { name: normalizedName, role: 'Verified Analyst', email: normalizedEmail };
    }
  };

  const login = async (credentials = {}) => {
    const email = (credentials.email || '').trim().toLowerCase();
    const password = credentials.password || '';

    try {
      const { data } = await api.post('/auth/login', { email, password });
      const payload = data?.data;
      const nextUser = payload?.user || {
        name: defaultUser.name,
        role: defaultUser.role,
        email,
      };
      const nextToken = payload?.token || null;

      applySession(
        {
          name: nextUser.name,
          role: nextUser.role || 'Security Analyst',
          email: nextUser.email,
        },
        nextToken
      );

      return {
        name: nextUser.name,
        role: nextUser.role || 'Security Analyst',
        email: nextUser.email,
      };
    } catch (error) {
      const foundUser = registeredUsers.find(
        (entry) => entry.email.toLowerCase() === email && entry.password === password
      );

      if (!foundUser) {
        const builtUser =
          email === defaultUser.email.toLowerCase() && password === 'admin123'
            ? { ...defaultUser }
            : null;

        if (!builtUser) {
          throw new Error(error.message || 'Invalid email or password.');
        }

        applySession({ ...builtUser }, DEMO_TOKEN);
        return builtUser;
      }

      applySession({ name: foundUser.name, role: foundUser.role, email: foundUser.email }, DEMO_TOKEN);
      return { name: foundUser.name, role: foundUser.role, email: foundUser.email };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      token,
      login,
      logout,
      register,
      setUser,
      registeredUsers,
      themeMode,
      setThemeMode,
    }),
    [user, isAuthenticated, token, registeredUsers, themeMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
