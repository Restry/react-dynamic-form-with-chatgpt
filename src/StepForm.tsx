import { useState, useCallback } from "react";
import FormComponent from "./FormComponent";
import { merge } from 'lodash'
import { useImmer } from "use-immer";

const StepForm = ({ steps, fields }) => {
  const [step, setStep] = useState(0);

  // 初始化 formItems 状态为 fields 数组，并为每个元素添加一个名为 formItemProps 的属性对象，
  // 其中 css 属性值根据元素的 step 属性和当前的 step 状态值来确定是否为 'block' 或 'hidden'
  const [formItems, setFormItems] = useImmer<any>(() => fields.map(a => merge(a, {
    formItemProps: {
      css: a.step === step ? 'block' : 'hidden'
    }
  })));

  // 接收一个 current 参数，表示要更新为当前步骤的表单元素的 step 属性值
  // 函数内部调用 useImmer 提供的 setFormItems 函数，更新每个元素的 formItemProps 对象的 css 属性值
  const updateFieldsVisibility = useCallback((current) => {
    setFormItems((draft: any[]) => {
      draft.forEach(a => {
        a.formItemProps.css = a.step === current ? 'block' : 'hidden'
      })
    })
  }, [setFormItems])

  // 如果当前步骤小于最后一步，更新状态为下一步并更新表单元素的显示状态
  const nextStep = useCallback(() => {
    if (step < steps.length - 1) {
      updateFieldsVisibility(step + 1);
      setStep(step + 1);
    }
  }, [step, steps.length, updateFieldsVisibility]);

  // 如果当前步骤大于第一步，更新状态为上一步并更新表单元素的显示状态
  const prevStep = useCallback(() => {
    if (step > 0) {
      updateFieldsVisibility(step - 1);
      setStep(step - 1);
    }
  }, [step, updateFieldsVisibility]);

  return (
    <div>
      <div className="text-xl font-bold mb-4">{`Step ${step + 1}`}</div>
      <FormComponent fields={formItems} onValueUpdate={(value) => { console.log(value) }} defaultValue={{}} />
      <div className="mt-4">
        {step > 0 && (
          <button
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l-md"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-r-md"
            onClick={() => alert("Form submitted!")}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
