import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  target: number;
  dailyHours: number[];
}

export const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);

  const dailyHours = args.slice(3).map(Number);

  if (isNotNumber(args[2]) || dailyHours.some((h) => isNotNumber(h))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    target,
    dailyHours,
  };
};

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): Result => {
  const trainingDays = dailyHours.filter((h) => h > 0).length;

  const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / dailyHours.length;

  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average < target - 0.5) {
    rating = 1;
    ratingDescription = "bad, you need to work harder";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "excellent job, target met!";
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
