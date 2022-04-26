//import { filterProps } from 'framer-motion';
import React from 'react';
import tw, { styled, css } from 'twin.macro';

interface CustomerInformationProps {
    customerProfilePicture: string;  
    customerName: string;
}
  
interface StyledProfileCardImageProps {
    src?: string;
}


const StyledProfileCardImage = styled.div<StyledProfileCardImageProps>`
    margin: 0 auto 2rem;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #FFFFFF;
    background-image: url(${(props) => (props.src === "" ? ("/images/user-image.png"):(props.src))});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
    -moz-box-shadow:inset 0px 0px 0px 2px #003366;
    box-shadow:inset 0px 0px 0px 2px #003366;
`;

const StyledProfileCardContainer = styled.div`
  margin: 1.875rem 2.5rem 0;
  align-items: center;
  padding: 0 0 2rem 0;
`;

const StyledProfileCardImageDiv = styled.div`
  margin: 0 auto 2rem;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${("../icons/user-circle-dark.png")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-box-shadow:inset 0px 0px 0px 2px #003366;
  -moz-box-shadow:inset 0px 0px 0px 2px #003366;
  box-shadow:inset 0px 0px 0px 2px #003366;
`;


const CustomerInformationCard: React.FC<CustomerInformationProps> = (props) => {
    return(
        <div tw="flex flex-col items-center mb-12">
            <StyledProfileCardImageDiv>
                <StyledProfileCardImage src={props.customerProfilePicture}/>
            </StyledProfileCardImageDiv>
            <h4 tw="font-bold text-xl">{props.customerName}</h4>
        </div>
    );
};


export default CustomerInformationCard;

