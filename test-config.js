"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var medications_1 = require("./src/schemas/medications");
var badMed = {
    name: "Aspirin 500mg!",
    weight: 20,
    code: "aspirin_01",
    image: "not-a-link"
};
console.log("Checking BAd Medication...");
var result = medications_1.LoadMedicationSchema.safeParse(badMed);
if (!result.success) {
    result.error.issues.forEach(function (issue) {
        console.log("\u274C [".concat(issue.path, "]: ").concat(issue.message));
    });
}
