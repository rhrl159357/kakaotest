import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Base = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
;
`;

const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
`;

const Content = styled.div`
  flex: 0 1 250px;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

const Username = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
`;

const LastMessage = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 12px;

`;

const SentAtWrapper = styled.div`
  flex: 0 1 36px;
  text-align: center;
  font-size: 12px;
`;

const SentAt = styled.time``;

interface Props {
  id: number;
  username: string;
  lastMessage?: string;
  latestMessageSentAt?: string;
}

const ChatRoom: React.FC<Props> = ({
  id,
  username,
  lastMessage,
  latestMessageSentAt,
}) => {

  return (
    <StyledLink to={`/rooms/${id}`} >
      <Base >
        <AvatarWrapper>
          <Avatar src="/placeholder.png" />
        </AvatarWrapper>
        <Content>
          <Username>{username}</Username>
          <LastMessage>
            {lastMessage}
          </LastMessage>
        </Content>
        <SentAtWrapper>
          <SentAt>{latestMessageSentAt}</SentAt>
        </SentAtWrapper>
      </Base>
    </StyledLink>
  );
};

export default ChatRoom;