import { AdminUser } from '../types/admin';

const AUTH_STORAGE_KEY = 'supershushi_auth_session_v1';

const MASTER_USER: AdminUser = {
  id: 'usr-hiroshi-master',
  name: 'Chef Hiroshi',
  email: 'chef.curadoria@supershushi.bar',
  role: 'Master Admin',
  title: 'Omakase Architect & Curador',
  avatarLetter: 'H',
  has2FA: true,
};

// Acceptable master credentials
const VALID_CREDENTIALS = [
  {
    email: 'chef.curadoria@supershushi.bar',
    password: 'OmakaseMaster2025#',
  },
  {
    email: 'gestao@supershushi.bar',
    password: 'OmakaseMaster2025#',
  },
  {
    email: 'admin@supershushi.bar',
    password: 'OmakaseMaster2025#',
  },
];

export interface AuthSession {
  token: string;
  user: AdminUser;
  expiresAt: number;
}

class AuthService {
  public isAuthenticated(): boolean {
    const session = this.getSession();
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      this.logout();
      return false;
    }
    return true;
  }

  public getSession(): AuthSession | null {
    try {
      const local = localStorage.getItem(AUTH_STORAGE_KEY);
      if (local) return JSON.parse(local);

      const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (session) return JSON.parse(session);

      return null;
    } catch {
      return null;
    }
  }

  public getCurrentUser(): AdminUser | null {
    const session = this.getSession();
    return session ? session.user : null;
  }

  public login(
    email: string,
    pass: string,
    rememberMe = false
  ): { success: boolean; error?: string; user?: AdminUser } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    const isValid = VALID_CREDENTIALS.some(
      (c) => c.email.toLowerCase() === cleanEmail && c.password === cleanPass
    );

    if (!isValid) {
      // Special friendly hint if user tries close variation
      return {
        success: false,
        error: 'Credenciais inválidas. Verifique o e-mail corporativo e a senha cadastrada.',
      };
    }

    const duration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    const session: AuthSession = {
      token: `jwt-dragon-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      user: MASTER_USER,
      expiresAt: Date.now() + duration,
    };

    if (rememberMe) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }

    return { success: true, user: MASTER_USER };
  }

  public logout(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  }
}

export const authService = new AuthService();
