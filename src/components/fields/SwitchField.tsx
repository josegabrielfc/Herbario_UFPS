import Switch from "../switch";

interface SwitchFieldProps {
  id: string;
  label: string;
  desc?: string;
  mt?: string;
  mb?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}

const SwitchField = (props: SwitchFieldProps) => {
  const { id, label, desc, mt, mb, checked, disabled, onChange } = props;
  return (
    <div className={`flex justify-start ${mt || ''} ${mb || ''} items-center px-4`}>
      <label
      htmlFor={id}
      className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%]"
      >
      <h5 className="text-base font-bold text-navy-700">
        {label}
      </h5>
      <p className={`text-base text-gray-600`}>{desc}</p>
      </label>
      <div className="mx-4"></div>
      <div>
        <Switch 
          id={id} 
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SwitchField;