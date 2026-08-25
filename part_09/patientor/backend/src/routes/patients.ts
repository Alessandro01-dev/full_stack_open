import express, { type Response, type Request, type NextFunction } from 'express';
import { z } from 'zod';
import { NewPatientSchema, type NonSensitivePatient, type Patient, type NewPatientEntry, NewEntrySchema } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.post('/:id/entries', (req, res, next) => {
  try {

    const entryData = NewEntrySchema.parse(req.body);

    const addedEntry = patientService.addEntryToPatient(req.params.id, entryData);

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    next(error);
  }
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
