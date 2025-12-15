import { z } from "zod";

//
interface GenerateBaseSchemaProps {
  fieldName?: string;
  fixedLength?: number;
  fixedLengthMessage?: string;
  min?: number | string;
  minErrorMessage?: string;
  max?: number | string;
  maxErrorMessage?: string;
  invalidTypeErrorMessage?: string;
  requiredErrorMessage?: string;
}

export const generateStringSchema = (input: GenerateBaseSchemaProps) => {
  const {
    fieldName,
    fixedLength,
    fixedLengthMessage,
    invalidTypeErrorMessage,
    max,
    maxErrorMessage,
    min,
    minErrorMessage,
    requiredErrorMessage,
  } = input;

  const name = fieldName || "Field";
  const minLength = Number(min ?? 1);
  const maxLength = Number(max);

  let schema = z
    .string({
      error: (iss) => {
        return iss.input === undefined
          ? requiredErrorMessage || `${name} is required.`
          : invalidTypeErrorMessage || `Invalid ${name}.`;
      },
    })
    .min(
      minLength,
      minErrorMessage || `${name} must have at least ${minLength} character(s)`
    );
  if (fixedLength) {
    schema = schema.length(
      fixedLength,
      fixedLengthMessage || `${name} must be ${fixedLength} character(s)`
    );
    if (maxLength) {
      schema = schema.max(
        maxLength,
        maxErrorMessage || `${name} must be at most ${maxLength} character(s)`
      );
    }
  }
  return schema;
};

export const generateNumericStringSchema = (input: GenerateBaseSchemaProps){
  const {
    fieldName,
    fixedLength,
    fixedLengthMessage,
    invalidTypeErrorMessage,
    max: maxLength,
    maxErrorMessage: maxLengthMessage,
    min: minLength,
    minErrorMessage: minLengthMessage,
    requiredErrorMessage,
  } = input;
  const name = fieldName || "Field";

  // creating and feeding arguments to the generating String Schema
  const schema = generateStringSchema({
    fieldName,
    fixedLength,
    fixedLengthMessage:
      fixedLengthMessage || `${name} must be ${fixedLength} digit(s)`,
    max:maxLength,
    maxErrorMessage:
      maxLengthMessage || `${name} must be at most ${maxLength} digit(s)`,
    min: minLength,
    minErrorMessage:
      minLengthMessage || `${name} must have at least ${minLength} digit(s)`,
    invalidTypeErrorMessage,
    requiredErrorMessage,
  }).regex(/^\d+$/, `${name} can only contain digits`);
  return schema;
}

export const generateDateString = (input: GenerateBaseSchemaProps)=>{
 const {
    fieldName,
    invalidTypeErrorMessage,
    max,
    maxErrorMessage,
    min,
    minErrorMessage,
    requiredErrorMessage,
  } = input;

  const name = fieldName || "Date";
  let dateSchema = z.date
}