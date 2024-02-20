import { FieldError, UseFormRegister } from "react-hook-form"

export enum InputType {
  text = "text",
  number = "number",
  checkbox = "checkbox",
  range = "range",
  submit = "submit",
}

export enum InputMode {
  numeric = "numeric",
}

const inputClassNames: Record<InputType, string> = {
  [InputType.text]: "text-input",
  [InputType.number]: "number-input",
  [InputType.checkbox]: "checkbox-input",
  [InputType.range]: "range-input",
  [InputType.submit]: "submit-input",
}

type InputProps = {
  label: string
  type: InputType
  register: UseFormRegister<any>
  errors?: FieldError
  text?: string
}

export default function Input({
  label,
  type,
  register,
  errors,
  text,
}: InputProps) {
  const title = label.split(".").pop()?.split(" ").join(" ").toLowerCase() ?? ""

  return (
    <div className="input">
      <div>
        <label>{text || title}</label>
        <input
          className={`${inputClassNames[type]}`}
          type={type.toString()}
          {...register(label)}
        />
      </div>
      <span className="error">{errors ? errors.message : " "}</span>
    </div>
  )
}
