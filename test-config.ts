import { LoadMedicationSchema } from "./src/schemas/medications";

const badMed = {
    name: "Aspirin 500mg!",
    weight: 20,
    code: "aspirin_01",
    image: "not-a-link"
}

console.log("Checking BAd Medication...")
const result = LoadMedicationSchema.safeParse(badMed);

if (!result.success) {
  result.error.issues.forEach(issue => {
    console.log(`❌ [${issue.path}]: ${issue.message}`);
  })
}