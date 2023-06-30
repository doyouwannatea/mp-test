import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import sample from "../data.json";
import { Env } from "../models/Env";
import { Location } from "../models/Location";
import { Server } from "../models/Server";
import { sleep } from "../utils/promise";

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchData() {
    this.isLoaded = false;
    await sleep(300);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  }
}

export const store = new Store();
export const storeContext = createContext(store);
