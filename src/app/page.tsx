"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OnboardingLogin from "@/components/OnboardingLogin";
import TaskCreation from "@/components/TaskCreation";
import { useWallet } from "@/context/WalletContext";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  const { login, address, connecting } = useWallet();
  const router = useRouter();

  // Estado para persistencia de sesión
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("mvp_session_active") === "true";
    setIsAuthenticated(session || !!address);
  }, [address]);

  // Lógica de generación de match
  const handleGenerateMatch = async (payload: any) => {
    localStorage.setItem("mvp_last_task_prompt", payload.description);
    // Simulamos delay de IA/Gemini
    await new Promise((resolve) => setTimeout(resolve, 1800));
    router.push("/matchmaking"); // Navegamos a resultados
  };

  // Si no está autenticado, mostramos landing + onboarding
  return (
    <Container>
      {/* --- HEADER --- */}
      <Header>
        <HeaderLeft>
          <Logo>koda</Logo>
          <DesktopNav>
            <NavLink href="#" $active>
              Discover
            </NavLink>
            <NavLink href="#">Feed</NavLink>
            <NavLink href="#">Messages</NavLink>
          </DesktopNav>
        </HeaderLeft>
        <HeaderRight>
          <Link href="/login" passHref style={{ textDecoration: 'none' }}>
            <LoginButton>Iniciar Sesión</LoginButton>
          </Link>
        </HeaderRight>
      </Header>

      <Main>
        {/* --- HERO SECTION --- */}
        <HeroSection>
          <Badge>⚡ POWERED BY ARTIFICIAL INTELLIGENCE</Badge>
          <HeroTitle>
            La Nueva Era del <Highlight>Trabajo Digital</Highlight>
          </HeroTitle>
          <HeroSubtitle>
            Conectamos el talento técnico más avanzado con proyectos de frontera.
            Gestiona tu carrera freelance con una infraestructura diseñada para la eficiencia.
          </HeroSubtitle>
          <HeroButtons>
            <Link href="/create-task" passHref legacyBehavior>
              <PrimaryHeroButton>✨ Descubrir con IA</PrimaryHeroButton>
            </Link>
            <SecondaryHeroButton>Explorar Proyectos</SecondaryHeroButton>
          </HeroButtons>
        </HeroSection>

        {/* --- FEED SECTION --- */}
        <FeedSection>
          <FeedHeader>
            <div>
              <SectionTitle>Proyectos Activos</SectionTitle>
            </div>
            <FilterIcons>
              <IconButton>⚙️</IconButton>
              <IconButton>📱</IconButton>
            </FilterIcons>
          </FeedHeader>

          <Grid>
            {/* Card 1 */}
            <ProjectCard>
              <CardTop>
                <IconBox>🛡️</IconBox>
                <VerifiedTag>VERIFIED</VerifiedTag>
              </CardTop>
              <CardTitle>Smart Contract Audit</CardTitle>
              <CardDesc>
                Auditoría completa de seguridad para un protocolo de préstamos
                descentralizados en Ethereum.
              </CardDesc>
              <Tags>
                <Tag>Solidity</Tag>
                <Tag>DeFi</Tag>
              </Tags>
              <CardFooter>
                <Price>$4,500</Price>
                <Time>2d remaining</Time>
              </CardFooter>
            </ProjectCard>

            {/* Card 2 */}
            <ProjectCard>
              <CardTop>
                <IconBox>🎨</IconBox>
              </CardTop>
              <CardTitle>DApp UI/UX Design</CardTitle>
              <CardDesc>
                Rediseño integral de la interfaz de usuario para una plataforma
                de trading de NFTs institucionales.
              </CardDesc>
              <Tags>
                <Tag>Figma</Tag>
                <Tag>Web3</Tag>
              </Tags>
              <CardFooter>
                <Price>$3,200</Price>
                <Time>5h remaining</Time>
              </CardFooter>
            </ProjectCard>

            {/* Card CTA */}
            <CTACard>
              <CTATitle>¿Tienes un proyecto?</CTATitle>
              <CTASubtitle>Encontra a los mejores expertos en minutos.</CTASubtitle>
              <Link href="" passHref style={{ textDecoration: 'none' }}>
                <PublishButton>Publicar Ahora</PublishButton>
              </Link>
            </CTACard>
          </Grid>
        </FeedSection>
      </Main>
    </Container>
  );
}

// =============================
// STYLED COMPONENTS
// =============================
const Container = styled.div`
  min-height: 100vh;
  background-color: #131318;
  color: #e4e1e8;
  font-family: 'Manrope', sans-serif;
`;

const Header = styled.header`
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

const Main = styled.main`
  padding-top: 80px;
`;

// Hero Section
const HeroSection = styled.section`
  /* Modificado para que no empuje tanto hacia abajo */
  padding: 120px 24px 80px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(140, 59, 255, 0.1) 0%,
    transparent 70%
  );
`;

const Badge = styled.div`
  background: rgba(83, 228, 137, 0.1);
  color: #4ee086;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(83, 228, 137, 0.2);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 32px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(to right, #d5baff, #4ee086);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: #c8c5cb;
  max-width: 600px;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; /* Alinea los botones verticalmente si envuelven */
`;

const PrimaryHeroButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* Altura fija para que coincida perfecto con el secundario */
  box-sizing: border-box;
  background: #8c3bff;
  color: white;
  padding: 0 40px;
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 0 30px rgba(140, 59, 255, 0.4);
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 0 50px rgba(140, 59, 255, 0.6);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const SecondaryHeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* Altura fija para igualarlo */
  box-sizing: border-box;
  background: #1f1f24;
  border: 1px solid rgba(71, 70, 75, 0.2);
  color: white;
  padding: 0 40px;
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #343439;
  }
`;

// Feed Section
const FeedSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  /* Reducido el padding de arriba para acercarlo a la Hero Section */
  padding: 20px 32px 96px; 
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
  flex-wrap: wrap;
  gap: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  color: white;
  margin: 0 0 8px 0;
`;

const SectionSubtitle = styled.p`
  color: #c8c5cb;
  font-size: 1.125rem;
  margin: 0;
`;

const FilterIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconButton = styled.button`
  background: #1b1b20;
  border: none;
  padding: 12px;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  &:hover {
    background: #343439;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: #1f1f24;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  transition: all 0.3s;
  &:hover {
    background: #343439;
    border-color: rgba(213, 186, 255, 0.2);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(213, 186, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const VerifiedTag = styled.span`
  background: #00220d;
  color: #4ee086;
  font-size: 0.625rem;
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 999px;
  height: fit-content;
  letter-spacing: 1px;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin: 0 0 12px 0;
`;

const CardDesc = styled.p`
  color: #c8c5cb;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 24px 0;
  flex-grow: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  background: #343439;
  color: #c8c5cb;
  font-size: 0.625rem;
  padding: 4px 8px;
  border-radius: 6px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(71, 70, 75, 0.3);
  padding-top: 16px;
`;

const Price = styled.span`
  color: #4ee086;
  font-weight: bold;
`;

const Time = styled.span`
  color: #c8c5cb;
  font-size: 0.75rem;
`;

const CTACard = styled.div`
  background: linear-gradient(to bottom right, #7000e3, #d5baff);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
`;

const CTATitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0 0 16px 0;
`;

const CTASubtitle = styled.p`
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0 0 24px 0;
`;

const PublishButton = styled.span`
  background: white;
  color: #270057;
  padding: 12px;
  border-radius: 12px;
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
`;