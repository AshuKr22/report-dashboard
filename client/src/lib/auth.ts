import { User } from "@/types";

// Mock users for development
const mockUsers: User[] = [
  { id: "1", role: "viewer", name: "John Viewer" },
  { id: "2", role: "reviewer", name: "Jane Reviewer" },
];

// Simple JWT-like token structure (base64 encoded JSON)
interface TokenPayload {
  userId: string;
  role: "viewer" | "reviewer";
  name: string;
  exp: number;
}

const TOKEN_KEY = "report_dashboard_token";

export function createToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    role: user.role,
    name: user.name,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  return btoa(JSON.stringify(payload));
}

export function verifyToken(token: string): User | null {
  try {
    const payload: TokenPayload = JSON.parse(atob(token));

    if (payload.exp < Date.now()) {
      return null; // Token expired
    }

    return {
      id: payload.userId,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  return verifyToken(token);
}

export function login(email: string, password: string): User | null {
  // Mock authentication

  const user = mockUsers.find(
    (u) =>
      (email === "viewer@example.com" &&
        password === "viewer123" &&
        u.role === "viewer") ||
      (email === "reviewer@example.com" &&
        password === "reviewer123" &&
        u.role === "reviewer")
  );

  if (user) {
    const token = createToken(user);
    localStorage.setItem(TOKEN_KEY, token);
    return user;
  }

  return null;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function hasPermission(requiredRole: "viewer" | "reviewer"): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  // Reviewer has all permissions, viewer has limited permissions
  if (user.role === "reviewer") return true;
  if (user.role === "viewer" && requiredRole === "viewer") return true;

  return false;
}
