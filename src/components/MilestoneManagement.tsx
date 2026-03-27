"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

type MilestoneStatus = "completed" | "in-progress" | "pending";

type Milestone = {
  id: string;
  title: string;
  status: MilestoneStatus;
  githubDeliveryEnabled: boolean;
};

type MilestoneManagementProps = {
  isAuthenticated?: boolean;
};

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    status: "completed",
    githubDeliveryEnabled: true,
  },
  {
    id: "smart-contract-audit",
    title: "Smart Contract Audit",
    status: "in-progress",
    githubDeliveryEnabled: true,
  },
  {
    id: "wallet-integration",
    title: "Wallet Integration",
    status: "pending",
    githubDeliveryEnabled: false,
  },
];

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  pending: "Pending",
};

export default function MilestoneManagement({ isAuthenticated = false }: MilestoneManagementProps) {
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [deliveryInput, setDeliveryInput] = useState("");

  const toggleGithubDelivery = (id: string) => {
    setMilestones((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, githubDeliveryEnabled: !item.githubDeliveryEnabled }
          : item
      )
    );
  };

  return (
    <PageContainer>
      {/* --- HEADER GLOBAL (Igual que en Home y Agreement) --- */}
      <HeaderBar>
        <HeaderLeft>
          <Logo>Koda</Logo>
          <DesktopNav>
            <NavLink href="#" $active>Discover</NavLink>
            <NavLink href="#">Feed</NavLink>
            <NavLink href="#">Messages</NavLink>
          </DesktopNav>
        </HeaderLeft>
        <HeaderRight>
          <IconGroup><span>🔔</span><span>👤</span></IconGroup>
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <LoginButton>Home</LoginButton>
          </Link>
        </HeaderRight>
      </HeaderBar>

      <Shell>
        <Sidebar>
          <SideTop>
            <ProjectLabel>Proyecto Activo</ProjectLabel>
            <ProjectContext>Project Alpha</ProjectContext>
          </SideTop>

          <SideNav>
            <SideItem $active>Milestones</SideItem>
            <SideItem>Tasks</SideItem>
            <SideItem>Files</SideItem>
            <SideItem>Timeline</SideItem>
            {isAuthenticated ? <SideItem>Messages</SideItem> : null}
            {isAuthenticated ? <SideItem>Wallet</SideItem> : null}
            <SideItem>Escrow</SideItem>
          </SideNav>

          <BottomButton>+ New Task</BottomButton>
        </Sidebar>

        <Main>
          <TopBar>
            <TopTabs>
              <TopTab $active>Milestones</TopTab>
              {isAuthenticated ? <TopTab>Messages</TopTab> : null}
              {isAuthenticated ? <TopTab>Wallet</TopTab> : null}
            </TopTabs>
            <ProfileChip>Santi Dev</ProfileChip>
          </TopBar>

          <ContentGrid>
            <LeftCol>
              <ProjectTitle>Project Alpha: Core dApp Architecture</ProjectTitle>
              <ProjectSubtitle>
                Gestiona hitos verificables, habilita entregas por GitHub y conecta el pago con escrow on-chain.
              </ProjectSubtitle>

              <MilestoneList>
                {milestones.map((item) => (
                  <MilestoneCard key={item.id}>
                    <CardHead>
                      <MilestoneName>{item.title}</MilestoneName>
                      <StatusBadge $status={item.status}>
                        {STATUS_LABEL[item.status]}
                      </StatusBadge>
                    </CardHead>

                    <ToggleRow>
                      <ToggleLabel>Habilitar Entrega por GitHub</ToggleLabel>
                      <ToggleButton
                        type="button"
                        $active={item.githubDeliveryEnabled}
                        onClick={() => toggleGithubDelivery(item.id)}
                        aria-label={`Toggle GitHub delivery for ${item.title}`}
                      >
                        <ToggleCircle $active={item.githubDeliveryEnabled} />
                      </ToggleButton>
                    </ToggleRow>
                  </MilestoneCard>
                ))}
              </MilestoneList>
            </LeftCol>

            <RightCol>
              <DeliveryCard>
                <SectionTitle>Zona de Entrega</SectionTitle>
                <DropZone>
                  <DropTitle>Arrastra y suelta aquí</DropTitle>
                  <DropHint>GitHub links o archivos de entrega</DropHint>
                </DropZone>

                <InputLabel htmlFor="delivery-input">Enlace de evidencia (opcional)</InputLabel>
                <DeliveryInput
                  id="delivery-input"
                  value={deliveryInput}
                  onChange={(event) => setDeliveryInput(event.target.value)}
                  placeholder="https://github.com/usuario/repo/pull/123"
                />

                <DeliverButton type="button">Entregar Hito</DeliverButton>
              </DeliveryCard>

              <EscrowCard>
                <SectionTitle>Project Budget</SectionTitle>
                <BudgetValue>$12,400.00 USD</BudgetValue>

                <TrackerBlock>
                  <TrackerLabel>
                    Escrow Held <span>$7,900</span>
                  </TrackerLabel>
                  <TrackerBar>
                    <TrackerFill $color="#53E489" $width={64} />
                  </TrackerBar>
                </TrackerBlock>

                <TrackerBlock>
                  <TrackerLabel>
                    Released <span>$4,500</span>
                  </TrackerLabel>
                  <TrackerBar>
                    <TrackerFill $color="#8C3BFF" $width={36} />
                  </TrackerBar>
                </TrackerBlock>
              </EscrowCard>

              <DisabledFeaturesCard>
                <SectionTitle>Phase 2/3 Features</SectionTitle>
                <DisabledFeature>Kleros Arbitration (disabled for MVP)</DisabledFeature>
                <DisabledFeature>Chainlink Auto Delivery (disabled for MVP)</DisabledFeature>
              </DisabledFeaturesCard>
            </RightCol>
          </ContentGrid>
        </Main>
      </Shell>
    </PageContainer>
  );
}

