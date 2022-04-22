import styled from 'styled-components/native';
import { Button, Layout, Text } from '@ui-kitten/components';

const Container = styled(Layout)`
  padding-top: ${(props) => (props.pt || 0) + 20}px;
  flex-grow: 1;
  max-height: 100%;
`;

const InnerContainer = styled(Layout)`
  padding: 0 20px;
`;

const TitleContainer = styled(InnerContainer)`
  flex-direction: row;
`;

const InfoContainer = styled(InnerContainer)`
  margin-bottom: 20px;
`;

const CTAContainer = styled(InnerContainer)`
  margin: 20px 0;
`;

const CloseButton = styled(Button)`
  margin-left: auto;
`;

const Tag = styled(Layout)`
  background-color: ${(props) => props.theme[`color-${props.color}-600`]};
  border-radius: 9999999px;
  padding: 5px 15px;
  margin-top: 5px;
  margin-right: auto;
  justify-content: center;
`;

const TagsContainer = styled(Layout)`
  flex-direction: column;
  justify-content: flex-start;
`;

const TakeButton = styled(Button)`
  width: 100%;
`;

const WithIcon = styled.View`
  flex-direction: row;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const NumberContainer = styled.View`
  border-radius: 9999px;
  background-color: ${(props) => props.theme['color-primary-600']};
  height: 30px;
  width: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const DetailTitle = styled(Text)`
  margin-top: 10px;
`;

const TakeNote = styled(Text)`
  margin-bottom: 20px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const SaveButton = styled(TakeButton)`
  margin-bottom: 20px;
`;

export {
  Container,
  TitleContainer,
  CloseButton,
  TagsContainer,
  Tag,
  TakeButton,
  WithIcon,
  HeaderContainer,
  NumberContainer,
  DetailTitle,
  InfoContainer,
  CTAContainer,
  TakeNote,
  SaveButton,
};
