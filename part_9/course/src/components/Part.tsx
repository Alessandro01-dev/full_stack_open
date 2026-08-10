import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  const header = <strong>{part.name} {part.exerciseCount}</strong>;

  switch (part.kind) {
    case "basic":
      return (
        <p>
          {header} <br />
          <em>{part.description}</em>
        </p>
      );
    case "group":
      return (
        <p>
          {header} <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {header} <br />
          <em>{part.description}</em> <br />
          submit to: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      );
    case "special":
      return (
        <p>
          {header} <br />
          <em>{part.description}</em> <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;