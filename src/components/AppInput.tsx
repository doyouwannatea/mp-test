import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import inputStyles from "./Input.module.css";

type Props = { icon?: IconProp } & React.HTMLAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

const AppInput = ({ icon, ...props }: Props) => (
  <div className={classNames(inputStyles.wrapper)}>
    {icon && <FontAwesomeIcon className={inputStyles.icon} icon={icon} />}
    <input
      {...props}
      className={classNames(inputStyles.input, {
        [inputStyles["with-icon"]]: icon,
      })}
    />
  </div>
);

export default AppInput;
