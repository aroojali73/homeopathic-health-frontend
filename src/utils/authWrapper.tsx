"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { API_URL } from "@/utils/constants";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const storedToken = window?.localStorage.getItem("accessToken");
  const { push } = useRouter();

  async function fetchUserDetails() {
    try {
      const userDetails = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      dispatch(
        setUser({
          email: userDetails.data.Email,
          lastName: userDetails.data.LastName,
          firstName: userDetails.data.FirstName,
          accessToken: storedToken as string,
          role: userDetails.data.role,
        }),
      );
    } catch (error) {
      console.error("User details fetch failed", error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(`${error.response.data.message}`);
    }
  }

  useEffect(() => {
    if (!storedToken) {
      push("/login");
    }
    if (storedToken && !user) {
      fetchUserDetails();
    }
  }, [user]);

  if (!storedToken) return <></>;

  return <>{children}</>;
};

export default AuthWrapper;
