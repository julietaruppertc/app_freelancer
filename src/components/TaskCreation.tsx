"use client";

import React, { useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";

type TaskCreationPayload = {
  description: string;
  requestedAt: string;
};

type MatchSuggestion = {
  title: string;
  confidence: number;
  summary: string;
};

type TaskCreationProps = {
  onGenerateMatchmaking?: (
    payload: TaskCreationPayload
  ) => Promise<MatchSuggestion[]> | MatchSuggestion[];
};

const DEFAULT_RESULTS: MatchSuggestion[] = [
  {
    title: "Security Auditor Solidity Senior",
    confidence: 96,
    summary: "Experto en auditoria DeFi con enfoque en mitigacion de riesgos criticos.",
  },
  {
    title: "Protocol Engineer DeFi",
    confidence: 89,
    summary: "Diseno de arquitectura y hardening de contratos para protocolos en produccion.",
  },
  {
    title: "Smart Contract QA Specialist",
    confidence: 82,
    summary: "Cobertura de pruebas, fuzzing y validacion de escenarios de ataque.",
  },
];

export default function TaskCreation({ onGenerateMatchmaking }: TaskCreationProps) {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "results">("idle");
  const [results, setResults] = useState<MatchSuggestion[]>([]);
  const [error, setError] = useState("");

  const canSubmit = useMemo(
    () => description.trim().length >= 20 && status !== "loading",
    [description, status]
  );

  const handleGenerate = async () => {
    if (!canSubmit) return;

    setError("");
    setStatus("loading");

    const payload: TaskCreationPayload = {
      description: description.trim(),
      requestedAt: new Date().toISOString(),
    };

    try {
      const generated =
        (await onGenerateMatchmaking?.(payload)) ??
        (await new Promise<MatchSuggestion[]>((resolve) => {
          setTimeout(() => resolve(DEFAULT_RESULTS), 2200);
        }));

      setResults(generated);
      setStatus("results");
    } catch {
      setError("No se pudo generar el matchmaking. Intenta nuevamente.");
      setStatus("idle");
    }
  };

  return (
    <PageShell>
      <CenterColumn>
        {status !== "results" ? (
          <Card>
            <HeaderRow>
              <Eyebrow>Concierge IA</Eyebrow>
              <StatusChip>Online</StatusChip>
            </HeaderRow>

            <Title>Describe tu necesidad</Title>
            <Subtitle>
              Define los parametros del desafio tecnico para activar el flujo de matchmaking.
            </Subtitle>

            <DescriptionArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ejemplo: Necesito un desarrollador para auditar contratos en Solidity para un protocolo DeFi, incluir pruebas de seguridad y recomendaciones de hardening..."
              disabled={status === "loading"}
              maxLength={2500}
            />

            <MetaRow>
              <Hint>Minimo 20 caracteres para un analisis confiable.</Hint>
              <Counter>{description.length}/2500</Counter>
            </MetaRow>

            {status === "loading" ? (
              <LoadingBlock>
                <LoaderDot />
                <LoadingText>Gemini AI analizando requerimientos...</LoadingText>
              </LoadingBlock>
            ) : null}

            {error ? <ErrorText>{error}</ErrorText> : null}

            <ActionButton type="button" disabled={!canSubmit} onClick={handleGenerate}>
              Generar Matchmaking con IA
            </ActionButton>
          </Card>
        ) : (
          <ResultsCard>
            <HeaderRow>
              <Eyebrow>Matchmaking Results</Eyebrow>
              <StatusChip>$ {results.length} perfiles sugeridos</StatusChip>
            </HeaderRow>

            <ResultsTitle>Talento recomendado para tu proyecto</ResultsTitle>
            <ResultsSubtitle>
              Transicion completada. Estos perfiles son una simulacion inicial lista para conectar
              con la respuesta real del backend.
            </ResultsSubtitle>

            <ResultsList>
              {results.map((candidate) => (
                <ResultItem key={candidate.title}>
                  <ResultTopLine>
                    <ResultName>{candidate.title}</ResultName>
                    <Confidence>{candidate.confidence}% fit</Confidence>
                  </ResultTopLine>
                  <ResultSummary>{candidate.summary}</ResultSummary>
                </ResultItem>
              ))}
            </ResultsList>

            <SecondaryAction
              type="button"
              onClick={() => {
                setStatus("idle");
                setResults([]);
              }}
            >
              Crear otro requerimiento
            </SecondaryAction>
          </ResultsCard>
        )}
      </CenterColumn>
    </PageShell>
  );
}

const pulse = keyframes`
  0% { transform: scale(0.86); opacity: 0.5; }
  50% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(0.86); opacity: 0.5; }
`;

const shimmer = keyframes`
  from { background-position: 0% 50%; }
  to { background-position: 100% 50%; }
`;

const PageShell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(circle at 12% 10%, rgba(140, 59, 255, 0.24), transparent 36%),
    radial-gradient(circle at 88% 88%, rgba(83, 228, 137, 0.1), transparent 34%),
    #1c1c1f;
`;

const CenterColumn = styled.section`
  width: min(900px, 100%);
`;

const Card = styled.article`
  background: linear-gradient(180deg, #222229 0%, #1a1a20 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 28px;
  box-shadow:
    0 24px 58px rgba(0, 0, 0, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Eyebrow = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.11em;
`;

const StatusChip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  color: #062815;
  background: rgba(83, 228, 137, 0.9);
  font-size: 0.7rem;
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 14px 0 8px;
  color: #f5f4f9;
  font-size: clamp(1.7rem, 3.4vw, 2.4rem);
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  margin: 0 0 18px;
  color: rgba(245, 244, 249, 0.68);
  line-height: 1.5;
`;

const DescriptionArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  resize: vertical;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #111117;
  color: #f5f4f9;
  padding: 18px;
  font: inherit;
  line-height: 1.55;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba(245, 244, 249, 0.34);
  }

  &:focus {
    border-color: rgba(140, 59, 255, 0.9);
    box-shadow: 0 0 0 4px rgba(140, 59, 255, 0.25);
  }
`;

const MetaRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Hint = styled.span`
  color: rgba(245, 244, 249, 0.52);
  font-size: 0.78rem;
`;

const Counter = styled.span`
  color: rgba(245, 244, 249, 0.52);
  font-size: 0.78rem;
`;

const LoadingBlock = styled.div`
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(140, 59, 255, 0.45);
  background: linear-gradient(
    90deg,
    rgba(140, 59, 255, 0.12) 0%,
    rgba(140, 59, 255, 0.24) 48%,
    rgba(140, 59, 255, 0.12) 100%
  );
  background-size: 220% 220%;
  animation: ${shimmer} 1.6s linear infinite;
`;

const LoaderDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #53e489;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin: 0;
  color: #f5f4f9;
  font-size: 0.9rem;
`;

const ErrorText = styled.p`
  margin: 10px 0 0;
  color: #ff8fa3;
  font-size: 0.82rem;
`;

const ActionButton = styled.button`
  margin-top: 20px;
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #8c3bff 0%, #732edf 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease, opacity 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none;
  }
`;

const ResultsCard = styled(Card)`
  padding-bottom: 22px;
`;

const ResultsTitle = styled.h2`
  margin: 14px 0 8px;
  color: #f5f4f9;
  font-size: clamp(1.35rem, 2.8vw, 1.9rem);
`;

const ResultsSubtitle = styled.p`
  margin: 0 0 18px;
  color: rgba(245, 244, 249, 0.65);
`;

const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
`;

const ResultItem = styled.li`
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #121218;
`;

const ResultTopLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
`;

const ResultName = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 0.98rem;
`;

const Confidence = styled.span`
  color: #53e489;
  font-size: 0.82rem;
  font-weight: 700;
`;

const ResultSummary = styled.p`
  margin: 0;
  color: rgba(245, 244, 249, 0.7);
  font-size: 0.9rem;
  line-height: 1.45;
`;

const SecondaryAction = styled.button`
  margin-top: 16px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: transparent;
  color: #f5f4f9;
  cursor: pointer;
`;
