"use client";
import {
  MinChatUiProvider,
  MainContainer,
  MessageInput,
  MessageContainer,
  MessageList,
  MessageHeader,
} from "@minchat/react-chat-ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { ErrorToast } from "@/components/errorToast";

type IMessage = {
  id?: string;
  text: string;
  user: {
    id: string;
    name: string;
  };
};

const userGPT = {
  id: "chatgpt",
  name: "ChatBot",
};

export function Chat(props: { hideChat: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: (Math.random() + 1).toString(36).substring(7),
      text: "Hello, How can I help you?",
      user: userGPT,
    },
  ]);

  async function fetchUserDetails() {
    try {
      const userDetails = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setFirstName(userDetails.data.FirstName);
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
      }, 2000);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function fetchGPTResponse(text: string) {
    try {
      const messageId = (Math.random() + 1).toString(36).substring(7);
      setMessages([
        ...messages,
        {
          id: messageId,
          text: text,
          user: {
            id: email,
            name: firstName,
          },
        },
      ]);

      const response = await axios.post(
        `${API_URL}/chat`,
        {
          chatQuery: text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      setMessages([
        ...messages,
        {
          id: messageId,
          text: text,
          user: {
            id: email,
            name: firstName,
          },
        },
        {
          text: response.data.message,
          user: userGPT,
        },
      ]);
    } catch (error) {
      // @ts-ignore
      console.error("Chat GPT call failed", error);
      // @ts-ignore
      setError(`${error.response.data.message}`);
    } finally {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  return (
    <>
      <div className="mx-auto w-[20%] fixed right-8 bottom-8">
        <MinChatUiProvider theme="#6ee7b7">
          <MainContainer style={{ height: "50vh" }}>
            <MessageContainer>
              <MessageHeader
                onBack={() => {
                  props.hideChat();
                }}
                mobileView={false}
                showBack={true}
              />
              <MessageList
                mobileView={false}
                currentUserId="dan"
                messages={messages}
              />
              <MessageInput
                showAttachButton={false}
                showSendButton={true}
                placeholder="Type message here"
                onSendMessage={fetchGPTResponse}
              />
            </MessageContainer>
          </MainContainer>
        </MinChatUiProvider>
      </div>
      {error && <ErrorToast errorMessage={error} />}
    </>
  );
}
