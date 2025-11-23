"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apacheSchema, ApacheSchemaType } from "../lib/validation";
import { calculateApacheII } from "../lib/apache-calc";
import { ApacheResult } from "../types/apache";
import { FormInput } from "../components/ui/FormInput";
import { ReferenceInfo } from "../components/ReferenceInfo"; 

export default function Home() {
  const [result, setResult] = useState<ApacheResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApacheSchemaType>({
    resolver: zodResolver(apacheSchema),
    defaultValues: {
      isEmergencySurgery: false,
      isAcuteRenalFailure: false,
      chronicHealth: {
        liverCirrhosis: false,
        heartFailureClassIV: false,
        copd: false,
        dialysis: false,
        immunocompromised: false,
      },
    } as any,
  });

  const onSubmit = (data: ApacheSchemaType) => {
    const calcResult = calculateApacheII(data);
    setResult(calcResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Калькулятор APACHE II</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            Оценка тяжести состояния и прогноз летальности в отделении интенсивной терапии.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* ФОРМА */}
          <div className="xl:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Группа 1: Витальные функции */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm">1</span>
                  Витальные функции
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <FormInput label="Температура (рект.)" name="temperature" register={register} errors={errors} unit="°C" step="0.1" placeholder="36.6" />
                  <FormInput label="Среднее АД" name="meanArterialPressure" register={register} errors={errors} unit="мм рт.ст." placeholder="90" />
                  <FormInput label="ЧСС (Пульс)" name="heartRate" register={register} errors={errors} unit="уд/мин" placeholder="80" />
                  <FormInput label="ЧДД (Дыхание)" name="respiratoryRate" register={register} errors={errors} unit="в мин" placeholder="16" />
                  <FormInput label="Шкала Глазго (GCS)" name="gcs" register={register} errors={errors} placeholder="15" />
                </div>
              </section>

              {/* Группа 2: Оксигенация */}
              <section>
                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm">2</span>
                  Газы крови
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <FormInput label="PaO2" name="oxygenation" register={register} errors={errors} unit="мм рт.ст." placeholder="95" />
                  <FormInput label="pH артерии" name="arterialPH" register={register} errors={errors} step="0.01" placeholder="7.40" />
                </div>
              </section>

              {/* Группа 3: Лаборатория */}
              <section>
                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm">3</span>
                  Лабораторные показатели
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <FormInput label="Натрий (Na)" name="sodium" register={register} errors={errors} unit="ммоль/л" placeholder="140" />
                  <FormInput label="Калий (K)" name="potassium" register={register} errors={errors} unit="ммоль/л" step="0.1" placeholder="4.0" />
                  
                  {/* Креатинин с чекбоксом ОПН */}
                  <div className="flex flex-col">
                    <FormInput label="Креатинин (Cr)" name="creatinine" register={register} errors={errors} unit="мг/дл" step="0.1" placeholder="1.0" />
                    <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                      <input type="checkbox" {...register("isAcuteRenalFailure")} className="rounded text-red-600 focus:ring-red-500" />
                      <span className="text-xs text-red-600 font-bold">Острая почечная недост.</span>
                    </label>
                  </div>

                  <FormInput label="Гематокрит (Ht)" name="hematocrit" register={register} errors={errors} unit="%" placeholder="40" />
                  <FormInput label="Лейкоциты (WBC)" name="wbc" register={register} errors={errors} unit="x10³/мм³" step="0.1" placeholder="10" />
                </div>
              </section>

              {/* Группа 4: Пациент */}
              <section className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm">4</span>
                  Данные пациента
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="Возраст" name="age" register={register} errors={errors} unit="лет" placeholder="45" />
                  
                  <div className="flex items-center pt-6">
                    <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition w-full">
                      <input type="checkbox" {...register("isEmergencySurgery")} className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <span className="text-gray-700 font-medium">Экстренная операция</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Тяжелые хронические заболевания:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input type="checkbox" {...register("chronicHealth.liverCirrhosis")} className="rounded text-blue-600"/>
                          <span>Цирроз печени</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input type="checkbox" {...register("chronicHealth.heartFailureClassIV")} className="rounded text-blue-600"/>
                          <span>СН IV класса (NYHA)</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input type="checkbox" {...register("chronicHealth.copd")} className="rounded text-blue-600"/>
                          <span>Тяжелая ХОБЛ</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input type="checkbox" {...register("chronicHealth.dialysis")} className="rounded text-blue-600"/>
                          <span>Хронический диализ</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-gray-600">
                          <input type="checkbox" {...register("chronicHealth.immunocompromised")} className="rounded text-blue-600"/>
                          <span>Иммунодефицит</span>
                      </label>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
              >
                Рассчитать риск
              </button>
            </form>
          </div>

          {/* РЕЗУЛЬТАТ (Плавающий) */}
          <div className="xl:col-span-1">
            <div className="sticky top-6 space-y-6">
              {result ? (
                <div className="bg-white rounded-xl shadow-xl border border-blue-100 overflow-hidden animation-fade-in">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-6 text-white">
                    <h3 className="text-xl font-bold">Результат</h3>
                    <p className="text-blue-100 text-sm mt-1">Прогноз по APACHE II</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-center mb-8">
                      <p className="text-sm text-gray-500 font-semibold uppercase tracking-widest mb-2">Летальность</p>
                      <div className="inline-flex items-baseline text-6xl font-black text-gray-900">
                        {result.mortalityRisk}
                        <span className="text-2xl text-gray-500 ml-1">%</span>
                      </div>
                    </div>

                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg text-sm">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Физиология:</span>
                        <span className="font-bold text-gray-800">{result.apsScore}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-gray-600">Возраст:</span>
                        <span className="font-bold text-gray-800">{result.ageScore}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Здоровье:</span>
                        <span className="font-bold text-gray-800">{result.chronicHealthScore}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center text-base font-bold text-gray-900">
                      <span>Сумма баллов:</span>
                      <span className="text-2xl text-blue-600">{result.totalScore}</span>
                    </div>

                    {/* ТАБЛИЦА ИНТЕРПРЕТАЦИИ */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Статистика (Баллы = Риск)</p>
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                            <div>0-4: <span className="font-medium">4%</span></div>
                            <div>5-9: <span className="font-medium">8%</span></div>
                            <div>10-14: <span className="font-medium">15%</span></div>
                            <div>15-19: <span className="font-medium">25%</span></div>
                            <div>20-24: <span className="font-medium">40%</span></div>
                            <div>25-29: <span className="font-medium">55%</span></div>
                            <div>30-34: <span className="font-medium">75%</span></div>
                            <div>&gt;34: <span className="font-medium">85%</span></div>
                        </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     {/* Иконка калькулятора */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Нет данных</h3>
                  <p className="mt-2 text-gray-500 text-sm">Заполните форму слева для расчета прогноза.</p>
                </div>
              )}
            </div>
          </div>

        </div>
        <ReferenceInfo />
      </div>
    </main>
  );
}