'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MatchedFreelancer } from '@/ia/matchServices';

export type MatchmakingResultsProps = {
  query: string;
  results: MatchedFreelancer[];
  status: 'success' | 'loading' | 'error' | 'empty';
};

export default function MatchmakingResults({ query, results, status }: MatchmakingResultsProps) {
  const router = useRouter();

  const handleCardClick = (f: MatchedFreelancer) => {
    router.push(`/agreement?freelancerId=${f.id_usuario}&servicioId=${f.id_servicio}`);
  };

  return (
    <PageContainer>
      {/* --- HEADER GLOBAL (Estilo Koda) --- */}
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

      <Shell>
        <Sidebar>
          <SideTop>
            <ProjectLabel>Resultados de</ProjectLabel>
            <ProjectContext>Matchmaking IA</ProjectContext>
          </SideTop>

          <NewJobButton onClick={() => (window.location.href = '/create-task')}>
            + Nueva Búsqueda
          </NewJobButton>

          <NavList>
            <NavItem $active>IA Matchmaking</NavItem>
            <NavItem>Escrow</NavItem>
            <NavItem>EIP-712</NavItem>
          </NavList>

          <DisabledList>
            <DisabledTitle>Phase 2/3 (Disabled)</DisabledTitle>
            <DisabledItem>Kleros Arbitration</DisabledItem>
            <DisabledItem>Chainlink Auto Delivery</DisabledItem>
          </DisabledList>
        </Sidebar>

        <Content>
          <Headline>IA Matchmaking: Resultados</Headline>

          {query && (
            <Subhead>
              Requerimiento analizado: <strong>&quot;{query}&quot;</strong>
              <br />
              Candidatos ordenados por porcentaje de coincidencia de skills.
            </Subhead>
          )}

          {status === 'loading' && <StateMessage>Analizando perfiles con IA...</StateMessage>}
          {status === 'error' && <StateMessage $error>Hubo un problema al procesar el matchmaking.</StateMessage>}
          {status === 'empty' && <StateMessage>Ingresá un requerimiento para buscar talento.</StateMessage>}

          {status === 'success' && (
            <>
              {results.length === 0 ? (
                <StateMessage>No se encontraron freelancers. Probá con otros términos.</StateMessage>
              ) : (
                <CardsGrid>
                  {results.map((f) => (
                    <FreelancerCard
                      key={`${f.id_usuario}-${f.id_servicio}`}
                      onClick={() => handleCardClick(f)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(f)}
                    >
                      <IdentityRow>
                        <Avatar>{getInitials(f.nombre)}</Avatar>
                        <IdentityText>
                          <Name>{f.nombre}</Name>
                          <Role>{f.titulo}</Role>
                        </IdentityText>
                        <EasBadge>Atribuciones Web3 (EAS)</EasBadge>
                      </IdentityRow>

                      <MetricsRow>
                        <MatchBadge>{f.match_score}% Match</MatchBadge>
                        <ScoreBlock>
                          <ScoreLabel>
                            Score de Confianza <span>{f.score_confianza ?? '—'}/100</span>
                          </ScoreLabel>
                          <ScoreTrack>
                            <ScoreFill $value={f.score_confianza ?? 0} />
                          </ScoreTrack>
                        </ScoreBlock>
                      </MetricsRow>

                      {f.descripcion && <Bio>{f.descripcion}</Bio>}

                      <SkillsRow>
                        {(f.skills ?? []).map((skill: string) => {
                          const matched = (f.matched_skills ?? []).includes(skill);
                          return (
                            <SkillTag key={skill} $matched={matched}>
                              {matched ? '✓ ' : ''}{skill}
                            </SkillTag>
                          );
                        })}
                      </SkillsRow>

                      <FooterRow>
                        <Price>
                          {f.precio_base != null ? `$${f.precio_base.toLocaleString()}` : '—'}
                        </Price>
                        <HintText>Click para contratar →</HintText>
                      </FooterRow>
                    </FreelancerCard>
                  ))}
                </CardsGrid>
              )}

              {results.length > 0 && (
                <FooterCta>
                  <FooterTitle>¿Listo para arrancar?</FooterTitle>
                  <TelegramButton type="button">
                    <TelegramIcon aria-hidden="true">✈</TelegramIcon>
                    Solicitar Entrevista (Telegram)
                  </TelegramButton>
                </FooterCta>
              )}
            </>
          )}
        </Content>
      </Shell>
    </PageContainer>
  );
}

