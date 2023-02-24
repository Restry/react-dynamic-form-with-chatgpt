import "./styles.css";

import FormComponent from "./FormComponent";
import { Field, FieldType } from "./Type.d";
import StepForm from "StepForm";

const fields = [
  // {
  //   type: "input",
  //   name: "name",
  //   label: "Name",
  //   preprocess: (value) => `[86]${value}`,
  // },
  // {
  //   type: FieldType.Group,
  //   name: "workExperience",
  //   label: "Work Experience",
  //   subFields: [
  //     {
  //       name: "companyName",
  //       label: "Company Name",
  //       type: FieldType.Text,
  //     },
  //     {
  //       name: "phoneNumber",
  //       label: "Phone Number",
  //       type: FieldType.Text,
  //     },
  //     {
  //       name: "address",
  //       label: "Address",
  //       type: FieldType.TextArea,
  //     },
  //   ],
  // },
  // {
  //   type: "textarea",
  //   name: "description",
  //   label: "Description",
  // },
  // {
  //   type: "checkbox",
  //   name: "agreement",
  //   dependent: ["select","gender"],
  //   label: "Agree to terms and conditions",
  // },
  // {
  //   type: "radio",
  //   name: "gender",
  //   label: "Gender",
  //   disabled: (values) => values.agreement,
  //   options: [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  //   ],
  // },
  // { 
  //   type: "select",
  //   name: "select",
  //   label: "Agree",
  //   disabled: (values) => values.agreement,
  //   options: [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  //   ],
  // },
  { name: 'firstName', step: 0, label: '姓', type: FieldType.Text },
  { name: 'lastName', step: 0, label: '名', type: FieldType.Text },
  { name: 'age', step: 0, label: '年龄', type: FieldType.Text },
  { name: 'email', step: 0, label: '电子邮件', type: FieldType.Email },
  {
    name: 'company', step: 0,
    label: '公司名称',
    dependent: ['position'],
    type: FieldType.Text,
  },
  {
    name: 'position', step: 0,
    label: '职位',
    type: FieldType.Text,
    dependent: ['income'],
    disabled: (values) => !values.company,
  },
  {
    name: 'income', step: 0,
    label: '年收入',
    dependent: ['investment', 'creditScore'],
    type: FieldType.Number,
    disabled: (values) => !values.position,
  },
  {
    name: 'investment', step: 0,
    label: '投资金额(income > 50000)',
    type: FieldType.Number,
    disabled: (values) => !values.position || values.income < 50000,
  },
  {
    name: 'creditScore', step: 0,
    label: '信用评分',
    type: FieldType.Number,
    disabled: (values) => values.age < 18 || values.income < 20000,
  },
  {
    name: 'loanAmount', step: 0,
    label: '贷款金额',
    type: FieldType.Number,
    disabled: (values) => values.creditScore < 600,
  },
  {
    name: 'loanDuration', step: 1,
    label: '贷款期限',
    type: FieldType.Select,
    options: [
      { value: '1', label: '1年' },
      { value: '2', label: '2年' },
      { value: '3', label: '3年' },
    ],
    disabled: (values) =>
      values.loanAmount > 1000000 || values.creditScore < 650,
  },
  {
    name: 'loanPurpose', step: 1,
    label: '贷款用途',
    type: FieldType.Select,
    options: [
      { value: 'personal', label: '个人消费' },
      { value: 'business', label: '商业投资' },
    ],
    disabled: (values) =>
      values.loanAmount > 500000 || values.loanDuration === '1',
  },
  {
    name: 'homeOwnership', step: 1,
    label: '住房所有权',
    type: FieldType.Radio,
    options: [
      { value: 'owned', label: '自有' },
      { value: 'mortgage', label: '按揭' },
      { value: 'rented', label: '租赁' },
    ],
    disabled: (values) => values.loanPurpose === 'business',
  },
  {
    name: 'maritalStatus', step: 1,
    label: '婚姻状况',
    type: FieldType.Select,
    options: [
      { value: 'single', label: '未婚' },
      { value: 'married', label: '已婚' },
      { value: 'divorced', label: '离异' },
      { value: 'widowed', label: '丧偶' },
    ],
  },
  {
    type: FieldType.Group, step: 1,
    name: "workExperience",
    label: "工作经历",
    formItemProps: { span: 3 },
    subFields: [
      {
        name: "companyName",
        label: "公司",
        type: FieldType.Text,
      },
      {
        name: "phoneNumber",
        label: "手机号",
        type: FieldType.Text,
      },
    ],
  },

  { name: "make", label: "制造商", type: FieldType.Text, step: 2, },
  { name: "model", label: "型号", type: FieldType.Text, step: 2, },
  { name: "year", label: "年份", type: FieldType.Number, step: 2, },
  { name: "color", label: "颜色", type: FieldType.Text, step: 2, },
  { name: "mileage", label: "里程数", type: FieldType.Number, step: 2, },
  {
    name: "condition", label: "车况", type: FieldType.Select, step: 2, options: [
      { value: "new", label: "全新" },
      { value: "used", label: "二手" },
      { value: "salvage", label: "拆车件" },
    ],
  },
  {
    name: "transmission", label: "变速器", type: FieldType.Radio, step: 2, options: [
      { value: "manual", label: "手动" },
      { value: "automatic", label: "自动" },
    ],
  },
  {
    name: "drivetrain", label: "驱动类型", type: FieldType.Select, step: 2, options: [
      { value: "front-wheel-drive", label: "前轮驱动" },
      { value: "rear-wheel-drive", label: "后轮驱动" },
      { value: "all-wheel-drive", label: "四轮驱动" },
    ],
  },
  {
    name: "fuelType", label: "燃料类型", type: FieldType.Select, step: 2, options: [
      { value: "gasoline", label: "汽油" },
      { value: "diesel", label: "柴油" },
      { value: "electric", label: "电动" },
    ],
  },
  { name: "engineSize", label: "发动机排量", type: FieldType.Text, step: 2, },
  {
    name: "bodyStyle", label: "车身风格", type: FieldType.Select, step: 2, options: [
      { value: "coupe", label: "双门轿跑车" },
      { value: "sedan", label: "四门轿车" },
      { value: "hatchback", label: "掀背车" },
      { value: "suv", label: "运动型多功能车" },
      { value: "van", label: "货车" },
    ],
  },
  { name: "seatingCapacity", label: "座位数", type: FieldType.Number, step: 2, },
  { name: "interiorColor", label: "内饰颜色", type: FieldType.Text, },
  { name: "fuelEconomy", label: "油耗", type: FieldType.Text, },
  {
    name: "options", label: "选项", type: FieldType.Checkbox, options: [
      { value: "bluetooth", label: "蓝牙" },
      { value: "leather-seats", label: "真皮座椅" },
      { value: "sunroof", label: "天窗" },
      { value: "gps-navigation", label: "GPS导航" },
      { value: "backup-camera", label: "倒车摄像头" },
    ],
  },

] as Field[];

