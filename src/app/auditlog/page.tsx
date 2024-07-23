"use client";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import { ErrorToast } from "@/components";
import { Navbar } from "@/components/navbar";
import AuthWrapper from "@/utils/authWrapper";

export default function AuditLog() {
  const [error, setError] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<any>([]);

  async function fetchLogDetails() {
    try {
      const userDetails = await axios.get(`${API_URL}/activity-log`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setAuditLogs(userDetails.data.logs);
      setError(null);
    } catch (error) {
      console.error("User details fetch failed", error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchLogDetails();
  }, []);

  return (
    <AuthWrapper>
      <Navbar />
      <div className="mx-auto mt-20 max-w-lg mb-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
          <h2 className="text-center text-2xl font-bold leading-9 text-gray-500">
            History
          </h2>
        </div>
        {auditLogs.length ? (
          auditLogs.map((log: any) => (
            <ul className="mt-2 list-disc text-gray-500">
              <li>
                You searched for{" "}
                <em>
                  <strong>{log.ActivityLogAttributes?.EntityIdentifier}</strong>
                </em>{" "}
                Condition on{" "}
                <strong>
                  <em>
                    {new Date(log.LogDate).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </em>
                </strong>
              </li>
            </ul>
          ))
        ) : (
          <></>
        )}
      </div>

      {error && <ErrorToast errorMessage={error} />}
    </AuthWrapper>
  );
}
