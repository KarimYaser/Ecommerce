import { setAuthInfo } from "../store/auth.slice";
import { useDispatch } from "react-redux";
import { clearToken } from "../server/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UseLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await clearToken();
    dispatch(setAuthInfo({ isAuthenticated: false, userInfo: null }));
    toast("Logged out successfully");
    setTimeout(() => {
      router.refresh("/login");
    }, 3000);
  };

  return { logout };
}