const steps = [
  'Step 1: Enter your name',
  'Step 2: Enter your email',
  'Step 3: Enter your phone number',
];
export default function App() {
  return (
    <div style={{ background: "#fff" }}>
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">dynamic form generate by chatGPT</h1>
          <p className="text-gray-400">80%主体业务逻辑，100%样式全由GPT生成。功能描述：根据JSON  Schema生成表单、嵌套表单、预处理数据、字段禁用逻辑</p>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-4">
  <div className="col-span-1 bg-red-200">1</div>
  <div className="col-span-1 bg-red-200">2</div>
  <div className="col-span-1 bg-red-200">3</div>
  <div className="col-span-1 bg-blue-200">4</div>
  <div className="col-span-3 bg-blue-200">5</div>
  <div className="col-span-1 bg-red-200">6</div>
  <div className="col-span-1 bg-red-200">7</div>
  <div className="col-span-1 bg-red-200">8</div>
  <div className="col-span-1 bg-green-200">9</div>
  <div className="col-span-1 bg-green-200">10</div>
</div> */}
      <StepForm steps={steps} fields={fields} />

      {/* <DynamicForm
        fields={fields}
        column={3}
        defaultValue={{ name: "ninc", workExperience: [{ "companyName": "4213", "phoneNumber": "423", "address": "4532" }, { "companyName": "234323", "phoneNumber": "12345643211", "address": "" }] }}
      /> */}
    </div>
  );
}
