import React from 'react'
import styled from "@emotion/styled";
import BottomNavigation from '../compoments/BottomNavigation'
import TopNavigation from '../compoments/TopNavigation'
import UserInfo from '../compoments/SeeMore/UserInfo';
import IconButtonList from '../compoments/SeeMore/IconButtonList';

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeeMore : React.FC = () => {
    return (
        <Base>
            <Container>
                <TopNavigation title='더보기'/>
                    <UserInfo telNo='010-9999-9899' username='홍길동' />
                    <IconButtonList />
                <BottomNavigation />
            </Container>
        </Base>
    )
}

export default SeeMore