// =============================
// STYLED COMPONENTS
// =============================

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #131318;
  color: #e4e1e8;
  font-family: 'Manrope', sans-serif;
`;

// -- Header Global (Estilo Koda) --
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
  letter-spacing: -0.5px;
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
  border-bottom: ${(props) => (props.$active ? "2px solid #8C3BFF" : "none")};
  padding-bottom: 4px;
  transition: color 0.2s;
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
  cursor: pointer;
`;

const LoginButton = styled.span`
  background: #7000e3;
  color: white;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  display: inline-block;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

// -- Contenedor Principal (Dashboard) --
const Shell = styled.div`
  padding-top: 80px; /* Compensa el header fijo */
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: linear-gradient(180deg, #15151a 0%, #0f1014 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
`;

const SideTop = styled.div`
  margin-bottom: 24px;
  padding: 0 10px;
`;

const ProjectLabel = styled.p`
  margin: 0;
  color: rgba(245, 244, 249, 0.5);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProjectContext = styled.h2`
  margin: 4px 0 0;
  color: #f5f4f9;
  font-size: 1.1rem;
  font-weight: 700;
`;

const SideNav = styled.nav`
  display: grid;
  gap: 6px;
`;

const SideItem = styled.button<{ $active?: boolean }>`
  min-height: 38px;
  border: none;
  border-radius: 8px;
  text-align: left;
  padding: 0 12px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "rgba(140, 59, 255, 0.15)" : "transparent")};
  color: ${(props) => (props.$active ? "#f3ebff" : "rgba(245, 244, 249, 0.7)")};
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
`;

const BottomButton = styled.button`
  margin-top: auto;
  min-height: 44px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Main = styled.section`
  background: #131318;
  color: #f5f4f9;
`;

const TopBar = styled.header`
  min-height: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background: rgba(28, 28, 31, 0.4);
`;

const TopTabs = styled.nav`
  display: flex;
  gap: 8px;
`;

const TopTab = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${(props) => (props.$active ? "rgba(140, 59, 255, 0.15)" : "transparent")};
  color: ${(props) => (props.$active ? "#f3ebff" : "rgba(245, 244, 249, 0.6)")};
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const ProfileChip = styled.div`
  min-height: 34px;
  padding: 0 16px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f5f4f9;
  font-size: 0.85rem;
  font-weight: 700;
`;

const ContentGrid = styled.div`
  padding: 32px 28px;
  display: grid;
  gap: 24px;
  grid-template-columns: 1.55fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.section``;

const RightCol = styled.aside`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const ProjectTitle = styled.h1`
  margin: 0;
  color: #f5f4f9;
  font-size: clamp(1.4rem, 2.8vw, 2rem);
  font-weight: 800;
`;

const ProjectSubtitle = styled.p`
  margin: 10px 0 24px;
  max-width: 760px;
  color: rgba(245, 244, 249, 0.62);
  line-height: 1.6;
  font-size: 0.95rem;
`;

const MilestoneList = styled.div`
  display: grid;
  gap: 12px;
`;

const MilestoneCard = styled.article`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #1b1b20;
  padding: 18px;
  transition: transform 0.2s, border-color 0.2s;

  &:hover {
    border-color: rgba(140, 59, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MilestoneName = styled.h3`
  margin: 0;
  color: #f5f4f9;
  font-size: 1.05rem;
`;

const StatusBadge = styled.span<{ $status: MilestoneStatus }>`
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 800;
  color: ${(props) => {
    if (props.$status === "completed") return "#052917";
    if (props.$status === "in-progress") return "#f0e7ff";
    return "rgba(245, 244, 249, 0.7)";
  }};
  background: ${(props) => {
    if (props.$status === "completed") return "rgba(83, 228, 137, 0.92)";
    if (props.$status === "in-progress") return "rgba(140, 59, 255, 0.88)";
    return "rgba(255, 255, 255, 0.08)";
  }};
`;

const ToggleRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const ToggleLabel = styled.span`
  color: rgba(245, 244, 249, 0.6);
  font-size: 0.85rem;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  width: 48px;
  height: 28px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  padding: 3px;
  background: ${(props) => (props.$active ? "rgba(83, 228, 137, 0.3)" : "rgba(255, 255, 255, 0.1)")};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$active ? "flex-end" : "flex-start")};
  transition: background 0.2s ease;
`;

const ToggleCircle = styled.span<{ $active: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#53e489" : "#8e8e93")};
  transition: all 0.2s ease;
`;

// -- Tarjetas de la columna derecha --
const DeliveryCard = styled.section`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #1b1b20;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #f5f4f9;
  font-size: 1.05rem;
  font-weight: 700;
`;

const DropZone = styled.div`
  margin-top: 16px;
  min-height: 120px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
  transition: background 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(140, 59, 255, 0.05);
    border-color: rgba(140, 59, 255, 0.4);
  }
`;

const DropTitle = styled.p`
  margin: 0;
  color: #f5f4f9;
  font-size: 0.95rem;
  font-weight: 700;
`;

const DropHint = styled.p`
  margin: 6px 0 0;
  color: rgba(245, 244, 249, 0.5);
  font-size: 0.85rem;
`;

const InputLabel = styled.label`
  margin-top: 16px;
  display: block;
  color: rgba(245, 244, 249, 0.6);
  font-size: 0.8rem;
`;

const DeliveryInput = styled.input`
  margin-top: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #131318;
  color: #f5f4f9;
  padding: 0 14px;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(140, 59, 255, 0.8);
    box-shadow: 0 0 0 3px rgba(140, 59, 255, 0.2);
  }
`;

const DeliverButton = styled.button`
  margin-top: 20px;
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const EscrowCard = styled.section`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #1b1b20;
  padding: 20px;
`;

const DisabledFeaturesCard = styled.section`
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #1b1b20;
  padding: 20px;
`;

const DisabledFeature = styled.p`
  margin: 12px 0 0;
  color: rgba(245, 244, 249, 0.4);
  font-size: 0.85rem;
  text-decoration: line-through;
`;

const BudgetValue = styled.p`
  margin: 10px 0 16px;
  font-size: 1.4rem;
  font-weight: 800;
  color: #f5f4f9;
`;

const TrackerBlock = styled.div`
  margin-top: 14px;
`;

const TrackerLabel = styled.p`
  margin: 0 0 8px;
  display: flex;
  justify-content: space-between;
  color: rgba(245, 244, 249, 0.7);
  font-size: 0.85rem;

  span {
    color: #f5f4f9;
    font-weight: 700;
  }
`;

const TrackerBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

const TrackerFill = styled.div<{ $color: string; $width: number }>`
  width: ${(props) => `${props.$width}%`};
  height: 100%;
  background: ${(props) => props.$color};
  border-radius: 999px;
  transition: width 1s ease-in-out;
`;