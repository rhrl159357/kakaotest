import React from "react";
import styled from "@emotion/styled/macro";

const Base = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0;
  width: 100%;
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

const UsernameWrapper = styled.div`
  margin-left: 8px;
`;

const Username = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
`;

interface Props {
  username: string;
  thumbnailImage?: string;
  onClick(): void;
}

const Friend: React.FC<Props> = ({ username, thumbnailImage, onClick }) => {

  return (
    <Base onClick={onClick}>
      <AvatarWrapper>
        <Avatar src={thumbnailImage || "/placeholder.png"} />
      </AvatarWrapper>
      <UsernameWrapper>
        <Username>{username}</Username>
      </UsernameWrapper>
    </Base>
  );
};

export default Friend;