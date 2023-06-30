export interface Env {
  envID: number;
  name: string;
  // В ТЗ написано, что в форме надо отфлитровать env по локациям, так что я добавил список id локаций в env
  locationsID: number[];
}
