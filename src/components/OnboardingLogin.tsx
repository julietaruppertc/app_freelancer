"use client";

import React, { FormEvent, useState } from "react";
import styled from "styled-components";

type LoginPayload = {
  email: string;
  password: string;
};

type OnboardingLoginProps = {
  onEmailLogin: (payload: LoginPayload) => Promise<void> | void;
  onWalletConnect: () => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function OnboardingLogin({
  onEmailLogin,
  onWalletConnect,
  isSubmitting = false,
}: OnboardingLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onEmailLogin({ email, password });
  };

  return (
    <LoginContainer>
      <BrandingPane>
        <BrandOverlay />
        <BrandContent>
          <LogoPill>
            <LogoIcon>✣</LogoIcon>
            <LogoText>app_freelancer</LogoText>
          </LogoPill>

          <Headline>
            <span>Tu talento,</span>
            <AccentLine>tu codigo,</AccentLine>
            <span>tu garantia.</span>
          </Headline>

          <BrandCopy>
            La infraestructura definitiva para el arquitecto digital moderno. Despliega
            contratos, gestiona hitos y recibe pagos sin fricciones.
          </BrandCopy>

          <BadgeRow>
            <StatusBadge>$ Protocolo Activo</StatusBadge>
            <SecondaryBadge>Seguridad Web3</SecondaryBadge>
          </BadgeRow>
        </BrandContent>
      </BrandingPane>

      <AuthPane>
        <AuthContent>
          <AuthTitle>Bienvenido de nuevo</AuthTitle>
          <AuthSubtitle>Accede a tu panel de control profesional.</AuthSubtitle>

          <AuthForm onSubmit={handleSubmit}>
            <FieldLabel htmlFor="email">Direccion de Email</FieldLabel>
            <StyledInput
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@arquitecto.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FieldLabel htmlFor="password">Contrasena</FieldLabel>
            <StyledInput
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Ingresa tu contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <SubmitButton type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? "Validando..." : "Continuar con Email"}</span>
              <ArrowIcon aria-hidden="true">→</ArrowIcon>
            </SubmitButton>
          </AuthForm>

          <DividerText>o mediante web3</DividerText>

          <WalletButton type="button" onClick={onWalletConnect}>
            <WalletIcon aria-hidden="true">◉</WalletIcon>
            <span>Conectar Billetera Web3</span>
          </WalletButton>

          <HelperText>
            Nuevo en Web3? Aprende por que usamos wallets.
          </HelperText>

          <FooterLinks>
            <FooterLink href="#">Terminos</FooterLink>
            <FooterLink href="#">Privacidad</FooterLink>
            <FooterLink href="#">Soporte</FooterLink>
          </FooterLinks>
        </AuthContent>
      </AuthPane>
    </LoginContainer>
  );
}

export const LoginContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #1c1c1f;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const BrandingPane = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background:
    radial-gradient(circle at 20% 10%, rgba(140, 59, 255, 0.3), transparent 45%),
    radial-gradient(circle at 78% 80%, rgba(83, 228, 137, 0.12), transparent 40%),
    linear-gradient(160deg, #12131a 0%, #111118 55%, #15172a 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
`;

const BrandOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(128deg, transparent 0%, rgba(83, 228, 137, 0.1) 38%, transparent 65%),
    linear-gradient(298deg, transparent 5%, rgba(140, 59, 255, 0.12) 35%, transparent 70%);
  pointer-events: none;
`;

const BrandContent = styled.div`
  position: relative;
  width: min(460px, 100%);
  color: #ffffff;
`;

const LogoPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const LogoIcon = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  color: #111111;
  background: linear-gradient(135deg, #c79eff 0%, #8c3bff 100%);
`;

const LogoText = styled.span`
  font-size: 1.92rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #d9d0e8;
`;

const Headline = styled.h1`
  margin: 0;
  display: grid;
  gap: 2px;
  font-size: clamp(2rem, 4.5vw, 3.35rem);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: #f4f3f8;
`;

const AccentLine = styled.span`
  color: #53e489;
`;

const BrandCopy = styled.p`
  margin: 24px 0 30px;
  max-width: 390px;
  color: rgba(236, 236, 242, 0.78);
  font-size: 1rem;
  line-height: 1.55;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 8px 12px;
  border-radius: 999px;
  color: #053218;
  font-weight: 700;
  background: rgba(83, 228, 137, 0.9);
`;

const SecondaryBadge = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 8px 12px;
  border-radius: 999px;
  color: rgba(244, 243, 248, 0.78);
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
`;

const AuthPane = styled.section`
  background: #1c1c1f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px;
`;

const AuthContent = styled.div`
  width: min(360px, 100%);
`;

const AuthTitle = styled.h2`
  margin: 0;
  color: #f7f7fb;
  font-size: 2rem;
  line-height: 1.12;
`;

const AuthSubtitle = styled.p`
  margin: 10px 0 28px;
  color: rgba(247, 247, 251, 0.64);
  font-size: 0.9rem;
`;

const AuthForm = styled.form`
  display: grid;
  gap: 10px;
`;

const FieldLabel = styled.label`
  color: rgba(247, 247, 251, 0.7);
  text-transform: uppercase;
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.08em;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  background: #0d0d12;
  color: #f7f7fb;
  font-size: 0.88rem;
  outline: none;

  &::placeholder {
    color: rgba(247, 247, 251, 0.4);
  }

  &:focus {
    border-color: rgba(140, 59, 255, 0.85);
    box-shadow: 0 0 0 3px rgba(140, 59, 255, 0.2);
  }
`;

export const SubmitButton = styled.button`
  margin-top: 8px;
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 6px;
  background: #2f3037;
  color: #f7f7fb;
  font-size: 0.86rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  font-size: 1rem;
  transform: translateY(-1px);
`;

const DividerText = styled.p`
  margin: 18px 0;
  text-align: center;
  color: rgba(247, 247, 251, 0.38);
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.11em;
`;

const WalletButton = styled.button`
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 7px;
  background: linear-gradient(90deg, #c79eff 0%, #8c3bff 100%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const WalletIcon = styled.span`
  width: 16px;
  height: 16px;
  display: inline-grid;
  place-items: center;
  border-radius: 4px;
  font-size: 0.56rem;
  background: rgba(28, 28, 31, 0.26);
`;

const HelperText = styled.p`
  margin: 12px 0 32px;
  text-align: center;
  color: rgba(247, 247, 251, 0.45);
  font-size: 0.7rem;
`;

const FooterLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const FooterLink = styled.a`
  color: rgba(247, 247, 251, 0.38);
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;

  &:hover {
    color: rgba(247, 247, 251, 0.7);
  }
`;
