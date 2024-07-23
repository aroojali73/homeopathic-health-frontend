"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { Button, ErrorToast, FormInput } from "@/components";
import { setUser } from "@/redux/slices/authSlice";
import AuthRedirect from "@/utils/authRedirect";
import Swal from 'sweetalert2';

export default function Login() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/user/signin`, {
        email,
        password,
      });

      dispatch(
        setUser({
          email: response.data.email,
          accessToken: response.data.accessToken,
          lastName: response.data.lastName,
          firstName: response.data.firstName,
          role: response.data.role,
        }),
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setError(null);
      push("/");
    } catch (error: any) {
      const message = error.response.data.message;
      if( message === "Not Found: User not found") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User not found, please sign up!",
        });
      }else {
      // @ts-ignore
      console.error("Sign-in failed", error);
      // @ts-ignore
      setError(`${error.response.data.message}`);
      }
      
    } finally {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <AuthRedirect>
      <div className="set-main-form">
        <div className="flex min-h-full flex-1 flex-col justify-center py-2 px-2 my-4 container mx-auto set-inner-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <img src="./login-img.jpg" alt="Login" />
            </div>

            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-500">
                  Hello Again
                </h2>
                <p className="text-center text-1xl mt-3">
                  Welcome back you've been missed!
                </p>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6 main-form-target"
                  onSubmit={handleLogin}
                >
                  <FormInput
                    htmlFor={"email"}
                    labelText={"Email address"}
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    autoComplete={"email"}
                    placeholder={"Enter email address"}
                    isRequired={true}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <FormInput
                    htmlFor={"password"}
                    labelText={"Password"}
                    id={"password"}
                    name={"password"}
                    type={"password"}
                    autoComplete={"current-password"}
                    placeholder={"Enter password"}
                    isRequired={true}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <Link
                    href="/forgotpassword"
                    className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                  >
                    Forgot Password?
                  </Link>
                  <Button type={"submit"} buttonLabel={"Sign in"} />
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500 text-color-redish"
                  >
                    Sign up
                  </Link>
                </p>
                {error && <ErrorToast errorMessage={error} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
}
