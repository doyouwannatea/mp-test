import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo } from "react";
import { Location } from "../models/Location";
import { Env } from "../models/Env";
import { Server } from "../models/Server";
import AppSelect from "./AppSelect";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faQuestion,
  faLocationDot,
  faLeaf,
  faVial,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./TestLocationForm.module.css";
import AppInput from "./AppInput";

type Props = {
  locationName: string;
  locationList: Location[];
  envList: Env[];
  serverList: Server[];
  envID?: number;
  locationID?: number;
  hint?: string;
  onLocationChange: (location?: Location) => void;
  onEnvChange: (env?: Env) => void;
  onHintChange: (hint?: string) => void;
  onDeleteLocation: () => void;
};

const TestLocationForm = observer(
  ({
    locationName,
    envID,
    envList,
    hint,
    locationID,
    locationList,
    serverList,
    onEnvChange,
    onHintChange,
    onLocationChange,
    onDeleteLocation,
  }: Props) => {
    const availableEnvList = useMemo(
      () =>
        locationID
          ? envList.filter((env) =>
              env.locationsID.includes(Number(locationID))
            )
          : envList,
      [envList, locationID]
    );
    const availableSeverList = useMemo(
      () =>
        serverList.filter(
          (server) =>
            String(server.envID) === String(envID) &&
            String(server.locationID) === String(locationID)
        ),
      [serverList, locationID, envID]
    );

    const changeLocation = useCallback(
      (locationID?: string | number) => {
        const location = locationList.find(
          (location) => location.locationID === Number(locationID)
        );
        onLocationChange(location);
      },
      [locationList, onLocationChange]
    );

    const changeEnv = useCallback(
      (envID?: string | number) => {
        const env = envList.find((env) => env.envID === Number(envID));
        onEnvChange(env);
      },
      [envList, onEnvChange]
    );

    const changeHint = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        onHintChange(e.currentTarget.value);
      },
      [onHintChange]
    );

    useEffect(() => {
      changeEnv(undefined);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationID]);

    return (
      <form className={styles.form}>
        <div className={styles.header}>
          <p className={styles.title}>
            <FontAwesomeIcon icon={faVial} /> {locationName}
          </p>
          <button
            className={styles["delete-button"]}
            type="button"
            onClick={onDeleteLocation}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        <label className={styles["input-wrapper"]}>
          Локация
          <AppSelect
            value={locationID}
            defaultValue={0}
            icon={faLocationDot}
            placeholder="Выберите локацию"
            options={locationList.map((location) => (
              <option key={location.locationID} value={location.locationID}>
                {location.name}
              </option>
            ))}
            onChange={changeLocation}
          />
        </label>
        <label className={styles["input-wrapper"]}>
          Среда
          <AppSelect
            value={envID}
            defaultValue={0}
            icon={faLeaf}
            placeholder="Выберите среду"
            options={availableEnvList.map((env) => (
              <option key={env.envID} value={env.envID}>
                {env.name}
              </option>
            ))}
            onChange={changeEnv}
          />
        </label>
        <div className={styles["input-wrapper"]}>
          <p>Серверы</p>
          <FontAwesomeIcon icon={faServer} />
          {availableSeverList.length > 0
            ? availableSeverList.map((server) => server.name).join(", ")
            : "-"}
        </div>
        <label
          className={classNames([
            styles["input-wrapper"],
            styles["hint-wrapper"],
          ])}
        >
          Подсказка
          <AppInput
            className="input"
            icon={faQuestion}
            type="text"
            placeholder="Комментарий по локации"
            value={hint}
            onInput={changeHint}
          />
        </label>
      </form>
    );
  }
);

export default TestLocationForm;
