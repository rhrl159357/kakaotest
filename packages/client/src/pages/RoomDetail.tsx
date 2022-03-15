import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";



import { AxiosError, AxiosResponse } from "axios";
import { IChat, IProfile, IRoom } from "../types";
import { useMutation, useQuery } from "react-query";
import { fetchMyProfile } from "../api/userApi";
import { fetchChatRoomDetail } from "../api/roomApi";
import { fetchChatMessageList, sendChatMessage } from "../api/chatApi";
import TopNavigation from "../compoments/TopNavigation";
import InputChat from "../compoments/ChatRoomDetail/InputChat";
import MessageList from "../compoments/ChatRoomDetail/MessageList";
import SentMessage from "../compoments/ChatRoomDetail/SentMessage";
import ReceivedMessage from "../compoments/ChatRoomDetail/ReceivedMessage";
import { io } from "socket.io-client";
import { API_HOST } from "../config";


const globalStyles = css`
  body {
    background-color: #abc1d1;
  }
`;

const Base = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  align-items: center;
  padding: 0 24px;
`;

const RoomDetailPage: React.FC = () => {
    const scrollBottomRef = useRef<HTMLLIElement>(null);
    const {roomId} = useParams<string>();
    const [messages, setMessages] = useState<Array<IChat>>([]);
    const {data: profileData} = useQuery<AxiosResponse<IProfile>,AxiosError>('fetchMyProfile',fetchMyProfile)
    const {data : chatRoomDetailData} = useQuery<AxiosResponse<IRoom>,AxiosError>(['fetchChatRoomDetail', roomId], () => fetchChatRoomDetail(roomId as string))
    const {data : chatListData} = useQuery<AxiosResponse<Array<IChat>>,AxiosError>(['fetchChatMessageList', roomId], () => fetchChatMessageList(roomId as string))

    const mutation = useMutation('sendChatMessage',(content: string) => sendChatMessage(roomId as string, content))


    const handleSend = (content: string) => {
        if (content.length) {
          mutation.mutate(content);
        }
      };
    
      useEffect(() => {
        const socket = io(`${API_HOST}/chat`, { path: "/socket.io" });
    
        socket.emit("join", roomId);
    
        socket.on("chat", (newMessage: IChat) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      }, []);
    
      useEffect(() => {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

  return (
    <Base>
      <Global styles={globalStyles} />
      {chatRoomDetailData && (
        <TopNavigation title={chatRoomDetailData.data.user.username} />
      )}
      <Container>
      <MessageList>
          {messages.map((message) =>
            message.senderId === profileData?.data.userId ? (
              <SentMessage
                key={message.id}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            ) : (
              <ReceivedMessage
                key={message.id}
                receiver={message.user?.username}
                receiverThumbnailImage={message.user?.thumbnailImageUrl}
                senderId={message.senderId}
                content={message.content}
                timestamp={message.createdAt}
              />
            )
          )}
          <li ref={scrollBottomRef} />
        </MessageList>
      </Container>
      <InputChat onClick={handleSend} />
    </Base>
  );
};

export default RoomDetailPage;