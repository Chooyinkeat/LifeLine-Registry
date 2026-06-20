import { ref, computed } from "vue";
import type { User, UserRole } from "@/types/Auth";
import * as authApi from "@/services/auth";

const user = ref<User | null>(null);
const token = ref<string | null>(localStorage.getItem("token"));
const loading = ref(false);

const isAuthenticated = computed(() => !!token.value && !!user.value);
const isVolunteer = computed(() => user.value?.role === "volunteer");
const isOrganization = computed(() => user.value?.role === "organization");

function setSession(authToken: string, authUser: User) {
  token.value = authToken;
  user.value = authUser;
  localStorage.setItem("token", authToken);
}

function clearSession() {
  token.value = null;
  user.value = null;
  localStorage.removeItem("token");
}

async function initAuth() {
  if (!token.value) return;
  loading.value = true;
  try {
    user.value = await authApi.getMe();
  } catch {
    clearSession();
  } finally {
    loading.value = false;
  }
}

async function register(
  name: string,
  email: string,
  password: string,
  role: UserRole,
) {
  const response = await authApi.register({ name, email, password, role });
  setSession(response.token, response.user);
  return response;
}

async function login(email: string, password: string) {
  const response = await authApi.login({ email, password });
  setSession(response.token, response.user);
  return response;
}

function logout() {
  clearSession();
}

export function useAuth() {
  return {
    user,
    token,
    loading,
    isAuthenticated,
    isVolunteer,
    isOrganization,
    initAuth,
    register,
    login,
    logout,
  };
}
