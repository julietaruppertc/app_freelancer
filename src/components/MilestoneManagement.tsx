
// src/components/MilestoneManagement.tsx
"use client";

import React, { useState } from "react";
import styled from "styled-components";

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
    <Shell>
      <Sidebar>
        <SideTop>
          <Brand>FreelanceOS</Brand>
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
                <DropTitle>Arrastra y suelta aqui</DropTitle>
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
  );
}

const Shell = styled.main`
  min-height: 100vh;
  background: #1c1c1f;
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
`;

const SideTop = styled.div`
  margin-bottom: 14px;
`;

const Brand = styled.h2`
  margin: 0;
  color: #f5f4f9;
  font-size: 1rem;
`;

const ProjectContext = styled.p`
  margin: 4px 0 0;
  color: rgba(245, 244, 249, 0.58);
  font-size: 0.75rem;
`;

const SideNav = styled.nav`
  display: grid;
  gap: 6px;
`;

const SideItem = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  border: none;
  border-radius: 8px;
  text-align: left;
  padding: 0 10px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "rgba(140, 59, 255, 0.2)" : "transparent")};
  color: ${(props) => (props.$active ? "#f3ebff" : "rgba(245, 244, 249, 0.7)")};
  font-size: 0.82rem;
  font-weight: 600;
`;

const BottomButton = styled.button`
  margin-top: auto;
  min-height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
`;

const Main = styled.section`
  background: #1c1c1f;
  color: #f5f4f9;
`;

const TopBar = styled.header`
  min-height: 64px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
`;

const TopTabs = styled.nav`
  display: flex;
  gap: 8px;
`;

const TopTab = styled.button<{ $active?: boolean }>`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  background: ${(props) => (props.$active ? "rgba(140, 59, 255, 0.2)" : "transparent")};
  color: ${(props) => (props.$active ? "#f3ebff" : "rgba(245, 244, 249, 0.72)")};
`;

const ProfileChip = styled.div`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f5f4f9;
  font-size: 0.8rem;
  font-weight: 700;
`;

const ContentGrid = styled.div`
  padding: 24px 28px 28px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1.55fr 1fr;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.section``;

const RightCol = styled.aside`
  display: grid;
  gap: 14px;
  align-content: start;
`;

const ProjectTitle = styled.h1`
  margin: 0;
  color: #f5f4f9;
  font-size: clamp(1.3rem, 2.8vw, 1.85rem);
`;

const ProjectSubtitle = styled.p`
  margin: 8px 0 14px;
  max-width: 760px;
  color: rgba(245, 244, 249, 0.62);
  line-height: 1.5;
`;

const MilestoneList = styled.div`
  display: grid;
  gap: 10px;
`;

const MilestoneCard = styled.article`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #212128 0%, #18181f 100%);
  padding: 14px;
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
  font-size: 0.98rem;
`;

const StatusBadge = styled.span<{ $status: MilestoneStatus }>`
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  font-weight: 800;
  color: ${(props) => {
    if (props.$status === "completed") return "#052917";
    if (props.$status === "in-progress") return "#f0e7ff";
    return "rgba(245, 244, 249, 0.7)";
  }};
  background: ${(props) => {
    if (props.$status === "completed") return "rgba(83, 228, 137, 0.92)";
    if (props.$status === "in-progress") return "rgba(140, 59, 255, 0.88)";
    return "rgba(255, 255, 255, 0.12)";
  }};
`;

const ToggleRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ToggleLabel = styled.span`
  color: rgba(245, 244, 249, 0.72);
  font-size: 0.82rem;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  width: 46px;
  height: 26px;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  padding: 2px;
  background: ${(props) => (props.$active ? "rgba(83, 228, 137, 0.3)" : "rgba(255, 255, 255, 0.16)")};
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$active ? "flex-end" : "flex-start")};
  transition: background 0.15s ease;
`;

const ToggleCircle = styled.span<{ $active: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${(props) => (props.$active ? "#53e489" : "#c2c3c8")};
`;

const DeliveryCard = styled.section`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #212128 0%, #18181f 100%);
  padding: 14px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #f5f4f9;
  font-size: 1rem;
`;

const DropZone = styled.div`
  margin-top: 12px;
  min-height: 120px;
  border-radius: 10px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  display: grid;
  place-items: center;
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.02);
`;

const DropTitle = styled.p`
  margin: 0;
  color: #f5f4f9;
  font-size: 0.9rem;
  font-weight: 700;
`;

const DropHint = styled.p`
  margin: 4px 0 0;
  color: rgba(245, 244, 249, 0.58);
  font-size: 0.8rem;
`;

const InputLabel = styled.label`
  margin-top: 12px;
  display: block;
  color: rgba(245, 244, 249, 0.72);
  font-size: 0.75rem;
`;

const DeliveryInput = styled.input`
  margin-top: 6px;
  width: 100%;
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #111117;
  color: #f5f4f9;
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: rgba(140, 59, 255, 0.84);
    box-shadow: 0 0 0 3px rgba(140, 59, 255, 0.25);
  }
`;

const DeliverButton = styled.button`
  margin-top: 14px;
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 800;
`;

const EscrowCard = styled.section`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #212128 0%, #18181f 100%);
  padding: 14px;
`;

const DisabledFeaturesCard = styled.section`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #212128 0%, #18181f 100%);
  padding: 14px;
`;

const DisabledFeature = styled.p`
  margin: 10px 0 0;
  color: rgba(245, 244, 249, 0.42);
  font-size: 0.82rem;
  text-decoration: line-through;
`;

const BudgetValue = styled.p`
  margin: 8px 0 12px;
  font-size: 1.2rem;
  font-weight: 800;
  color: #f5f4f9;
`;

const TrackerBlock = styled.div`
  margin-top: 10px;
`;

const TrackerLabel = styled.p`
  margin: 0 0 6px;
  display: flex;
  justify-content: space-between;
  color: rgba(245, 244, 249, 0.75);
  font-size: 0.8rem;

  span {
    color: #f5f4f9;
    font-weight: 700;
  }
`;

const TrackerBar = styled.div`
  width: 100%;
  height: 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const TrackerFill = styled.div<{ $color: string; $width: number }>`
  width: ${(props) => `${props.$width}%`};
  height: 100%;
  background: ${(props) => props.$color};
  border-radius: 999px;
`;
