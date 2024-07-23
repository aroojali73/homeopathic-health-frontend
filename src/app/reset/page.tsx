"use client";

import Link from "next/link";
import { useRouter,useSearchParams  } from "next/navigation";
import { ChangeEvent, FormEvent, useState,useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { Button, ErrorToast, FormInput } from "@/components";
import AuthRedirect from "@/utils/authRedirect";


export default function reset () {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log('Query parameters:',token);
  }, [token]); 
  const handleResetPassword = async (event: FormEvent) => {
    event.preventDefault();
if(cpassword === password){
  try {
    const response = await axios.post(`${API_URL}/user/reset/${token}`, {
      password,
    });
   
    setError(response?.data?.message);

    push("/login");
  } catch (error) {
    // @ts-ignore
    console.error("Sign-in failed", error.response.data);
    // @ts-ignore
    setError(`${error.response.data.message}`);
  } finally {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }
}else {
  setError(` Passwords do not match`);
}
   
  };

  return (
    <AuthRedirect>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
            Create New Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleResetPassword}>
         
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
            <FormInput
              htmlFor={"cpassword"}
              labelText={"Confirm Password"}
              id={"password"}
              name={"password"}
              type={"password"}
              autoComplete={"current-password"}
              placeholder={"Enter password Again"}
              isRequired={true}
              value={cpassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCPassword(e.target.value);
              }}
            />
           
            {cpassword?.length > 0 && cpassword !== password &&  <p className="error-message">
            Passwords do not match
              </p>}
            <Button type={"submit"} buttonLabel={"Reset Password"} />
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
