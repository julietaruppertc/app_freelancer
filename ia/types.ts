export interface Skill {
    id_skill: number;
    nombre: string;
}

export interface Usuario {
    id_usuario: number;
    nombre: string;
    wallet: string;
    score_confianza: number;
}

export interface Servicio {
    id_servicio: number;
    titulo: string;
    descripcion: string;
    precio_base: number;
    id_usuario: number;
    skills: Skill[];
    score_confianza: number; // de usuario
}