import { z } from "zod";

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
