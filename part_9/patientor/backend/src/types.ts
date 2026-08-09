import { z } from 'zod';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    occupation: z.string(),
    dateOfBirth: z.iso.date(),
    gender: z.enum(Gender),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatientEntry {
    id: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;