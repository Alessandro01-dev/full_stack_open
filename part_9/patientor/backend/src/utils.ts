import type { NewPatientEntry } from './types.ts';
import { Gender } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field)) {
    throw new Error(`Incorrect or missing field: ${fieldName}`);
  }
  return field;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v as string).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {

  console.log("ricevuto l'oggetto:", object);

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, 'name'),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseStringField(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation'),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;