'use client';

import React from 'react';
import styled from 'styled-components';
import { MatchedFreelancer } from '@/ia/matchServices';

export type MatchmakingResultsProps = {
  query: string;
  results: MatchedFreelancer[];
  status: 'success' | 'loading' | 'error' | 'empty';
};

export default function MatchmakingResults({ query, results, status }: MatchmakingResultsProps) {
  return (
    <Shell>
      <Sidebar>
        <Brand>FreelancerOS</Brand>
        <SideMeta>Project Dashboard</SideMeta>
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

        {status === 'loading' && (
          <StateMessage>Analizando perfiles con IA...</StateMessage>
        )}

        {status === 'error' && (
          <StateMessage $error>
            Hubo un problema al procesar el matchmaking. Revisá la consola para más detalles.
          </StateMessage>
        )}

        {status === 'empty' && (
          <StateMessage>Ingresá un requerimiento para buscar talento.</StateMessage>
        )}

        {status === 'success' && (
          <>
            {results.length === 0 ? (
              <StateMessage>
                No se encontraron freelancers que coincidan. Probá con otros términos.
              </StateMessage>
            ) : (
              <CardsGrid>
                {results.map((f) => (
                  <FreelancerCard key={`${f.id_usuario}-${f.id_servicio}`}>

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
                      <ViewButton type="button">Ver Perfil Completo</ViewButton>
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
  );
}

function getInitials(name: string) {
  return (name ?? '')
    .split(' ')
    .map((n) => n[0] ?? '')
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

// ==========================================
// STYLED COMPONENTS
// ==========================================

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
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, #15151a 0%, #101015 100%);
  padding: 26px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Brand = styled.h2`
  margin: 0;
  color: #f3f2f7;
  font-size: 1rem;
  letter-spacing: 0.02em;
`;

const SideMeta = styled.p`
  margin: 0 0 12px;
  color: rgba(243, 242, 247, 0.48);
  font-size: 0.74rem;
`;

const NewJobButton = styled.button`
  width: 100%;
  min-height: 42px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
`;

const NavList = styled.nav`
  margin-top: 12px;
  display: grid;
  gap: 6px;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  min-height: 34px;
  text-align: left;
  border: none;
  border-radius: 7px;
  background: ${(p) => (p.$active ? 'rgba(140, 59, 255, 0.18)' : 'transparent')};
  color: ${(p) => (p.$active ? '#f3ebff' : 'rgba(243, 242, 247, 0.64)')};
  font-size: 0.8rem;
  padding: 0 10px;
  cursor: pointer;
`;

const DisabledList = styled.div`
  margin-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
`;

const DisabledTitle = styled.p`
  margin: 0 0 8px;
  color: rgba(243, 242, 247, 0.4);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const DisabledItem = styled.p`
  margin: 0 0 6px;
  color: rgba(243, 242, 247, 0.34);
  font-size: 0.75rem;
  text-decoration: line-through;
`;

const Content = styled.section`
  padding: 30px;
  color: #f3f2f7;
`;

const Headline = styled.h1`
  margin: 0;
  color: #f3f2f7;
  font-size: clamp(1.45rem, 3vw, 2rem);
  letter-spacing: -0.01em;
`;

const Subhead = styled.p`
  margin: 10px 0 22px;
  color: rgba(243, 242, 247, 0.62);
  max-width: 780px;
  line-height: 1.5;
`;

const StateMessage = styled.div<{ $error?: boolean }>`
  padding: 20px;
  border-radius: 12px;
  background: ${(p) => (p.$error ? 'rgba(255, 89, 89, 0.1)' : 'rgba(140, 59, 255, 0.1)')};
  color: ${(p) => (p.$error ? '#ff5959' : '#e3d2ff')};
  border: 1px solid ${(p) => (p.$error ? 'rgba(255, 89, 89, 0.2)' : 'rgba(140, 59, 255, 0.2)')};
  text-align: center;
  margin-bottom: 24px;
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 14px;
`;

const FreelancerCard = styled.article`
  background: linear-gradient(180deg, #222229 0%, #19191f 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(140, 59, 255, 0.45);
  }
`;

const IdentityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #8c3bff 0%, #5f2bb5 100%);
  flex-shrink: 0;
`;

const IdentityText = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.h3`
  margin: 0;
  color: #f3f2f7;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Role = styled.p`
  margin: 2px 0 0;
  color: rgba(243, 242, 247, 0.62);
  font-size: 0.82rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EasBadge = styled.span`
  margin-left: auto;
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(140, 59, 255, 0.16);
  border: 1px solid rgba(140, 59, 255, 0.62);
  color: #e3d2ff;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const MetricsRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const MatchBadge = styled.span`
  min-width: 98px;
  text-align: center;
  border-radius: 999px;
  padding: 8px 10px;
  background: rgba(83, 228, 137, 0.14);
  border: 1px solid rgba(83, 228, 137, 0.72);
  color: #53e489;
  font-size: 0.82rem;
  font-weight: 800;
  flex-shrink: 0;
`;

const ScoreBlock = styled.div`
  flex: 1;
`;

const ScoreLabel = styled.p`
  margin: 0 0 6px;
  display: flex;
  justify-content: space-between;
  color: rgba(243, 242, 247, 0.75);
  font-size: 0.76rem;

  span {
    color: #53e489;
    font-weight: 700;
  }
`;

const ScoreTrack = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const ScoreFill = styled.div<{ $value: number }>`
  height: 100%;
  width: ${(p) => Math.min(p.$value, 100)}%;
  border-radius: 999px;
  background: #53e489;
  transition: width 1s ease-in-out;
`;

const Bio = styled.p`
  margin: 14px 0 8px;
  color: rgba(243, 242, 247, 0.72);
  line-height: 1.5;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SkillsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const SkillTag = styled.span<{ $matched?: boolean }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.73rem;
  font-weight: 600;
  background: ${(p) => (p.$matched ? 'rgba(83, 228, 137, 0.15)' : 'rgba(255, 255, 255, 0.05)')};
  color: ${(p) => (p.$matched ? '#53e489' : '#a2a2ab')};
  border: 1px solid ${(p) => (p.$matched ? 'rgba(83, 228, 137, 0.35)' : 'rgba(255, 255, 255, 0.1)')};
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  color: #f3f2f7;
`;

const ViewButton = styled.button`
  min-height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: transparent;
  color: #f3f2f7;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0 14px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FooterCta = styled.footer`
  margin-top: 24px;
  padding: 20px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, #1a1b22 0%, #16171e 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`;

const FooterTitle = styled.h2`
  margin: 0;
  font-size: clamp(1rem, 2.3vw, 1.3rem);
  color: #f3f2f7;
`;

const TelegramButton = styled.button`
  min-height: 42px;
  border: 1px solid rgba(136, 177, 255, 0.34);
  border-radius: 10px;
  background: linear-gradient(180deg, #232936 0%, #1a1f2a 100%);
  color: #d6e5ff;
  font-size: 0.86rem;
  font-weight: 700;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.2);
  }
`;

const TelegramIcon = styled.span`
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(136, 177, 255, 0.22);
  font-size: 0.7rem;
`;