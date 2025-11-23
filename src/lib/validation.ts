import { z } from "zod";

// Упрощенный хелпер (убрали объект с invalid_type_error, который ломал Vercel)
const createNumberField = (min: number, max: number, minMsg: string, maxMsg: string) =>
  z.coerce
    .number() // <-- Убрали аргументы отсюда
    .min(min, minMsg)
    .max(max, maxMsg);

export const apacheSchema = z.object({
  // 1. Физиология
  temperature: createNumberField(20, 46, "Т < 20", "Т > 46"),
  
  meanArterialPressure: createNumberField(20, 300, "АД < 20", "АД > 300"),
  
  heartRate: createNumberField(10, 300, "Пульс < 10", "Пульс > 300"),
  
  respiratoryRate: createNumberField(0, 100, "ЧДД < 0", "ЧДД > 100"),
  
  oxygenation: createNumberField(0, 800, "PaO2 < 0", "PaO2 > 800"),
  
  arterialPH: createNumberField(6.5, 8.0, "pH < 6.5", "pH > 8.0"),
  
  sodium: createNumberField(100, 200, "Na < 100", "Na > 200"),
  
  potassium: createNumberField(1, 15, "K < 1", "K > 15"),
  
  creatinine: createNumberField(0, 30, "Cr < 0", "Cr > 30"),
  
  hematocrit: createNumberField(5, 80, "Ht < 5%", "Ht > 80%"),
  
  wbc: createNumberField(0, 200, "WBC < 0", "WBC > 200"),
  
  gcs: createNumberField(3, 15, "Мин. 3", "Макс. 15"),

  // 2. Пациент
  age: createNumberField(18, 130, "18+", "Некорректный возраст"),
  
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
