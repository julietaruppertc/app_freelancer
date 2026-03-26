"use client";

import Link from "next/link";
import styled from "styled-components";

export default function HomeLandingPage() {
  return (
    <PageShell>
      <TopNav>
        <Brand href="/home">FreelancerOS</Brand>
        <NavLinks>
          <NavLink href="/home">Discover</NavLink>
          <NavLink href="/home">Feed</NavLink>
          <NavLink href="/milestones">Milestones</NavLink>
          <NavLink href="/matchmaking">Messages</NavLink>
        </NavLinks>
        <LoginButton href="/login">Iniciar Sesion</LoginButton>
      </TopNav>

      <HeroSection>
        <HeroGlow />
        <HeroContent>
          <AIBadge>Powered by Artificial Intelligence</AIBadge>
          <Headline>
            La Nueva Era del
            <br />
            Trabajo <AccentText>Digital</AccentText>
          </Headline>
          <Subtitle>
            Conectamos el talento freelancer con proyectos de frontera. Gestiona tu carrera
            mediante una infraestructura disenada para la economia Web3.
          </Subtitle>
          <HeroActions>
            <PrimaryCta href="/">Descubrir con IA</PrimaryCta>
            <SecondaryCta href="/matchmaking">Explorar Proyectos</SecondaryCta>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionHeader>
          <SectionTitle>Proyectos Activos</SectionTitle>
          <SectionSubtitle>
            Oportunidades seleccionadas para freelancers con perfil tecnologico.
          </SectionSubtitle>
        </SectionHeader>

        <ProjectsGrid>
          <ProjectCard>
            <CardTitle>Smart Contract Audit</CardTitle>
            <CardDescription>
              Analisis de seguridad para contratos inteligentes en protocolo DeFi.
            </CardDescription>
            <TagList>
              <Tag>Solidity</Tag>
              <Tag>DeFi</Tag>
            </TagList>
            <Price>$6,400</Price>
          </ProjectCard>

          <ProjectCard>
            <CardTitle>DApp UI/UX Design</CardTitle>
            <CardDescription>
              Diseno wallet-first para onboarding, conversion y usabilidad multi-chain.
            </CardDescription>
            <TagList>
              <Tag>UX/UI</Tag>
              <Tag>React</Tag>
            </TagList>
            <Price>$3,200</Price>
          </ProjectCard>

          <ProjectCard>
            <CardTitle>DeFi Protocol Review</CardTitle>
            <CardDescription>
              Evaluacion de arquitectura tecnica para escalar rendimiento y seguridad.
            </CardDescription>
            <TagList>
              <Tag>Protocol</Tag>
              <Tag>Web3</Tag>
            </TagList>
            <Price>$2,800</Price>
          </ProjectCard>

          <CtaCard>
            <CtaTitle>Tienes un proyecto?</CtaTitle>
            <CtaText>Publica tu necesidad y recibe talento validado por IA.</CtaText>
            <PublishButton href="/">Publicar Ahora</PublishButton>
          </CtaCard>
        </ProjectsGrid>
      </Section>

      <StatsBar>
        <StatItem>
          <StatValue>12k+</StatValue>
          <StatLabel>Talento Activo</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>$45M+</StatValue>
          <StatLabel>Pagado a Freelancers</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>98%</StatValue>
          <StatLabel>Satisfaccion</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue $success>2.4m</StatValue>
          <StatLabel>Lineas de Codigo</StatLabel>
        </StatItem>
      </StatsBar>
    </PageShell>
  );
}

const PageShell = styled.main`
  min-height: 100vh;
  background: #1c1c1f;
  color: #f7f7fb;
  padding: 18px 22px 26px;
`;

const TopNav = styled.header`
  max-width: 1180px;
  margin: 0 auto;
  min-height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(18, 18, 24, 0.85);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
`;

const Brand = styled(Link)`
  color: #f7f7fb;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const NavLink = styled(Link)`
  color: rgba(247, 247, 251, 0.72);
  text-decoration: none;
  font-size: 0.8rem;
`;

const LoginButton = styled(Link)`
  min-height: 34px;
  padding: 0 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  background: #8c3bff;
  color: #ffffff;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 700;
`;

const HeroSection = styled.section`
  position: relative;
  max-width: 1180px;
  margin: 14px auto 0;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  background:
    radial-gradient(circle at 14% 44%, rgba(140, 59, 255, 0.22), transparent 36%),
    radial-gradient(circle at 72% 24%, rgba(140, 59, 255, 0.16), transparent 30%),
    linear-gradient(180deg, #12121b 0%, #0f1016 100%);
  min-height: 330px;
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 24% 72%, rgba(140, 59, 255, 0.22), transparent 42%),
    radial-gradient(circle at 72% 76%, rgba(140, 59, 255, 0.16), transparent 42%);
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 700px;
  padding: 34px 30px;
`;

const AIBadge = styled.span`
  display: inline-block;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.63rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #042312;
  background: #53e489;
`;

const Headline = styled.h1`
  margin: 16px 0 10px;
  font-size: clamp(2rem, 4.2vw, 3.55rem);
  line-height: 1.03;
  letter-spacing: -0.03em;
`;

const AccentText = styled.span`
  color: #53e489;
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 580px;
  color: rgba(247, 247, 251, 0.72);
  font-size: 0.93rem;
  line-height: 1.58;
`;

const HeroActions = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  min-height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #a266ff 0%, #8c3bff 70%);
  color: #ffffff;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 800;
`;

const SecondaryCta = styled(Link)`
  min-height: 42px;
  padding: 0 16px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f7f7fb;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
`;

const Section = styled.section`
  max-width: 1180px;
  margin: 20px auto 0;
`;

const SectionHeader = styled.div`
  margin-bottom: 14px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.65rem;
`;

const SectionSubtitle = styled.p`
  margin: 5px 0 0;
  color: rgba(247, 247, 251, 0.62);
  font-size: 0.88rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1060px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  min-height: 210px;
  border-radius: 14px;
  padding: 14px;
  background: #2a2a2f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1rem;
`;

const CardDescription = styled.p`
  margin: 0;
  color: rgba(247, 247, 251, 0.65);
  font-size: 0.8rem;
  line-height: 1.45;
`;

const TagList = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  border-radius: 999px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(247, 247, 251, 0.75);
  font-size: 0.67rem;
`;

const Price = styled.p`
  margin: auto 0 0;
  color: #53e489;
  font-size: 0.95rem;
  font-weight: 800;
`;

const CtaCard = styled.article`
  min-height: 210px;
  border-radius: 14px;
  padding: 18px 14px;
  background: linear-gradient(145deg, #8c3bff 0%, #ab72ff 100%);
  display: flex;
  flex-direction: column;
`;

const CtaTitle = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 1.2rem;
`;

const CtaText = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.84rem;
`;

const PublishButton = styled(Link)`
  margin-top: auto;
  min-height: 38px;
  border-radius: 8px;
  background: #ffffff;
  color: #6f2adb;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.8rem;
`;

const StatsBar = styled.footer`
  max-width: 1180px;
  margin: 18px auto 0;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #16161d;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  padding: 14px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.p<{ $success?: boolean }>`
  margin: 0;
  color: ${(props) => (props.$success ? "#53e489" : "#f7f7fb")};
  font-size: 1.3rem;
  font-weight: 800;
`;

const StatLabel = styled.p`
  margin: 3px 0 0;
  color: rgba(247, 247, 251, 0.62);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;
