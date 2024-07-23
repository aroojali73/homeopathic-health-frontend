"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/authSlice";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthWrapperProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const storedToken = window?.localStorage.getItem("accessToken");
  const { push } = useRouter();

  useEffect(() => {
    if (storedToken) {
      push("/");
    }
  }, [user]);

  if (storedToken) return <></>;

  return <>{children}</>;
};

export default AuthRedirect;
