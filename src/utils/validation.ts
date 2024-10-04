import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required(),
  address: Joi.string().required(),
  ClinicId: Joi.number().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
  role: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required(),
});

export const clinicSchema = Joi.object({
  name: Joi.string().min(5).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  telePhoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
  whatsappNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
  ownerEmail: Joi.string().email().required(),
  ownerName: Joi.string().min(5).max(255).required(),
  ownerAddress: Joi.string().min(5).max(255).required(),
  ownerPhone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
});

export const patientSchema = Joi.object({
  fullName: Joi.string().min(5).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
    }),
  age: Joi.number().greater(0).less(110).required(),
  gender: Joi.string().required(),
  habits: Joi.string().required(),
  birthDate: Joi.date().required(),
  clinicId: Joi.number().greater(0).required(),
});

export const medicationSchema = Joi.object({
  medicationList: Joi.string().max(255).required(),
  allergyList: Joi.string().max(255).required(),
});

export const diseaseSchema = Joi.object({
  diseaseList: Joi.string().max(255).required(),
  notes: Joi.string().max(255),
});

export const complaintSchema = Joi.object({
  complaintText: Joi.string().max(255).required(),
  consultation: Joi.string().max(255).required(),
});

export const appointmentSchema = Joi.object({
  // PatientId: Joi.number().integer().positive().required().messages({
  //   "number.base": "ID must be a number.",
  //   "number.integer": "ID must be an integer.",
  //   "number.positive": "ID must be a positive number.",
  // }),
  date: Joi.date().required().messages({
    "date.base": "date must be in the format yyyy-mm-dd",
    "date.format": "date must be in the format yyyy-mm-dd",
    "any.required": "date is a required field",
  }),
  startTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/)
    .required()
    .messages({
      "string.pattern.base": "startTime must be in the format HH:MM:SS.",
      "string.empty": "Start time is required.",
      "any.required": "Start time is required.",
    }),
  endTime: Joi.string()
    .pattern(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/)
    .required()
    .messages({
      "string.pattern.base": "endTime must be in the format HH:MM:SS.",
      "string.empty": "End time is required.",
      "any.required": "End time is required.",
    }),
  complaint: Joi.string().max(255).required(),
  patientName: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Patient name is required.",
    "any.required": "Patient name is required.",
  }),
  patientPhone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
      "string.empty": "Patient phone number is required.",
      "any.required": "Patient phone number is required.",
    }),
});

export const waitingListSchema = Joi.object({
  // PatientId: Joi.number().integer().positive().required().messages({
  //   "number.base": "ID must be a number.",
  //   "number.integer": "ID must be an integer.",
  //   "number.positive": "ID must be a positive number.",
  // }),
  date: Joi.date().required().messages({
    "date.base": "date must be in the format yyyy-mm-dd",
    "date.format": "date must be in the format yyyy-mm-dd",
    "any.required": "date is a required field",
  }),
  patientName: Joi.string().min(1).max(255).required(),
  patientPhone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be between 10 and 15 digits, only contains 0-9 or +",
      "string.empty": "Patient phone number is required.",
      "any.required": "Patient phone number is required.",
    }),
});

export const treatmentSchema = Joi.object({
  title: Joi.string().max(255).required(),
  category: Joi.string().max(255).required(),
  defaultCost: Joi.number().required(),
  description: Joi.string().max(255).required().allow(null),
  color: Joi.string().max(255).required().allow(null),
});

export const treatmentPlanSchema = Joi.object({
  discount: Joi.number().required(),
  sessionNumber: Joi.number().required(),
  totalCost: Joi.number().required().allow(null),
  isCompleted: Joi.boolean(),
});

export const completedTreatmentSchema = Joi.object({
  treatmentId: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
  }),
  fromTeeth: Joi.number()
    .integer()
    .min(1)
    .max(32)
    .allow(null)
    .required()
    .messages({
      "number.min": "fromTeeth must be at least 1.",
      "number.max": "fromTeeth must be at most 32.",
    }),
  toTeeth: Joi.number()
    .integer()
    .min(1)
    .max(32)
    .allow(null)
    .required()
    .messages({
      "number.min": "toTeeth must be at least 1.",
      "number.max": "toTeeth must be at most 32.",
    }),
  place: Joi.string().valid("tooth", "gums", "mouth").required().messages({
    "any.only": "place must be one of ['tooth', 'gums', 'mouth'].",
  }),
  notes: Joi.string().max(255).required(),
});

export const TreatmentDetailsSchema = Joi.object({
  treatmentId: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
  }),
  fromTeeth: Joi.number()
    .integer()
    .min(1)
    .max(32)
    .allow(null)
    .required()
    .messages({
      "number.min": "fromTeeth must be at least 1.",
      "number.max": "fromTeeth must be at most 32.",
    }),
  toTeeth: Joi.number()
    .integer()
    .min(1)
    .max(32)
    .allow(null)
    .required()
    .messages({
      "number.min": "toTeeth must be at least 1.",
      "number.max": "toTeeth must be at most 32.",
    }),
  place: Joi.string().valid("tooth", "gums", "mouth").required().messages({
    "any.only": "place must be one of ['tooth', 'gums', 'mouth'].",
  }),
  cost: Joi.number().required(),
});
