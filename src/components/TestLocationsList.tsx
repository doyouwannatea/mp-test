import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TestLocationForm from "./TestLocationForm";
import { CreatedLocation, Location } from "../models/Location";
import { Env } from "../models/Env";
import { Server } from "../models/Server";
import { observer } from "mobx-react-lite";
import { storeContext } from "../stores/store";
import { deepClone } from "../utils/object";

import styles from "./TestLocationsList.module.css";

type Props = {
  locationList: Location[];
  envList: Env[];
  serverList: Server[];
};

const TestLocationsList = observer(
  ({ envList, locationList, serverList }: Props) => {
    const [locationsList, setLocationsList] = useState<CreatedLocation[]>(
      () => []
    );
    const store = useContext(storeContext);

    function onDeleteLocation(index: number) {
      setLocationsList((list) => [
        ...list.slice(0, index),
        ...list.slice(index + 1),
      ]);
    }

    function onEnvChange(index: number) {
      return (env?: Env) => {
        setLocationsList((list) => {
          const newList = deepClone(list);
          newList[index].envID = env?.envID || 0;
          return newList;
        });
      };
    }

    function onLocationChange(index: number) {
      return (location?: Location) => {
        setLocationsList((list) => {
          const newList = deepClone(list);
          newList[index].locationID = location?.locationID || 0;
          return newList;
        });
      };
    }

    function onHintChange(index: number) {
      return (hint?: string) => {
        setLocationsList((list) => {
          const newList = deepClone(list);
          newList[index].hint = hint || "";
          return newList;
        });
      };
    }

    function createLocation() {
      setLocationsList((list) => [
        ...list,
        { id: uuidv4(), locationID: 0, envID: 0, hint: "" },
      ]);
    }

    return (
      <>
        {store.isLoaded ? (
          locationsList.map((location, index) => (
            <TestLocationForm
              key={location.id}
              locationName={`Тестовая локация ${index + 1}`}
              envID={location.envID}
              locationID={location.locationID}
              hint={location.hint}
              envList={envList}
              locationList={locationList}
              serverList={serverList}
              onEnvChange={onEnvChange(index)}
              onLocationChange={onLocationChange(index)}
              onHintChange={onHintChange(index)}
              onDeleteLocation={() => onDeleteLocation(index)}
            />
          ))
        ) : (
          <div>Данные не загружены</div>
        )}
        <div className={styles.controls}>
          <button className={styles.button} onClick={createLocation}>
            Добавить тестовую локацию
          </button>
          <button
            className={styles.button}
            onClick={() => {
              console.log(locationsList);
            }}
          >
            Вывести результат в консоль
          </button>
        </div>
      </>
    );
  }
);

export default TestLocationsList;
