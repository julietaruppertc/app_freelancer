// src/app/agreement/useAgreementData.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/ia/supabaseClient';

export type FreelancerData = {
  id_usuario: number;
  nombre: string;
  wallet: string;         // columna real en tu tabla
  github: string | null;
  score_confianza: number | null;
};

export type ServicioData = {
  id_servicio: number;
  titulo: string;
  descripcion: string | null;
  precio_base: number | null;
};

export type AgreementData = {
  freelancer: FreelancerData | null;
  servicio: ServicioData | null;
  loading: boolean;
  error: string | null;
};

export function useAgreementData(
  freelancerId: string | null,
  servicioId: string | null
): AgreementData {
  const [freelancer, setFreelancer] = useState<FreelancerData | null>(null);
  const [servicio, setServicio] = useState<ServicioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!freelancerId || !servicioId) return;

    setLoading(true);
    setError(null);

    Promise.all([
      supabase
        .from('usuario')
        .select('id_usuario, nombre, wallet, github, score_confianza')
        .eq('id_usuario', freelancerId)
        .single(),

      supabase
        .from('servicio')
        .select('id_servicio, titulo, descripcion, precio_base')
        .eq('id_servicio', servicioId)
        .single(),
    ]).then(([userRes, servicioRes]) => {
      if (userRes.error) { setError(userRes.error.message); }
      else setFreelancer(userRes.data);

      if (servicioRes.error) { setError(servicioRes.error.message); }
      else setServicio(servicioRes.data);

      setLoading(false);
    });
  }, [freelancerId, servicioId]);

  return { freelancer, servicio, loading, error };
}