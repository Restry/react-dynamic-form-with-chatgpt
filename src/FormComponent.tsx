import React, { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import Input from "./Input";
import { FormComponentProps, Field } from "./Type";
import { set } from "lodash";

let renderCount = 0;
// 表单组件
const FormComponent = ({
  // 表单字段的数组，每个字段都是Field类型的对象
  fields,
  // 表单提交事件的处理函数
  onSubmit,
  // 表单默认值的对象
  defaultValue,
  // 表单的列数，默认为3
  column = 3
}: FormComponentProps) => {

  // 预处理表单字段值的函数
  const preprocessFieldValue = useCallback((field: Field, value: any) => {
    // 如果字段存在预处理函数，则调用该函数进行处理，否则返回value或一个空字符串
    return field?.preprocess ? field.preprocess(value) : (value || '');
  }, []);

  // 使用useImmer hook创建表单值的状态和更新表单值的函数
  const [formValue, updateFormValue] = useImmer<any>(() => {
    const initValues: any = { __tracker: [] };
    // 遍历fields数组，创建表单值对象
    fields.forEach((field) => {
      initValues[field.name] = preprocessFieldValue(
        field,
        defaultValue[field.name]
      );
    });
    // 返回表单值对象
    return initValues;
  });

  // 处理表单字段值变化的函数
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
      path = "",
      field
    ) => {
      const { name, value, type, checked } = e.target;
      // 如果传入了path参数，则使用path作为更新表单值的路径，否则使用name
      let updateValuePath = path ? path : name;

      // 更新表单值
      updateFormValue((draft) => {
        // 保存依赖该字段的其他字段，以便在该字段的值变化时重新渲染依赖该字段的其他字段
        draft.__tracker = field.dependent || []
        // 使用lodash的set函数更新表单值的对应路径的值
        set(draft, updateValuePath, type === "checkbox" ? checked : value);
      });
    },
    [updateFormValue]
  );

  // 处理表单提交的函数
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement | any>) => {
      // 阻止默认的表单提交行为
      e.preventDefault();
      // 创建一个处理过的表单值的对象
      const processedFormValue = {};
      fields.forEach((field) => {
        const { name } = field;
        const value = formValue[name];
        // 对每个字段的值进行预处理，并添加到processedFormValue对象中
        processedFormValue[name] = preprocessFieldValue(field, value);
      });
      // 打印处理过的表单值
      console.log(JSON.stringify(processedFormValue));
      // 调用onSubmit函数，并传入处理过的表单值作为参数
      onSubmit && onSubmit(processedFormValue);
      // 返回处理过的表单值
      return processedFormValue;
    },
    [fields, formValue, onSubmit, preprocessFieldValue]
  );

  const formItems = useMemo(() => {
    return fields.map((field) => (
      // 对于每个 field 生成一个 Input 组件
      <Input
        key={field.name} // React 需要一个 key 来标识数组中的每个元素，这里使用 field.name 作为 key
        field={field} // 传递当前的 field 对象
        values={formValue} // 传递整个表单的值
        value={formValue[field.name]} // 传递当前 field 的值
        onChange={handleChange} // 传递一个回调函数，当 Input 的值发生变化时会被调用
      />
    ));
  }, [fields, formValue, handleChange]);

  renderCount++

  return (
    <div className="m-6">
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${column} gap-8`}>{formItems}</div>

      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">

        {renderCount}
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>


      <div className="bg-slate-100 text-sm opacity-90 break-words p-4 mb-2 border border-dashed rounded-xl fixed top-2 right-2 w-2/4 h-8 overflow-hidden hover:h-auto">
        <div className="font-bold mb-2 border-dotted border-b-2">Output</div>
        {JSON.stringify(formValue)}
      </div>
    </div>
  );
};

export default FormComponent;
