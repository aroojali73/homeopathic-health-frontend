"use client";
import { Button } from "@/components/button";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { selectUser, setUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const user = useSelector(selectUser);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const signoutHandler = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      dispatch(setUser(null));
      localStorage.removeItem("accessToken");
      push("/login");
    } catch (error) {
      // @ts-ignore
      if (error.response?.status === 401) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        push("/login");
      }
      console.error("Sign-in failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center set-bg-nav-green">
      <nav className="bg-white shadow-sm w-[80%] px-8 rounded-xl md:px-auto set-navigation-bar-com">
        <div className="h-16 mx-auto md:px-4 flex items-center justify-end flex-wrap md:flex-nowrap">
          <div className="text-lg font-medium leading-6 text-gray-500 order-3 w-[100%] md:order-2">
            <ul className="flex font-semibold justify-between w-[100%]">
              <Link href="/">
                <li className="flex items-center md:px-4 md:py-2 hover:text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </li>
              </Link>

              <li className="md:px-4 md:py-2 hover:text-emerald-400 ml-auto">
                <Button
                  type="submit"
                  buttonLabel="Sign out"
                  onClick={signoutHandler}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
