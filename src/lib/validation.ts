import { z } from "zod";

// Хелпер для создания числового поля с русскими ошибками
const createNumberField = (min: number, max: number, minMsg: string, maxMsg: string) =>
  z.coerce
    .number({
      invalid_type_error: "Введите число",
      required_error: "Обязательное поле",
    })
    .min(min, minMsg)
    .max(max, maxMsg);

export const apacheSchema = z.object({
  // 1. Физиология
  temperature: createNumberField(20, 46, "Температура не может быть ниже 20", "Температура не может быть выше 46"),
  
  meanArterialPressure: createNumberField(20, 300, "АД слишком низкое", "АД слишком высокое (>300)"),
  
  heartRate: createNumberField(10, 300, "Пульс слишком низкий", "Пульс слишком высокий"),
  
  respiratoryRate: createNumberField(0, 100, "Неверное значение ЧДД", "ЧДД слишком высокое"),
  
  oxygenation: createNumberField(0, 800, "Неверное значение PaO2", "Слишком высокое PaO2"),
  
  arterialPH: createNumberField(6.5, 8.0, "pH несовместим с жизнью (<6.5)", "pH слишком высокий (>8.0)"),
  
  sodium: createNumberField(100, 200, "Натрий < 100", "Натрий > 200"),
  
  potassium: createNumberField(1, 15, "Калий < 1", "Калий > 15"),
  
  creatinine: createNumberField(0, 30, "Креатинин не может быть < 0", "Слишком высокий креатинин"),
  
  hematocrit: createNumberField(5, 80, "Гематокрит < 5%", "Гематокрит > 80%"),
  
  wbc: createNumberField(0, 200, "Лейкоциты < 0", "Лейкоциты > 200"),
  
  gcs: createNumberField(3, 15, "Минимум 3 балла", "Максимум 15 баллов"),

  // 2. Пациент
  age: createNumberField(18, 130, "Только для взрослых (18+)", "Некорректный возраст"),
  
  isEmergencySurgery: z.boolean().default(false),
  isAcuteRenalFailure: z.boolean().default(false),
  
  // 3. Хронические болезни
  chronicHealth: z.object({
    liverCirrhosis: z.boolean().default(false),
    heartFailureClassIV: z.boolean().default(false),
    copd: z.boolean().default(false),
    dialysis: z.boolean().default(false),
    immunocompromised: z.boolean().default(false),
  }),
});

export type ApacheSchemaType = z.infer<typeof apacheSchema>;