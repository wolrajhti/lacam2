import { DistTable } from "./dist_table";
import { Instance, Solution } from "./instance";

export function is_feasible_solution(ins: Instance, solution: Solution, verbose = 0): boolean {}
export function get_makespan(solution: Solution): number {}
export function get_path_cost(solution: Solution, i: number): number {}  // single-agent path cost
export function get_sum_of_costs(solution: Solution): number {}
export function get_sum_of_loss(solution: Solution): number {}
export function get_makespan_lower_bound(ins: Instance, D: DistTable): number {}
export function get_sum_of_costs_lower_bound(ins: Instance, D: DistTable): number {}
export function print_stats(verbose: number, ins: Instance, solution: Solution, comp_time_ms: number): void {}
export function make_log(
  ins: Instance,
  solution: Solution,
  output_name: string,
  comp_time_ms: number,
  map_name: string,
  seed: number,
  additional_info: string,
  log_short = false  // true -> paths not appear
): void {}
