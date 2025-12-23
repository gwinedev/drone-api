"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDateString = exports.generateNumericStringSchema = exports.generateStringSchema = void 0;
var zod_1 = require("zod");
var generateStringSchema = function (input) {
    var fieldName = input.fieldName, fixedLength = input.fixedLength, fixedLengthMessage = input.fixedLengthMessage, invalidTypeErrorMessage = input.invalidTypeErrorMessage, max = input.max, maxErrorMessage = input.maxErrorMessage, min = input.min, minErrorMessage = input.minErrorMessage, requiredErrorMessage = input.requiredErrorMessage;
    var name = fieldName || "Field";
    var minLength = Number(min !== null && min !== void 0 ? min : 1);
    var maxLength = Number(max);
    var schema = zod_1.z
        .string({
        error: function (iss) {
            return iss.input === undefined
                ? requiredErrorMessage || "".concat(name, " is required.")
                : invalidTypeErrorMessage || "Invalid ".concat(name, ".");
        },
    })
        .min(minLength, minErrorMessage || "".concat(name, " must have at least ").concat(minLength, " character(s)"));
    if (fixedLength) {
        schema = schema.length(fixedLength, fixedLengthMessage || "".concat(name, " must be ").concat(fixedLength, " character(s)"));
        if (maxLength) {
            schema = schema.max(maxLength, maxErrorMessage || "".concat(name, " must be at most ").concat(maxLength, " character(s)"));
        }
    }
    return schema;
};
exports.generateStringSchema = generateStringSchema;
var generateNumericStringSchema = function (input) {
    var fieldName = input.fieldName, fixedLength = input.fixedLength, fixedLengthMessage = input.fixedLengthMessage, invalidTypeErrorMessage = input.invalidTypeErrorMessage, maxLength = input.max, maxLengthMessage = input.maxErrorMessage, minLength = input.min, minLengthMessage = input.minErrorMessage, requiredErrorMessage = input.requiredErrorMessage;
    var name = fieldName || "Field";
    // creating and feeding arguments to the generating String Schema
    var schema = (0, exports.generateStringSchema)({
        fieldName: fieldName,
        fixedLength: fixedLength,
        fixedLengthMessage: fixedLengthMessage || "".concat(name, " must be ").concat(fixedLength, " digit(s)"),
        max: maxLength,
        maxErrorMessage: maxLengthMessage || "".concat(name, " must be at most ").concat(maxLength, " digit(s)"),
        min: minLength,
        minErrorMessage: minLengthMessage || "".concat(name, " must have at least ").concat(minLength, " digit(s)"),
        invalidTypeErrorMessage: invalidTypeErrorMessage,
        requiredErrorMessage: requiredErrorMessage,
    }).regex(/^\d+$/, "".concat(name, " can only contain digits"));
    return schema;
};
exports.generateNumericStringSchema = generateNumericStringSchema;
var generateDateString = function (input) {
    var fieldName = input.fieldName, invalidTypeErrorMessage = input.invalidTypeErrorMessage, max = input.max, maxErrorMessage = input.maxErrorMessage, min = input.min, minErrorMessage = input.minErrorMessage, requiredErrorMessage = input.requiredErrorMessage;
    var name = fieldName || "Date";
    var dateSchema = zod_1.z.date({
        error: function (iss) {
            return iss.input === undefined
                ? requiredErrorMessage || "".concat(name, " is required.")
                : invalidTypeErrorMessage || "Invalid ".concat(name, ".");
        }
    });
    if (max) {
        var maxDate = new Date(max);
        dateSchema = dateSchema.max(new Date(maxDate), maxErrorMessage || "".concat(name, " must be before ").concat(new Date(maxDate).toDateString()));
    }
    if (min) {
        var minDate = new Date(min);
        dateSchema = dateSchema.min(new Date(minDate), minErrorMessage || "".concat(name, " must be after ").concat(new Date(min).toDateString()));
    }
    return zod_1.z.preprocess(function (arg) {
        if (typeof arg == "string" || arg instanceof Date) {
            return new Date(arg);
        }
        else {
            return arg;
        }
    }, dateSchema);
};
exports.generateDateString = generateDateString;
