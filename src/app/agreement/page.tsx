"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function AgreementScreen() {
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const [budget, setBudget] = useState("");
  const [deadlineDays, setDeadlineDays] = useState("");
  const [specifications, setSpecifications] = useState("");

  const handleSign = () => {
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      setIsSigned(true);
    }, 2000);
  };

  return (
    <PageContainer>
      {/* HEADER */}
      <HeaderBar>
        <HeaderLeft>
          <Logo>FreelancerOS</Logo>

          <DesktopNav>
            <NavLink href="#" $active>
              Discover
            </NavLink>
            <NavLink href="#">Feed</NavLink>
            <NavLink href="#">Messages</NavLink>
          </DesktopNav>
        </HeaderLeft>

        <HeaderRight>
          <IconGroup>
            <span>🔔</span>
            <span>👤</span>
          </IconGroup>

          <Link href="/" passHref>
            <LoginButton>Home</LoginButton>
          </Link>
        </HeaderRight>
      </HeaderBar>

      <ContentWrapper>
        <Header>
          <Title>Acuerdo Final del Proyecto</Title>
          <Subtitle>
            Define el presupuesto, el tiempo y las especificaciones antes de la
            ejecución on-chain.
          </Subtitle>
        </Header>

        <AgreementCard>
          <Section>
            <Label>Project Title</Label>
            <ProjectName>Nuevo Proyecto Freelance</ProjectName>
          </Section>

          <Grid>
            <Section>
              <Label>Presupuesto del Cliente (USD)</Label>
              <Input
                type="number"
                placeholder="Ej: 1500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Section>

            <Section>
              <Label>Días para Finalizar</Label>
              <Input
                type="number"
                placeholder="Ej: 14"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(e.target.value)}
              />
            </Section>
          </Grid>

          <Section>
            <Label>Especificaciones del Proyecto</Label>
            <TextArea
              placeholder="Describe qué necesitas exactamente: funcionalidades, tecnología, entregables, etc."
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
            />
          </Section>

          <Footer>
            <FooterText>Payment Terms</FooterText>
            <FooterValue>Escrow Inteligente AI</FooterValue>
          </Footer>
        </AgreementCard>

        <ActionSection>
          <InfoBox>
            <InfoIcon>ℹ️</InfoIcon>
            <InfoText>
              Al firmar, se generará un acuerdo criptográfico seguro usando
              EIP-712. El presupuesto se bloqueará en escrow hasta completar el
              proyecto.
            </InfoText>
          </InfoBox>

          <SignButton
            onClick={handleSign}
            disabled={isSigning || isSigned}
            $isSigned={isSigned}
          >
            {isSigning
              ? "Abriendo Wallet..."
              : isSigned
              ? "✓ Acuerdo Firmado"
              : "Firmar Acuerdo"}
          </SignButton>

          <StatusText>
            {isSigned
              ? "Hash generado: 0x71C...3a9B"
              : "Esperando firma digital"}
          </StatusText>
        </ActionSection>
      </ContentWrapper>
    </PageContainer>
  );
}

/* =========================
STYLED COMPONENTS
========================= */

const PageContainer = styled.main`
  min-height: 100vh;
  background-color: #131318;
  color: #e4e1e8;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 120px 20px 40px 20px;
  font-family: "Manrope", sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: rgba(28, 28, 31, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const DesktopNav = styled.nav`
  display: none;
  gap: 32px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.a<{ $active?: boolean }>`
  text-decoration: none;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? "#8C3BFF" : "#9ca3af")};

  &:hover {
    color: white;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 16px;
  font-size: 1.2rem;
`;

const LoginButton = styled.a`
  background: #7000e3;
  color: white;
  padding: 10px 22px;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
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
`;

const AgreementCard = styled.article`
  background-color: #2a2a2f;
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
  gap: 6px;
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
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const Input = styled.input`
  background: #1b1b20;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 14px;
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: #8c3bff;
  }
`;

const TextArea = styled.textarea`
  background: #1b1b20;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 14px;
  border-radius: 10px;
  min-height: 130px;

  &:focus {
    outline: none;
    border-color: #8c3bff;
  }
`;

const Footer = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const FooterText = styled.span`
  font-size: 0.875rem;
  color: #c8c5cb;
`;

const FooterValue = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
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
`;

const InfoIcon = styled.span`
  font-size: 1.2rem;
`;

const InfoText = styled.p`
  font-size: 0.8rem;
  color: #c8c5cb;
`;

const SignButton = styled.button<{ $isSigned: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.$isSigned ? "#53E489" : "#8C3BFF")};
  color: ${(props) => (props.$isSigned ? "#00210d" : "#ffffff")};
  font-size: 1.125rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
`;

const StatusText = styled.p`
  text-align: center;
  font-size: 0.7rem;
  color: #c8c5cb;
`;