function getInitials(name: string) {
  return (name ?? '').split(' ').map((n) => n[0] ?? '').join('').substring(0, 2).toUpperCase();
}

// ── Styled Components ────────────────────────────────────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #131318;
  color: #e4e1e8;
  font-family: 'Manrope', sans-serif;
`;

// -- Header Global --
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

// -- Layout Principal --
const Shell = styled.main`
  padding-top: 80px; /* Compensa la altura del header fijo */
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

const Sidebar = styled.aside`
  border-right: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg,#15151a 0%,#101015 100%);
  padding: 26px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 80px); /* Ocupa el alto exacto de la pantalla menos el header */
  position: sticky;
  top: 80px; /* Se queda pegado justo debajo del header */
`;

const SideTop = styled.div`
  margin-bottom: 12px;
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

const NewJobButton = styled.button`
  width:100%;min-height:42px;border:none;border-radius:8px;cursor:pointer;
  background:linear-gradient(135deg,#a266ff 0%,#8c3bff 70%);color:#fff;font-weight:700;font-size:.85rem;
  margin-bottom: 12px;
  transition: filter 0.2s;
  &:hover { filter: brightness(1.1); }
`;

const NavList = styled.nav`display:grid;gap:6px;`;
const NavItem = styled.button<{ $active?: boolean }>`
  width:100%;min-height:34px;text-align:left;border:none;border-radius:7px;
  background:${(p) => p.$active ? 'rgba(140,59,255,.18)' : 'transparent'};
  color:${(p) => p.$active ? '#f3ebff' : 'rgba(243,242,247,.64)'};
  font-size:.8rem;padding:0 12px;cursor:pointer;font-weight: ${(p) => p.$active ? "700" : "500"};
  transition: all 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.05); color: white; }
`;

const DisabledList = styled.div`margin-top:auto;border-top:1px solid rgba(255,255,255,.08);padding-top:16px;`;
const DisabledTitle = styled.p`margin:0 0 8px;color:rgba(243,242,247,.4);font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;`;
const DisabledItem = styled.p`margin:0 0 6px;color:rgba(243,242,247,.34);font-size:.75rem;text-decoration:line-through;`;

const Content = styled.section`padding:32px 40px;color:#f3f2f7;`;
const Headline = styled.h1`margin:0;color:#f3f2f7;font-size:clamp(1.45rem,3vw,2rem);letter-spacing:-.01em;font-weight: 800;`;
const Subhead = styled.p`margin:10px 0 24px;color:rgba(243,242,247,.62);max-width:780px;line-height:1.6;font-size: 0.95rem;`;

const StateMessage = styled.div<{ $error?: boolean }>`
  padding:20px;border-radius:12px;
  background:${(p) => p.$error ? 'rgba(255,89,89,.1)' : 'rgba(140,59,255,.1)'};
  color:${(p) => p.$error ? '#ff5959' : '#e3d2ff'};
  border:1px solid ${(p) => p.$error ? 'rgba(255,89,89,.2)' : 'rgba(140,59,255,.2)'};
  text-align:center;margin-bottom:24px;
`;

