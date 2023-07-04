"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_log = exports.print_stats = exports.get_sum_of_costs_lower_bound = exports.get_makespan_lower_bound = exports.get_sum_of_loss = exports.get_sum_of_costs = exports.get_path_cost = exports.get_makespan = exports.is_feasible_solution = void 0;
function is_feasible_solution(ins, solution, verbose = 0) { }
exports.is_feasible_solution = is_feasible_solution;
function get_makespan(solution) { }
exports.get_makespan = get_makespan;
function get_path_cost(solution, i) { } // single-agent path cost
exports.get_path_cost = get_path_cost;
function get_sum_of_costs(solution) { }
exports.get_sum_of_costs = get_sum_of_costs;
function get_sum_of_loss(solution) { }
exports.get_sum_of_loss = get_sum_of_loss;
function get_makespan_lower_bound(ins, D) { }
exports.get_makespan_lower_bound = get_makespan_lower_bound;
function get_sum_of_costs_lower_bound(ins, D) { }
exports.get_sum_of_costs_lower_bound = get_sum_of_costs_lower_bound;
function print_stats(verbose, ins, solution, comp_time_ms) { }
exports.print_stats = print_stats;
function make_log(ins, solution, output_name, comp_time_ms, map_name, seed, additional_info, log_short = false // true -> paths not appear
) { }
exports.make_log = make_log;
