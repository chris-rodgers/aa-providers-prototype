import { TriggerWithArgs } from "swr/mutation";

export interface Product<Data> {
  data?: Data;
  status: Status;
  trigger: TriggerWithArgs<Data, any, string, any>;
}

export type Status = "loading" | "mutating" | "error" | "ok";
