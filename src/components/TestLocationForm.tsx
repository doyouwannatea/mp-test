import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useMemo } from "react";
import { Location } from "../models/Location";
import { Env } from "../models/Env";
import { Server } from "../models/Server";
import AppSelect from "./AppSelect";

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
      <form>
        <button type="button" onClick={onDeleteLocation}>
          удалить
        </button>
        <p>{locationName}</p>
        <AppSelect
          value={locationID}
          label="Локация"
          placeholder="Выберите локацию"
          options={locationList.map((location) => (
            <option key={location.locationID} value={location.locationID}>
              {location.name}
            </option>
          ))}
          onChange={changeLocation}
        />
        <AppSelect
          value={envID}
          label="Среда"
          placeholder="Выберите среду"
          options={availableEnvList.map((env) => (
            <option key={env.envID} value={env.envID}>
              {env.name}
            </option>
          ))}
          onChange={changeEnv}
        />
        <p>Серверы</p>
        <ul>
          {availableSeverList.map((server) => (
            <li key={server.serverID}>{server.name}</li>
          ))}
        </ul>
        <label>
          Подсказка
          <input
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
