"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { Button, ErrorToast, FormInput } from "@/components";
import AuthRedirect from "@/utils/authRedirect";

export default function Signup() {
  const { push } = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        email,
        password,
        firstName,
        lastName,
        phone,
        age,
        lastTZ: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      push("/login");
      setError(null);
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
  };

  return (
    <AuthRedirect>
      <div className="set-main-form">
        <div className="flex min-h-full flex-1 flex-col my-8 justify-center py-2 px-2 container mx-auto set-inner-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <img src="./register-img.jpg" alt="Login" />
            </div>
            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-500">
                  Create Your Account
                </h2>
                <p className="text-center text-1xl mt-3">
                  Welcome! Please enter your details
                </p>
              </div>

              <div className="mt-10">
                <form
                  className="space-y-6 main-form-target"
                  onSubmit={handleSignup}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormInput
                      htmlFor={"firstName"}
                      labelText={"First name"}
                      id={"firstName"}
                      name={"firstName"}
                      type={"text"}
                      autoComplete={"name"}
                      placeholder={"Enter first name"}
                      isRequired={true}
                      value={firstName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setFirstName(e.target.value);
                      }}
                    />

                    <FormInput
                      htmlFor={"lastName"}
                      labelText={"Last name"}
                      id={"lastName"}
                      name={"lastName"}
                      type={"text"}
                      autoComplete={"name"}
                      placeholder={"Enter last name"}
                      isRequired={true}
                      value={lastName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormInput
                      htmlFor={"phone"}
                      labelText={"Phone"}
                      id={"phone"}
                      name={"phone"}
                      type={"tel"}
                      autoComplete={"tel"}
                      placeholder={"Enter phone"}
                      isRequired={true}
                      value={phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPhone(e.target.value);
                      }}
                    />

                    <FormInput
                      htmlFor={"age"}
                      labelText={"Age"}
                      id={"age"}
                      name={"age"}
                      type={"number"}
                      autoComplete={"age"}
                      placeholder={"Enter age"}
                      isRequired={true}
                      value={age}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAge(e.target.value);
                      }}
                    />
                  </div>
                  <Button type={"submit"} buttonLabel={"Sign up"} />
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Already a member?{" "}
                  <Link
                    href="/login"
                    className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                  >
                    Sign in
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
