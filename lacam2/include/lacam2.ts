import { Instance, Mt19937, Solution } from "./instance"
import { Objective, Planner } from "./planner"
import { Deadline } from "./utils"

export class Lacam2 {
  // main function
  solve(ins: Instance, additional_info: string, verbose = 0, deadline: Deadline, MT: Mt19937, objective = Objective.OBJ_NONE, restart_rate = 0.001): Solution {
    const planner = new Planner(ins, deadline, MT, verbose, objective, restart_rate);
    return planner.solve(additional_info);
  }
}