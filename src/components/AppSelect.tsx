import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import inputStyles from "./Input.module.css";

type Props = {
  placeholder: string;
  value: string | number | undefined;
  options: React.ReactNode;
  icon?: IconProp;
  defaultValue?: string | number;
  onChange: (value: string | number) => void;
};

const AppSelect = ({
  options,
  placeholder,
  value,
  icon,
  defaultValue = "",
  onChange,
}: Props) => (
  <div className={classNames(inputStyles.wrapper)}>
    {icon && <FontAwesomeIcon className={inputStyles.icon} icon={icon} />}
    <select
      className={classNames(inputStyles.input, {
        [inputStyles["with-icon"]]: icon,
      })}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={defaultValue} disabled>
        {placeholder}
      </option>
      {options}
    </select>
  </div>
);

export default AppSelect;
