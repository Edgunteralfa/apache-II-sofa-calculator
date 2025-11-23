import React from "react";

export const ReferenceInfo = () => {
  return (
    <div className="mt-12 border-t border-gray-200 pt-10 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Справочная информация по методике</h3>

      {/* Блок 1: О методике */}
      <details className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer p-5 bg-gray-50 group-open:bg-blue-50 transition-colors">
          <span className="font-semibold text-gray-700 group-open:text-blue-700">
            ℹ️ Принципы расчета и правила применения
          </span>
          <span className="transition group-open:rotate-180">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
        </summary>
        <div className="p-5 text-gray-600 text-sm leading-relaxed space-y-4">
          <p>
            Система APACHE II базируется на комплексном анализе 12 ключевых физиологических параметров, которые дополняются сведениями о возрасте пациента и наличии тяжелых сопутствующих патологий (хроническая органная недостаточность, иммуносупрессия).
          </p>
          <ul className="list-disc list-inside space-y-1 bg-gray-50 p-4 rounded-md border border-gray-100">
            <li><strong>Временное окно:</strong> Учитываются наихудшие показатели, зарегистрированные в течение первых 24 часов после госпитализации в ОРИТ.</li>
            <li><strong>Фиксация балла:</strong> Оценка является константой &quot;при поступлении&quot; и не пересчитывается в динамике в рамках одной госпитализации.</li>
            <li><strong>Регоспитализация:</strong> При выписке и повторном поступлении в ОРИТ расчет производится заново.</li>
            <li><strong>Прогноз:</strong> Итоговый риск летальности формируется на основе суммы баллов и диагностической категории при поступлении.</li>
          </ul>
        </div>
      </details>

      {/* Блок 2: Таблицы баллов */}
      <details className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer p-5 bg-gray-50 group-open:bg-blue-50 transition-colors">
          <span className="font-semibold text-gray-700 group-open:text-blue-700">
            📊 Критерии начисления баллов (Подробная таблица)
          </span>
          <span className="transition group-open:rotate-180">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
        </summary>
        <div className="p-5 overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 font-bold">
              <tr>
                <th className="p-3 rounded-l-md">Параметр</th>
                <th className="p-3">Диапазон значений</th>
                <th className="p-3 text-right rounded-r-md">Баллы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Возраст */}
              <tr>
                <td className="p-3 font-medium">Возраст (лет)</td>
                <td className="p-3 space-y-1">
                  <div>&le; 44</div>
                  <div>45 – 54</div>
                  <div>55 – 64</div>
                  <div>65 – 74</div>
                  <div>&ge; 75</div>
                </td>
                <td className="p-3 text-right space-y-1 font-mono">
                  <div>0</div>
                  <div>2</div>
                  <div>3</div>
                  <div>5</div>
                  <div>6</div>
                </td>
              </tr>
              
              {/* Температура */}
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Температура (°C, ректальная)</td>
                <td className="p-3 space-y-1">
                  <div>&ge; 41 / &le; 29.9</div>
                  <div>39 – 40.9 / 30 – 31.9</div>
                  <div>32 – 33.9</div>
                  <div>38.5 – 38.9 / 34 – 35.9</div>
                  <div>36 – 38.4 (Норма)</div>
                </td>
                <td className="p-3 text-right space-y-1 font-mono">
                  <div>4</div>
                  <div>3</div>
                  <div>2</div>
                  <div>1</div>
                  <div>0</div>
                </td>
              </tr>

              {/* АД */}
              <tr>
                <td className="p-3 font-medium">Среднее АД (мм рт.ст.)</td>
                <td className="p-3">
                   &gt; 159 или &lt; 50 &mdash; <strong>4 балла</strong><br/>
                   130–159 &mdash; <strong>3 балла</strong><br/>
                   110–129 или 50–69 &mdash; <strong>2 балла</strong><br/>
                   70–109 (Норма) &mdash; <strong>0 баллов</strong>
                </td>
                <td className="p-3 text-right"></td>
              </tr>

              {/* ЧСС */}
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">ЧСС (уд/мин)</td>
                <td className="p-3">
                   &ge; 180 или &le; 39 &mdash; <strong>4 балла</strong><br/>
                   140–179 или 40–54 &mdash; <strong>3 балла</strong><br/>
                   110–139 или 55–69 &mdash; <strong>2 балла</strong><br/>
                   70–109 (Норма) &mdash; <strong>0 баллов</strong>
                </td>
                <td className="p-3 text-right"></td>
              </tr>

               {/* ЧДД */}
               <tr>
                <td className="p-3 font-medium">ЧДД (в мин)</td>
                <td className="p-3">
                   &ge; 50 или &le; 5 &mdash; <strong>4 балла</strong><br/>
                   35–49 &mdash; <strong>3 балла</strong><br/>
                   6–9 &mdash; <strong>2 балла</strong><br/>
                   25–34 или 10–11 &mdash; <strong>1 балл</strong><br/>
                   12–24 (Норма) &mdash; <strong>0 баллов</strong>
                </td>
                <td className="p-3 text-right"></td>
              </tr>

              {/* Креатинин */}
              <tr className="bg-yellow-50 border-l-4 border-yellow-400">
                <td className="p-3 font-medium">Креатинин (мкмоль/л)<br/><span className="text-xs text-gray-500 font-normal">*При ОПН баллы удваиваются</span></td>
                <td className="p-3 space-y-1">
                  <div>&gt; 300 (ОПН)</div>
                  <div>177 – 300 (ОПН)</div>
                  <div>&gt; 300 (ХПН) / 133 – 176 (ОПН)</div>
                  <div>177 – 300 (ХПН)</div>
                  <div>133 – 176 (ХПН) / &lt; 53</div>
                  <div>53 – 132</div>
                </td>
                <td className="p-3 text-right space-y-1 font-mono">
                  <div>8</div>
                  <div>6</div>
                  <div>4</div>
                  <div>3</div>
                  <div>2</div>
                  <div>0</div>
                </td>
              </tr>
              
              {/* Сопутствующие */}
              <tr>
                <td className="p-3 font-medium">Хронические заболевания<br/><span className="text-xs font-normal text-gray-500">Печень, ССС, Легкие, Почки, Иммунитет</span></td>
                <td className="p-3 space-y-2">
                    <div><strong>5 баллов</strong> — Для терапевтических пациентов или после экстренной операции.</div>
                    <div><strong>2 балла</strong> — Для пациентов после плановой операции.</div>
                    <div><strong>0 баллов</strong> — Отсутствие тяжелой патологии.</div>
                </td>
                <td className="p-3 text-right"></td>
              </tr>

            </tbody>
          </table>
          
          <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-500">
            Примечание: Полный список диапазонов для гематокрита, лейкоцитов, натрия, калия и газов крови используется в алгоритме калькулятора автоматически согласно оригинальной методике Knaus WA et al.
          </div>
        </div>
      </details>

      {/* Блок 3: Интерпретация */}
      <details className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <summary className="flex justify-between items-center cursor-pointer p-5 bg-gray-50 group-open:bg-blue-50 transition-colors">
          <span className="font-semibold text-gray-700 group-open:text-blue-700">
             📈 Интерпретация результатов (Смертность)
          </span>
          <span className="transition group-open:rotate-180">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </span>
        </summary>
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-4">
            Зависимость риска больничной летальности от итоговой суммы баллов различается для пациентов, перенесших операцию, и неоперированных больных.
          </p>
          <table className="w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2">Сумма баллов</th>
                <th className="border p-2">Неоперированные<br/><span className="text-xs font-normal text-gray-500">(Смертность %)</span></th>
                <th className="border p-2">После операции<br/><span className="text-xs font-normal text-gray-500">(Смертность %)</span></th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr><td className="border p-2 font-medium">0 – 4</td><td className="border p-2">4%</td><td className="border p-2">1%</td></tr>
              <tr className="bg-gray-50"><td className="border p-2 font-medium">5 – 9</td><td className="border p-2">8%</td><td className="border p-2">3%</td></tr>
              <tr><td className="border p-2 font-medium">10 – 14</td><td className="border p-2">15%</td><td className="border p-2">7%</td></tr>
              <tr className="bg-gray-50"><td className="border p-2 font-medium">15 – 19</td><td className="border p-2">24%</td><td className="border p-2">12%</td></tr>
              <tr><td className="border p-2 font-medium">20 – 24</td><td className="border p-2">40%</td><td className="border p-2">30%</td></tr>
              <tr className="bg-gray-50"><td className="border p-2 font-medium">25 – 29</td><td className="border p-2">55%</td><td className="border p-2">35%</td></tr>
              <tr><td className="border p-2 font-medium">30 – 34</td><td className="border p-2">73%</td><td className="border p-2">73%</td></tr>
              <tr className="bg-red-50 text-red-700 font-bold"><td className="border p-2">≥ 35</td><td className="border p-2">85%</td><td className="border p-2">88%</td></tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
};