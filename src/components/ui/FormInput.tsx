import React from "react";
import { UseFormRegister, FieldValues, Path, FieldErrors } from "react-hook-form";
import clsx from "clsx";

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  unit?: string;
  placeholder?: string;
  step?: string;
}

export const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  unit,
  placeholder,
  step = "any",
}: FormInputProps<T>) => {
  
  const errorParams = errors[name as string];
  const errorMessage = errorParams?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type="number"
          step={step}
          placeholder={placeholder}
          {...register(name)}
          className={clsx(
            // Базовые стили
            "block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 transition-all",
            // ЦВЕТ ТЕКСТА: Делаем его черным (text-gray-900), фон белым
            "text-gray-900 bg-white placeholder:text-gray-400",
            // Стили ошибок vs Нормальные
            errorMessage
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
          )}
        />
        {unit && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm font-medium">{unit}</span>
          </div>
        )}
      </div>
      {errorMessage && (
        <span className="text-xs text-red-600 font-medium">{errorMessage}</span>
      )}
    </div>
  );
};