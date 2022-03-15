import React, { useRef, useState } from "react";

import styled from "@emotion/styled";

import { AiOutlineArrowUp } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";

const Base = styled.div`
  width: 100%;
  height: 48px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
`;

const PlusButtonWrapper = styled.div``;

const PlusButton = styled.button`
  width: 48px;
  height: 48px;
  font-size: 20px;
  border: none;
  background-color: transparent;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  background-color: transparent;
  border-radius: 16px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 4px 8px;
  font-size: 16px;
`;

const SendButtonWrapper = styled.div`
  margin-left: 8px;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 16px;
  &:active {
    opacity: 0.7;
  }
`;

interface Props {
  onClick(content: string): void;
}

const InputChat: React.FC<Props> = ({ onClick }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleClick = () => {
    onClick(content);

    setContent("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Base>
      <PlusButtonWrapper>
        <PlusButton>
          <BsPlusSquare />
        </PlusButton>
      </PlusButtonWrapper>
      <InputWrapper>
        <Input
          ref={inputRef}
          onChange={handleChange}
        />
      </InputWrapper>
      <SendButtonWrapper>
        <SendButton
          onClick={handleClick}
        >
          <AiOutlineArrowUp />
        </SendButton>
      </SendButtonWrapper>
    </Base>
  );
};

export default InputChat;