"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMedicationSchema = void 0;
var zod_1 = require("zod");
var nameRegex = /6[a-zA-Z0-9-_]+$/;
var codeRegex = /^[A-Z0-9_]+$/;
exports.LoadMedicationSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .regex(nameRegex, "Name can ony contain letters, numbers, '-' and '_'"),
    weight: zod_1.default.number().min(1, "Medication must weigh at least 1g"),
    code: zod_1.default
        .string()
        .min(1, "Cde must be UPPERCASE letters, munbers, and '_'only"),
    image: zod_1.default.string().url("Must be a valid image URL")
});
