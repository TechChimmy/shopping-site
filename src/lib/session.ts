// src/lib/session.ts
type SessionData = {
  user: any;
  expiresAt: number;
};

const SESSION_KEY = 'auth_session';

export const saveSession = (user: any, expiresInHours = 8) => {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  const sessionData: SessionData = { user, expiresAt };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = (): SessionData | null => {
  const session = sessionStorage.getItem(SESSION_KEY);
  if (!session) return null;
  
  const sessionData = JSON.parse(session) as SessionData;
  if (Date.now() > sessionData.expiresAt) {
    clearSession();
    return null;
  }
  
  return sessionData;
};

export const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};