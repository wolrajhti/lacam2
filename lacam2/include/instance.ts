import { Config, Graph } from "./graph";
import { info } from "./utils";

export class Mt19937 {}

export class Instance {
  readonly G: Graph;
  readonly starts: Config;
  readonly goals: Config;
  readonly N: number;  // number of agents
  constructor(map_filename: string, start_indexes: number[], goal_indexes: number[]); // for testing
  constructor(scen_filename: string, map_filename: string, N?: number/* = 1 */); // for MAPF benchmark
  constructor(map_filename: string, MT: Mt19937, N?: number/* = 1 */); // random instance generation
  constructor(arg1: string, arg2: number[] | string | Mt19937, arg3?: number[] | number) {

  }
  is_valid(verbose = 0): boolean { // simple feasibility check of instance
    if (this.N !== this.starts.length || this.N !== this.goals.length) {
      info(1, verbose, "invalid N, check instance");
      return false;
    }
    return true;
  }
};

// solution: a sequence of configurations
export type Solution = Config[];
// std::ostream& operator<<(std::ostream& os, const Solution& solution);
