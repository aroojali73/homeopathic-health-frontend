"use client";
import AuthWrapper from "@/utils/authWrapper";
import { Navbar } from "@/components/navbar";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { Button, ErrorToast, FormInput } from "@/components";
import { SuccessToast } from "@/components/successToast";
import Swal from 'sweetalert2';
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const { push } = useRouter();
  const dispatch = useDispatch();

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
      setAge(userDetails.data.Age);
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

  const handleEditSubmission = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const userDetails = await axios.put(
        `${API_URL}/user/${email}`,
        {
          password,
          firstName,
          lastName,
          phone,
          age,
          lastTZ: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setFirstName(userDetails.data.FirstName);
      setLastName(userDetails.data.LastName);
      setPhone(userDetails.data.Phone);
      setAge(userDetails.data.Age);

      setError(null);
      setSuccess("Updated successfully");
    } catch (error) {
      console.error("User updated failed", error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 2000);
    }
  };
  /**
   * this method is used to delete the user account 
   */
  const deleteAccount =  () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      }
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if(response.data?.success){
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Account has been deleted.",
            icon: "success"
          });
          dispatch(setUser(null));
          localStorage.removeItem("accessToken");
          push("/login");
        }else{
          swalWithBootstrapButtons.fire({
            title: "User Deletion Failed",
            text: "An error occurred while trying to delete the user. Please try again.",
            icon: "error"
          });
        }
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your Account is safe :)",
          icon: "error"
        });
      }
    });
  }  
  return (
    <AuthWrapper>
      <Navbar />
      <div className="set-main-form set-bg-contact">
        <div className="flex min-h-full flex-1 flex-col justify-center p-2 set-inner-content set-content-contact-page container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
                <h2 className="text-center text-2xl font-bold leading-9 text-gray-500 set-font-24">
                  Update Details
                </h2>
              </div>
              <p className="text-lg font-medium leading-6 text-gray-500 mt-10 mb-10 w-[80%] m-auto">
                Updating your profile details ensures that your information is
                accurate and up-to-date, allowing us to provide you with the
                best possible service. By keeping your contact information,
                medical history, and preferences current, you help us tailor our
                recommendations and treatment plans to better suit your
                individual needs.
              </p>
              <p className="text-lg font-medium leading-6 text-gray-500 mt-10 mb-10 w-[80%] m-auto">
                Regularly reviewing and updating your profile can also enhance
                your overall experience with our app. Whether you’ve changed
                your address, updated your health goals, or want to adjust your
                communication preferences, making these changes in your profile
                helps us stay in sync with your journey towards better health
                and wellness.
              </p>
            </div>

            <div className="sm:w-full set-right-contact-content">
              <form
                className="space-y-6  main-form-target w-[80%] m-auto"
                onSubmit={handleEditSubmission}
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
                  htmlFor={"password"}
                  labelText={"Password"}
                  id={"password"}
                  name={"password"}
                  type={"password"}
                  autoComplete={"current-password"}
                  placeholder={"Enter password"}
                  isRequired={false}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
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
                  isRequired={false}
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
                  isRequired={false}
                  value={age}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setAge(e.target.value);
                  }}
                />
                 <button className="text-danger" type={"button"} onClick={deleteAccount}>Delete Account</button>
                <Button type={"submit"} buttonLabel={"Save"} />
              </form>
            </div>
          </div>
        </div>
      </div>
      {error && <ErrorToast errorMessage={error} />}
      {success && <SuccessToast message={success} />}
    </AuthWrapper>
  );
}
