"use client";
import { Navbar } from "@/components/navbar";
import AuthWrapper from "@/utils/authWrapper";
import { Button, ErrorToast, FormInput } from "@/components";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { SuccessToast } from "@/components/successToast";

export default function Contact() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState("");

  async function fetchUserDetails() {
    try {
      const userDetails = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setFirstName(userDetails.data.FirstName);
      setLastName(userDetails.data.LastName);
      setPhone(userDetails.data.Phone);
      setEmail(userDetails.data.Email);
      setError(null);
    } catch (error) {
      console.error("User details fetch failed", error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function handleMessageSubmission() {
    try {
      const response = await axios.post(
        `${API_URL}/contact-message`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Message sent failed", error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  }

  return (
    <AuthWrapper>
      <Navbar />
      <div className="set-main-form set-bg-contact">
        <div className="flex min-h-full flex-1 flex-col my-8 justify-center py-2 px-2 container mx-auto set-inner-content set-content-contact-page">
          <div className="flex flex-col w-[100%] text-gray-500 rounded-xl md:px-auto m-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
                  <h2 className="text-center text-2xl font-bold leading-9 text-gray-500 set-font-24">
                    Contact Us
                  </h2>
                </div>
                <p className="text-lg font-medium leading-6 text-gray-500 mt-10 mb-10 w-[80%] m-auto">
                  We are sorry to hear that you may be having difficulties with
                  the application but we are always here to help! Connect with
                  us for any queries, concerns or feedback regarding our
                  homeopathic solution.
                </p>
                <p className="text-lg font-medium leading-6 text-gray-500 mt-10 mb-10 w-[80%] m-auto">
                  We can reached via email at{" "}
                  <a
                    href="mailto:homeopathichealth2024@gmail.com?subject=Help Required with Homeopathic HA"
                    target="_blank"
                    className="underline cursor-pointer text-sm"
                  >
                    homeopathichealth2024@gmail.com
                  </a>
                  . Our contact number is{" "}
                  <a
                    href="tel:+44 203 590 6036"
                    className="underline cursor-pointer text-sm"
                  >
                    +44 203 590 6036
                  </a>
                  . You can also reach out on our app via form given below.
                </p>
              </div>

              <div className="sm:w-full set-right-contact-content">
                <form
                  className="space-y-6 main-form-target w-[80%] m-auto"
                  onSubmit={handleMessageSubmission}
                >
                  <FormInput
                    htmlFor={"firstName"}
                    labelText={"First name"}
                    id={"firstName"}
                    name={"firstName"}
                    type={"text"}
                    autoComplete={"name"}
                    placeholder={"Enter first name"}
                    isRequired={false}
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
                    isRequired={false}
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setLastName(e.target.value);
                    }}
                  />

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
                    htmlFor={"email"}
                    labelText={"Email"}
                    id={"email"}
                    name={"email"}
                    type={"email"}
                    autoComplete={"email"}
                    placeholder={"Enter email"}
                    isRequired={true}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <div>
                    <label
                      htmlFor={"message"}
                      className="block text-sm font-medium leading-6 text-gray-500"
                    >
                      Message
                    </label>
                    <div className="mt-2">
                      <textarea
                        id={"message"}
                        name={"message"}
                        placeholder={"Enter your message"}
                        required={true}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                        rows={5}
                        value={message}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                          setMessage(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <Button type={"submit"} buttonLabel={"Submit"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <ErrorToast errorMessage={error} />}
      {success && <SuccessToast message={success} />}
    </AuthWrapper>
  );
}
