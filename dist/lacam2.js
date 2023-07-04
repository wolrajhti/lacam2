"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lacam2 = void 0;
const planner_1 = require("./planner");
class Lacam2 {
    // main function
    solve(ins, additional_info, verbose = 0, deadline, MT, objective = 0 /* OBJ_NONE */, restart_rate = 0.001) {
        const planner = new planner_1.Planner(ins, deadline, MT, verbose, objective, restart_rate);
        return planner.solve(additional_info);
    }
}
exports.Lacam2 = Lacam2;
