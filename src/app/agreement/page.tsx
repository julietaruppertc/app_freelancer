"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import { useWallet } from "@/context/WalletContext";
import { useAgreementData } from "./useAgreementData";
import { hashAgreement } from "@blockchain/utils";
import { supabase } from "@/ia/supabaseClient";
import { ethers } from 'ethers';
// Ya importamos createEscrow y approveWork
import { createEscrow, approveWork } from "@blockchain/escrow";

// Wallet del árbitro del equipo para la hackathon
const ARBITER_ADDRESS = "0x8a27E08968D2DE77acCE0c871E9502b711235253";

export default function AgreementScreen() {
  const searchParams = useSearchParams();
  const freelancerId = searchParams.get("freelancerId");
  const servicioId = searchParams.get("servicioId");

  const { address, login, connecting } = useWallet();
  const { freelancer, servicio, loading, error } = useAgreementData(freelancerId, servicioId);

  // Form
  const [budget, setBudget] = useState("");
  const [deadlineDays, setDeadlineDays] = useState(
    servicio?.precio_base ? String(servicio.precio_base) : ""
  );
  const [specifications, setSpecifications] = useState(
    servicio?.descripcion ?? ""
  );

  // Estado de la transacción (Aquí agregué los de liberación de pago)
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  
  const [txHash, setTxHash] = useState<string | null>(null);
  const [signError, setSignError] = useState<string | null>(null);

  const canSign =
    !!address &&
    !!freelancer?.wallet &&
    !!budget &&
    !!deadlineDays &&
    !!specifications;

  const handleSign = async () => {
    if (!canSign || !freelancer || !servicio) return;
    setIsSigning(true);
    setSignError(null);

    try {
      // Sanitizar addresses — elimina espacios y caracteres invisibles
      const freelancerWallet = freelancer.wallet.trim().replace(/[^\x20-\x7E]/g, '');
      const clientAddress = address!.trim().replace(/[^\x20-\x7E]/g, '');

      if (!freelancerWallet || !ethers.isAddress(freelancerWallet)) {
        setSignError(`Wallet del freelancer inválida: "${freelancer.wallet}"`);
        setIsSigning(false);
        return;
      }

      if (!ethers.isAddress(ARBITER_ADDRESS)) {
        setSignError("ARBITER_ADDRESS no configurado correctamente");
        setIsSigning(false);
        return;
      }

      const agreementText = JSON.stringify({
        client: clientAddress,
        freelancer: freelancerWallet,
        servicioId: servicio.id_servicio,
        budget,
        deadlineDays,
        specifications,
        timestamp: Date.now(),
      });
      const agreementHash = hashAgreement(agreementText);

      const deadlineTimestamp =
        Math.floor(Date.now() / 1000) + parseInt(deadlineDays) * 86400;

      const receipt = await createEscrow(
        freelancerWallet,      // ← sanitizada
        ARBITER_ADDRESS.trim(),
        deadlineTimestamp,
        agreementHash,
        budget
      );

      const onchainId = receipt.hash ?? receipt.transactionHash;
      setTxHash(onchainId);

      const { data: clienteData } = await supabase
        .from('usuario')
        .select('id_usuario')
        .eq('wallet', clientAddress)
        .single();

      await supabase.from('acuerdos_escrow').insert({
        id_servicio: servicio.id_servicio,
        id_cliente: clienteData?.id_usuario ?? null,
        id_freelancer: freelancer.id_usuario,
        requisitos: specifications,
        precio_final: parseFloat(budget),
        deadline: new Date(deadlineTimestamp * 1000).toISOString(),
        hash_requi: agreementHash,
        id_escrow_onchain: onchainId,
        id_estado_escrow: 2,
      });

      setIsSigned(true);
    } catch (err: any) {
      setSignError(err?.message ?? "Error al firmar la transacción");
    } finally {
      setIsSigning(false);
    }
  };

  // NUEVA FUNCIÓN: Para liberar el pago
  const handleReleasePayment = async () => {
    if (!txHash || !freelancer) return; 
    
    setIsReleasing(true);
    setSignError(null);

    try {
      // Para la demo de la Hackathon, usaremos el ID 1 de escrow temporalmente
      // (En producción, esto saldría de la base de datos)
      const demoEscrowId = 1; 

      await approveWork(demoEscrowId); 
      
      // Actualizamos Supabase a estado 3 (Pagado/Finalizado)
      await supabase.from('acuerdos_escrow')
        .update({ id_estado_escrow: 3 }) 
        .eq('id_escrow_onchain', txHash);

      setIsReleased(true);
    } catch (err: any) {
      setSignError(err?.message ?? "Error al liberar fondos en la blockchain.");
    } finally {
      setIsReleasing(false);
    }
  };

  return (
    <PageContainer>
      {/* HEADER GLOBAL (Estilo Koda) */}
      <HeaderBar>
        <HeaderLeft>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Logo>koda</Logo>
          </Link>
          <DesktopNav>
            <NavLink href="#" $active>Discover</NavLink>
            <NavLink href="#">Feed</NavLink>
            <NavLink href="#">Messages</NavLink>
          </DesktopNav>
        </HeaderLeft>
        <HeaderRight>
          <Link href="/login" passHref style={{ textDecoration: 'none' }}>
            <LoginButton>Iniciar Sesión</LoginButton>
          </Link>
        </HeaderRight>
      </HeaderBar>

      <ContentWrapper>
        <Header>
          <Title>Acuerdo final del proyecto</Title>
          <Subtitle>
            Revisá los términos, conectá tu wallet y bloqueá los fondos en escrow.
          </Subtitle>
        </Header>

        {loading && <LoadingText>Cargando datos...</LoadingText>}
        {error && <ErrorText>Error: {error}</ErrorText>}

        {!loading && freelancer && servicio && (
          <>
            <AgreementCard>
              {/* Info del freelancer y servicio */}
              <FreelancerPreview>
                <PreviewAvatar>
                  {getInitials(freelancer.nombre)}
                </PreviewAvatar>
                <PreviewInfo>
                  <PreviewName>{freelancer.nombre}</PreviewName>
                  <PreviewRole>{servicio.titulo}</PreviewRole>
                  <PreviewWallet>{freelancer.wallet}</PreviewWallet>
                </PreviewInfo>
                {freelancer.score_confianza != null && (
                  <ScoreChip>⭐ {freelancer.score_confianza}/100</ScoreChip>
                )}
              </FreelancerPreview>

              <Divider />

              <Grid>
                <Section>
                  <Label>Monto a bloquear (BNB)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 0.05"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  {servicio.precio_base && (
                    <FieldHint>Precio base: ${servicio.precio_base.toLocaleString()}</FieldHint>
                  )}
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
                <Label>Requisitos / Especificaciones</Label>
                <TextArea
                  placeholder="Describe qué necesitás exactamente..."
                  value={specifications}
                  onChange={(e) => setSpecifications(e.target.value)}
                />
              </Section>

              <Footer>
                <FooterText>Red</FooterText>
                <FooterValue>BNB Smart Chain </FooterValue>
              </Footer>
            </AgreementCard>

            <ActionSection>
              {!address ? (
                <ConnectButton onClick={login} disabled={connecting}>
                  {connecting ? "Conectando..." : "🦊 Conectar Wallet para Firmar"}
                </ConnectButton>
              ) : (
                <WalletChip>✓ Conectado: {address.slice(0, 6)}...{address.slice(-4)}</WalletChip>
              )}

              <InfoBox>
                <InfoIcon>ℹ️</InfoIcon>
                <InfoText>
                  Al firmar, se genera un hash criptográfico del acuerdo y los fondos quedan
                  bloqueados en el contrato de escrow hasta que el trabajo sea aprobado.
                </InfoText>
              </InfoBox>

              <SignButton
                onClick={handleSign}
                disabled={isSigning || isSigned || !canSign}
                $isSigned={isSigned}
              >
                {isSigning
                  ? "Esperando confirmación en wallet..."
                  : isSigned
                  ? "✓ Escrow Creado On-Chain"
                  : "Firmar y Bloquear Fondos"}
              </SignButton>

              {/* NUEVO BOTÓN DE PAGO AL FREELANCER (Solo aparece si isSigned es true) */}
              {isSigned && (
                <ReleaseButton 
                  onClick={handleReleasePayment} 
                  disabled={isReleasing || isReleased}
                >
                  {isReleasing 
                    ? "Liberando pago en blockchain..." 
                    : isReleased 
                    ? "🎉 Pago liberado al Freelancer" 
                    : "Liberar Pago al Freelancer"}
                </ReleaseButton>
              )}

              {signError && <ErrorText>{signError}</ErrorText>}

              <StatusText>
                {isSigned && txHash
                  ? `Tx: ${txHash.slice(0, 10)}...${txHash.slice(-6)}`
                  : !address
                  ? "Conectá tu wallet para continuar"
                  : !canSign
                  ? "Completá todos los campos"
                  : "Listo para firmar"}
              </StatusText>
            </ActionSection>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}

function getInitials(name: string) {
  return (name ?? '').split(' ').map((n) => n[0] ?? '').join('').substring(0, 2).toUpperCase();
}

// ── Styled Components ──────────────────────────────────────────────────────

const PageContainer = styled.main`
  min-height:100vh;background:#131318;color:#e4e1e8;
  display:flex;justify-content:center;align-items:flex-start;
  padding:120px 20px 40px;font-family:'Manrope',sans-serif;
`;
const ContentWrapper = styled.div`width:100%;max-width:650px;display:flex;flex-direction:column;gap:32px;`;
const HeaderBar = styled.header`
  position:fixed;top:0;width:100%;height:80px;
  background:rgba(28,28,31,.7);backdrop-filter:blur(12px);
  display:flex;justify-content:space-between;align-items:center;
  padding:0 32px;z-index:50;border-bottom:1px solid rgba(255,255,255,.05);
`;
const HeaderLeft = styled.div`display:flex;align-items:center;gap:48px;`;
const Logo = styled.span`
  font-size:1.5rem;font-weight:bold;color:white;
  letter-spacing:-0.5px;
`;
const DesktopNav = styled.nav`
  display:none;gap:32px;
  @media(min-width:768px){display:flex;}
`;
const NavLink = styled.a<{ $active?: boolean }>`
  text-decoration:none;
  font-weight:${(p) => p.$active ? 'bold' : 'normal'};
  color:${(p) => p.$active ? '#8C3BFF' : '#9ca3af'};
  border-bottom:${(p) => p.$active ? '2px solid #8C3BFF' : 'none'};
  padding-bottom:4px;
  transition:color 0.2s;
  &:hover{color:white;}
`;
const HeaderRight = styled.div`display:flex;align-items:center;gap:24px;`;
const IconGroup = styled.div`display:flex;gap:16px;font-size:1.2rem;cursor:pointer;`;
const LoginButton = styled.span`
  background:#7000e3;color:white;padding:10px 24px;
  border-radius:12px;font-weight:bold;text-decoration:none;
  transition:all 0.2s;cursor:pointer;display:inline-block;
  &:hover{filter:brightness(1.1);}
  &:active{transform:scale(0.95);}
`;
const Header = styled.header`text-align:left;`;
const Title = styled.h1`font-size:2rem;font-weight:bold;color:#fff;margin:0 0 8px;`;
const Subtitle = styled.p`color:#c8c5cb;font-size:1rem;line-height:1.5;`;
const LoadingText = styled.p`color:#c8c5cb;text-align:center;`;
const ErrorText = styled.p`color:#ff5959;font-size:.85rem;text-align:center;`;
const AgreementCard = styled.article`
  background:#2a2a2f;border-radius:16px;padding:32px;
  border:1px solid rgba(255,255,255,.05);
  box-shadow:0 20px 40px rgba(0,0,0,.4);
  display:flex;flex-direction:column;gap:24px;
`;
const FreelancerPreview = styled.div`display:flex;align-items:center;gap:16px;flex-wrap:wrap;`;
const PreviewAvatar = styled.div`
  width:52px;height:52px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#8c3bff,#5f2bb5);
  display:grid;place-items:center;font-size:.9rem;font-weight:700;color:white;
`;
const PreviewInfo = styled.div`flex:1;min-width:0;`;
const PreviewName = styled.h3`margin:0;color:white;font-size:1.1rem;`;
const PreviewRole = styled.p`margin:2px 0 0;color:#c8c5cb;font-size:.85rem;`;
const PreviewWallet = styled.p`margin:4px 0 0;color:#8C3BFF;font-size:.7rem;font-family:monospace;word-break:break-all;`;
const ScoreChip = styled.span`
  background:rgba(83,228,137,.1);border:1px solid rgba(83,228,137,.3);
  color:#53e489;padding:6px 12px;border-radius:999px;font-size:.8rem;font-weight:700;
`;
const Divider = styled.hr`border:none;border-top:1px solid rgba(255,255,255,.07);margin:0;`;
const Section = styled.div`display:flex;flex-direction:column;gap:6px;`;
const Label = styled.label`font-size:.65rem;font-weight:bold;color:#c8c5cb;text-transform:uppercase;letter-spacing:.2em;`;
const Grid = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:24px;`;
const Input = styled.input`
  background:#1b1b20;border:1px solid rgba(255,255,255,.1);
  color:white;padding:14px;border-radius:10px;
  &:focus{outline:none;border-color:#8c3bff;}
`;
const FieldHint = styled.span`font-size:.7rem;color:#8C3BFF;`;
const TextArea = styled.textarea`
  background:#1b1b20;border:1px solid rgba(255,255,255,.1);
  color:white;padding:14px;border-radius:10px;min-height:130px;
  &:focus{outline:none;border-color:#8c3bff;}
`;
const Footer = styled.div`
  border-top:1px solid rgba(255,255,255,.1);padding-top:24px;
  display:flex;justify-content:space-between;
`;
const FooterText = styled.span`font-size:.875rem;color:#c8c5cb;`;
const FooterValue = styled.span`font-size:.875rem;font-weight:600;`;
const ActionSection = styled.div`display:flex;flex-direction:column;gap:24px;`;
const ConnectButton = styled.button`
  width:100%;background:#1b1b20;border:1px solid rgba(140,59,255,.4);
  color:white;font-size:1rem;font-weight:bold;padding:16px;
  border-radius:12px;cursor:pointer;
  &:hover{border-color:#8C3BFF;}
`;
const WalletChip = styled.div`
  background:rgba(83,228,137,.1);border:1px solid rgba(83,228,137,.3);
  color:#53e489;padding:12px 16px;border-radius:10px;
  font-size:.85rem;font-weight:600;font-family:monospace;
`;
const InfoBox = styled.div`
  background:#1b1b20;border:1px solid rgba(255,255,255,.1);
  border-radius:12px;padding:16px;display:flex;gap:12px;
`;
const InfoIcon = styled.span`font-size:1.2rem;`;
const InfoText = styled.p`font-size:.8rem;color:#c8c5cb;margin:0;`;
const SignButton = styled.button<{ $isSigned: boolean }>`
  width:100%;
  background:${(p) => p.$isSigned ? '#53E489' : '#8C3BFF'};
  color:${(p) => p.$isSigned ? '#00210d' : '#fff'};
  font-size:1.125rem;font-weight:bold;padding:20px;
  border-radius:12px;border:none;cursor:pointer;
  &:disabled{opacity:.5;cursor:not-allowed;}
`;

const ReleaseButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: -10px;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: #064e3b;
    color: #a7f3d0;
  }
`;

const StatusText = styled.p`text-align:center;font-size:.7rem;color:#c8c5cb;`;