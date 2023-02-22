import "./styles.css";

import DynamicForm from "./DynamicForm";
import { Field, FieldType } from "./Type.d";

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
  //   isDisabled: (values) => values.agreement,
  //   options: [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  //   ],
  // },
  // { 
  //   type: "select",
  //   name: "select",
  //   label: "Agree",
  //   isDisabled: (values) => values.agreement,
  //   options: [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  //   ],
  // },
  { name: 'firstName', label: '姓', type: FieldType.Text },
  { name: 'lastName', label: '名', type: FieldType.Text },
  { name: 'age', label: '年龄', type: FieldType.Text },
  { name: 'email', label: '电子邮件', type: FieldType.Email },
  {
    name: 'company',
    label: '公司名称',
    dependent: ['position', 'income'],
    type: FieldType.Text,
  },
  {
    name: 'position',
    label: '职位',
    type: FieldType.Text,
    isDisabled: (values) => !values.company,
  },
  {
    name: 'income',
    label: '年收入',
    type: FieldType.Number,
    isDisabled: (values) => !values.position,
  },
  {
    name: 'investment',
    label: '投资金额',
    type: FieldType.Number,
    isDisabled: (values) => !values.position || values.income < 50000,
  },
  {
    name: 'creditScore',
    label: '信用评分',
    type: FieldType.Number,
    isDisabled: (values) => values.age < 18 || values.income < 20000,
  },
  {
    name: 'loanAmount',
    label: '贷款金额',
    type: FieldType.Number,
    isDisabled: (values) => values.creditScore < 600,
  },
  {
    name: 'loanDuration',
    label: '贷款期限',
    type: FieldType.Select,
    options: [
      { value: '1', label: '1年' },
      { value: '2', label: '2年' },
      { value: '3', label: '3年' },
    ],
    isDisabled: (values) =>
      values.loanAmount > 1000000 || values.creditScore < 650,
  },
  {
    name: 'loanPurpose',
    label: '贷款用途',
    type: FieldType.Select,
    options: [
      { value: 'personal', label: '个人消费' },
      { value: 'business', label: '商业投资' },
    ],
    isDisabled: (values) =>
      values.loanAmount > 500000 || values.loanDuration === '1',
  },
  {
    name: 'homeOwnership',
    label: '住房所有权',
    type: FieldType.Radio,
    options: [
      { value: 'owned', label: '自有' },
      { value: 'mortgage', label: '按揭' },
      { value: 'rented', label: '租赁' },
    ],
    isDisabled: (values) => values.loanPurpose === 'business',
  },
  {
    name: 'maritalStatus',
    label: '婚姻状况',
    type: FieldType.Select,
    options: [
      { value: 'single', label: '未婚' },
      { value: 'married', label: '已婚' },
      { value: 'divorced', label: '离异' },
      { value: 'widowed', label: '丧偶' },
    ],
  },

  { name: "make", label: "制造商", type: FieldType.Text, },
  { name: "model", label: "型号", type: FieldType.Text, },
  { name: "year", label: "年份", type: FieldType.Number, },
  { name: "color", label: "颜色", type: FieldType.Text, },
  { name: "mileage", label: "里程数", type: FieldType.Number, },
  {
    name: "condition", label: "车况", type: FieldType.Select, options: [
      { value: "new", label: "全新" },
      { value: "used", label: "二手" },
      { value: "salvage", label: "拆车件" },
    ],
  },
  {
    name: "transmission", label: "变速器", type: FieldType.Radio, options: [
      { value: "manual", label: "手动" },
      { value: "automatic", label: "自动" },
    ],
  },
  {
    name: "drivetrain", label: "驱动类型", type: FieldType.Select, options: [
      { value: "front-wheel-drive", label: "前轮驱动" },
      { value: "rear-wheel-drive", label: "后轮驱动" },
      { value: "all-wheel-drive", label: "四轮驱动" },
    ],
  },
  {
    name: "fuelType", label: "燃料类型", type: FieldType.Select, options: [
      { value: "gasoline", label: "汽油" },
      { value: "diesel", label: "柴油" },
      { value: "electric", label: "电动" },
    ],
  },
  { name: "engineSize", label: "发动机排量", type: FieldType.Text, },
  {
    name: "bodyStyle", label: "车身风格", type: FieldType.Select, options: [
      { value: "coupe", label: "双门轿跑车" },
      { value: "sedan", label: "四门轿车" },
      { value: "hatchback", label: "掀背车" },
      { value: "suv", label: "运动型多功能车" },
      { value: "van", label: "货车" },
    ],
  },
  { name: "seatingCapacity", label: "座位数", type: FieldType.Number, },
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

export default function App() {
  return (
    <div style={{ background: "#fff", margin: "1em" }}>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-10 md:col-span-2 md:mt-0">
          <DynamicForm
            fields={fields}
            defaultValue={{ name: "ninc", workExperience: [{ "companyName": "4213", "phoneNumber": "423", "address": "4532" }, { "companyName": "234323", "phoneNumber": "12345643211", "address": "" }] }}
          />
        </div>
      </div>
    </div>
  );
}
