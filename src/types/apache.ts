// src/types/apache.ts

// 1. Физиологические параметры (APS - Acute Physiology Score)
export interface ApachePhysiology {
  temperature: number;      // Температура (C) - ректальная
  meanArterialPressure: number; // Среднее АД (mm Hg)
  heartRate: number;        // ЧСС (уд/мин)
  respiratoryRate: number;  // ЧДД (дых/мин)
  oxygenation: number;      // PaO2 (если FiO2 < 50%) или A-aDO2 (если FiO2 >= 50%)
  arterialPH: number;       // pH артериальной крови
  sodium: number;           // Натрий (mmol/L)
  potassium: number;        // Калий (mmol/L)
  creatinine: number;       // Креатинин (mg/dL или мкмоль/л - будем считать в mg/dL для стандарта)
  hematocrit: number;       // Гематокрит (%)
  wbc: number;              // Лейкоциты (x1000/mm3)
  gcs: number;              // Шкала комы Глазго (15 - балл пациента)
}

// 2. Возраст
// 3. Хронические заболевания (Chronic Health Evaluation)
export interface ApacheChronicHealth {
  liverCirrhosis: boolean;         // Цирроз печени (подтвержденный биопсией)
  heartFailureClassIV: boolean;    // Сердечная недостаточность IV класса (NYHA)
  copd: boolean;                   // ХОБЛ (тяжелая)
  dialysis: boolean;               // Хронический диализ
  immunocompromised: boolean;      // Иммунодефицит
}

// Общий интерфейс ввода
export interface ApacheInputData extends ApachePhysiology {
  age: number;
  isEmergencySurgery: boolean; // Была ли экстренная операция? (влияет на вес хронических болезней)
  isAcuteRenalFailure: boolean;
  chronicHealth: ApacheChronicHealth;
}

// Интерфейс результата
export interface ApacheResult {
  apsScore: number;        // Баллы за физиологию
  ageScore: number;        // Баллы за возраст
  chronicHealthScore: number; // Баллы за хронику
  totalScore: number;      // Общая сумма
  mortalityRisk: number;   // Риск смерти в %
}