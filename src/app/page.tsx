"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import AuthWrapper from "@/utils/authWrapper";
import { Navbar } from "@/components/navbar";
import Search from "@/components/search";
import { API_URL } from "@/utils/constants";
import { ErrorToast } from "@/components";
import { Chat } from "@/components/chat";
import Navigation from "@/components/navigation";

export default function Home() {
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [conditionData, setConditionData] = useState<any>();
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConditionChange = (condition: string) => {
    setSelectedSuggestion(condition);
    if (!condition.length) {
      setConditionData(null);
    }
  };

  async function fetchConditionDetails() {
    try {
      const response = await axios.get(
        `${API_URL}/condition/${selectedSuggestion}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setConditionData(response.data);
      setError(null);
    } catch (error) {
      // @ts-ignore
      console.error("Condition fetch failed", error);
      // @ts-ignore
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  useEffect(() => {
    if (!selectedSuggestion.length) {
      return;
    }

    fetchConditionDetails();
  }, [selectedSuggestion]);

  return (
    <AuthWrapper>
      <Navbar />
      <Search
        conditionData={conditionData}
        setSelectedSuggestion={handleConditionChange}
      />

      <Navigation />

      {showChat ? (
        <Chat hideChat={() => setShowChat(false)} />
      ) : (
        <button
          onClick={() => setShowChat(true)}
          className="fixed right-12 bottom-12"
        >
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10.5H16"
              stroke="rgb(107 114 128)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8 14H13.5"
              stroke="rgb(107 114 128)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
              stroke="rgb(107 114 128)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {error && <ErrorToast errorMessage={error} />}
    </AuthWrapper>
  );
}
