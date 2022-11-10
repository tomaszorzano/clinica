export class Usuario {
    id!: string;
    nombre!: string;
    apellido!: string;
    edad!: string;
    DNI!: string;
    email!: string;
    password!: string;
    tipoUsuario!: string;
    especialista!: boolean;
    paciente!: boolean;
    administrador!: boolean;
    obraSocial!: string;
    especialidades!: any[];
    img1Nombre!: string;
    img1Url!: string;
    img2Nombre!: string;
    img2Url!: string;
    habilitado!: boolean;
    horarios!: string;
}