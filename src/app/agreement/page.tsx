"use client";

import React, { useState } from "react";
import styled from "styled-components";

export default function AgreementScreen() {
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const handleSign = () => {
    setIsSigning(true);
    // Simulamos el tiempo que tarda la wallet en abrirse y firmar
    setTimeout(() => {
      setIsSigning(false);
      setIsSigned(true);
    }, 2000);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>Acuerdo Final Estático</Title>
          <Subtitle>
            Revisa los parámetros finales del proyecto antes de la ejecución on-chain.
          </Subtitle>
        </Header>

        <AgreementCard>
          <Section>
            <Label>Project Title</Label>
            <ProjectName>Project Alpha: Core dApp Architecture</ProjectName>
          </Section>

          <Grid>
            <Section>
              <Label>Budget</Label>
              <HighlightValue>2.5 ETH</HighlightValue>
            </Section>
            <Section>
              <Label>Deadline</Label>
              <Value>30 Days</Value>
            </Section>
          </Grid>

          <Section>
            <Label>Deliverables</Label>
            <List>
              <ListItem><Bullet /> Responsive React/Next.js Frontend</ListItem>
              <ListItem><Bullet /> Web3 Provider & Wallet Integration</ListItem>
              <ListItem><Bullet /> Core Protocol Smart Contract Hooks</ListItem>
            </List>
          </Section>

          <Footer>
            <FooterText>Payment Terms</FooterText>
            <FooterValue>100% Milestone Release</FooterValue>
          </Footer>
        </AgreementCard>

        <ActionSection>
          <InfoBox>
            <InfoIcon>ℹ️</InfoIcon>
            <InfoText>
              Al firmar, inicias una solicitud segura EIP-712. Tras la confirmación, se generará un hash criptográfico anclando este acuerdo a la bóveda escrow del proyecto.
            </InfoText>
          </InfoBox>

          <SignButton 
            onClick={handleSign} 
            disabled={isSigning || isSigned}
            $isSigned={isSigned}
          >
            {isSigning ? "Abriendo Wallet..." : isSigned ? "✓ Acuerdo Firmado" : "Firma EIP-712 con Wallet"}
          </SignButton>

          <StatusText>
            {isSigned 
              ? "Hash generado: 0x71C...3a9B" 
              : "Esperando firma digital de 0x82...4f9a"}
          </StatusText>
        </ActionSection>
      </ContentWrapper>
    </PageContainer>
  );
}

// --- Styled Components ---

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: #131318;
  color: #e4e1e8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Manrope', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Header = styled.header`
  text-align: left;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  color: #c8c5cb;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const AgreementCard = styled.article`
  background-color: #2A2A2F;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 0.65rem;
  font-weight: bold;
  color: #c8c5cb;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

const ProjectName = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const HighlightValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #d5baff; /* Secondary purple from your HTML */
  margin: 0;
`;

const Value = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #e4e1e8;
`;

const Bullet = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #8C3BFF;
`;

const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.span`
  font-size: 0.875rem;
  color: #c8c5cb;
`;

const FooterValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InfoBox = styled.div`
  background-color: #1b1b20;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const InfoIcon = styled.span`
  font-size: 1.2rem;
`;

const InfoText = styled.p`
  font-size: 0.8rem;
  color: #c8c5cb;
  margin: 0;
  line-height: 1.5;
`;

const SignButton = styled.button<{ $isSigned: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.$isSigned ? '#53E489' : '#8C3BFF')};
  color: ${(props) => (props.$isSigned ? '#00210d' : '#ffffff')};
  font-size: 1.125rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 12px;
  border: none;
  cursor: ${(props) => (props.$isSigned ? 'default' : 'pointer')};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isSigned ? '#53E489' : '#7000E3')};
  }

  &:disabled {
    opacity: ${(props) => (props.$isSigned ? '1' : '0.7')};
    cursor: not-allowed;
  }
`;

const StatusText = styled.p`
  text-align: center;
  font-size: 0.65rem;
  color: #c8c5cb;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
`;