import { useState, useCallback } from "react";
import FormComponent from "./FormComponent";
import { merge } from 'lodash'
import { useImmer } from "use-immer";

const StepForm = ({ steps, fields }) => {
  const [step, setStep] = useState(0);

  const [formItems, updateFormItems] = useImmer<any>(() => fields.map(a => merge(a, {
    formItemProps: {
      css: a.step === step ? 'block' : 'hidden'
    }
  })));


  const updateItems = useCallback((current) => {
    updateFormItems((draft: any[]) => {
      draft.forEach(a => {
        a.formItemProps.css = a.step === current ? 'block' : 'hidden'
      })
    })
  }, [updateFormItems])

  const handleNextStep = useCallback(() => {
    if (step < steps.length - 1) {
      updateItems(step + 1);
      setStep(step + 1);
    }
  }, [step, steps.length, updateItems]);

  const handlePrevStep = useCallback(() => {
    if (step > 0) {
      updateItems(step - 1);
      setStep(step - 1);
    }
  }, [step, updateItems]);

  return (
    <div>
      <div className="text-xl font-bold mb-4">{`Step ${step + 1}`}</div>
      <FormComponent fields={formItems} onValueUpdate={(value) => { console.log(value) }} defaultValue={{}} />
      <div className="mt-4">
        {step > 0 && (
          <button
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l-md"
            onClick={handlePrevStep}
          >
            Previous
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md"
            onClick={handleNextStep}
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