const CardsGrid = styled.div`display:grid;gap:16px;`;
const FreelancerCard = styled.article`
  background:linear-gradient(180deg,#222229 0%,#19191f 100%);
  border:1px solid rgba(255,255,255,.08);
  border-radius:14px;padding:20px;
  cursor:pointer;
  transition:border-color .2s, transform .2s;
  &:hover { border-color:rgba(140,59,255,.55); transform:translateY(-2px); }
  &:active { transform:translateY(0); }
`;
const IdentityRow = styled.div`display:flex;align-items:center;gap:12px;flex-wrap:wrap;`;
const Avatar = styled.div`
  width:48px;height:48px;border-radius:50%;display:grid;place-items:center;
  font-size:.9rem;font-weight:700;color:#fff;
  background:linear-gradient(135deg,#8c3bff 0%,#5f2bb5 100%);flex-shrink:0;
`;
const IdentityText = styled.div`flex:1;min-width:0;`;
const Name = styled.h3`margin:0;color:#f3f2f7;font-size:1.05rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
const Role = styled.p`margin:4px 0 0;color:rgba(243,242,247,.62);font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
const EasBadge = styled.span`
  margin-left:auto;border-radius:999px;padding:6px 12px;
  background:rgba(140,59,255,.16);border:1px solid rgba(140,59,255,.62);
  color:#e3d2ff;font-size:.75rem;font-weight:700;flex-shrink:0;
`;
const MetricsRow = styled.div`margin-top:16px;display:flex;align-items:center;gap:16px;`;
const MatchBadge = styled.span`
  min-width:98px;text-align:center;border-radius:999px;padding:8px 12px;
  background:rgba(83,228,137,.14);border:1px solid rgba(83,228,137,.72);
  color:#53e489;font-size:.85rem;font-weight:800;flex-shrink:0;
`;
const ScoreBlock = styled.div`flex:1;`;
const ScoreLabel = styled.p`
  margin:0 0 8px;display:flex;justify-content:space-between;
  color:rgba(243,242,247,.75);font-size:.8rem;
  span { color:#53e489;font-weight:700; }
`;
const ScoreTrack = styled.div`width:100%;height:8px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden;`;
const ScoreFill = styled.div<{ $value: number }>`
  height:100%;width:${(p) => Math.min(p.$value,100)}%;
  border-radius:999px;background:#53e489;transition:width 1s ease-in-out;
`;
const Bio = styled.p`
  margin:16px 0 12px;color:rgba(243,242,247,.72);line-height:1.6;font-size:.9rem;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;
`;
const SkillsRow = styled.div`display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;`;
const SkillTag = styled.span<{ $matched?: boolean }>`
  padding:6px 12px;border-radius:999px;font-size:.75rem;font-weight:600;
  background:${(p) => p.$matched ? 'rgba(83,228,137,.15)' : 'rgba(255,255,255,.05)'};
  color:${(p) => p.$matched ? '#53e489' : '#a2a2ab'};
  border:1px solid ${(p) => p.$matched ? 'rgba(83,228,137,.35)' : 'rgba(255,255,255,.1)'};
`;
const FooterRow = styled.div`display:flex;align-items:center;justify-content:space-between;margin-top:8px;`;
const Price = styled.div`font-size:1.2rem;font-weight:800;color:#f3f2f7;`;
const HintText = styled.span`
  font-size:.8rem;
  color:rgba(140,59,255,.8);
  font-weight:700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterCta = styled.footer`
  margin-top:32px;padding:24px;border-radius:14px;
  border:1px solid rgba(255,255,255,.1);
  background:linear-gradient(180deg,#1a1b22 0%,#16171e 100%);
  display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;
`;
const FooterTitle = styled.h2`margin:0;font-size:clamp(1.1rem,2.3vw,1.4rem);color:#f3f2f7;`;
const TelegramButton = styled.button`
  min-height:44px;border:1px solid rgba(136,177,255,.34);border-radius:10px;
  background:linear-gradient(180deg,#232936 0%,#1a1f2a 100%);
  color:#d6e5ff;font-size:.9rem;font-weight:700;padding:0 16px;
  display:inline-flex;align-items:center;gap:10px;cursor:pointer;transition:filter .2s;
  &:hover { filter:brightness(1.2); }
`;
const TelegramIcon = styled.span`
  width:20px;height:20px;display:inline-grid;place-items:center;
  border-radius:50%;background:rgba(136,177,255,.22);font-size:.75rem;
`;