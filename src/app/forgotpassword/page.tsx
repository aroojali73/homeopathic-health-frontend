"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { Button, ErrorToast, FormInput } from "@/components";
import AuthRedirect from "@/utils/authRedirect";
import Loader from "@/components/Loader";
export default function forgotpassword() {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMailSend, setIsMailSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (event: FormEvent) => {
    event.preventDefault();

    try {
        setIsLoading(true);
      const response = await axios.post(`${API_URL}/user/forgot`, {
        email,
      });
      if(response?.data?.success){
        setIsMailSend(true);
      }else{
        setError(`We're currently experiencing issues sending emails. Please try again later.`);
        setIsMailSend(false);
      }
     
    } catch (error) {
      // @ts-ignore
      console.error("Forgot password failed", error);
      // @ts-ignore
      setError(`${error.response.data.message}`);
    } finally {
        setIsLoading(false);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <AuthRedirect>
         {isLoading && <Loader/>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
            Forgot Password
          </h2>
          <p>
            Enter Your email and we'll send you a link to reset your password
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleForgotPassword}>
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
           
           {isMailSend && <p>
            Check your inbox for a password reset email with instructions. If you don't see it, please check your spam folder.
            </p>}
            <Button type={"submit"} buttonLabel={"Submit"} />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              href="/login"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              Back to login
            </Link>
          </p>
          {error && <ErrorToast errorMessage={error} />}
        </div>
      </div>
    </AuthRedirect>
  );
}
