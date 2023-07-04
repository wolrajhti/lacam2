"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
// std::ostream& operator<<(std::ostream& os, const Objective objective);
// PIBT agent
class Agent {
    constructor(id) {
        this.id = id;
    }
}
;
// low-level node
class LNode {
    constructor(parent, i = 0, v) {
    }
}
;
// high-level node
class HNode {
    constructor(C, D, parent, g, // g-value (might be updated)
    h // h-value
    ) {
        this.C = C;
        this.parent = parent;
        this.g = g;
        this.h = h;
        this.f = g + h;
    }
}
;
class Planner {
    constructor(ins, deadline, MT, verbose = 0, 
    // hyper parameters
    objective = 0 /* OBJ_NONE */, RESTART_RATE = 0.001 // random restart
    ) {
        this.ins = ins;
        this.deadline = deadline;
        this.verbose = verbose;
        this.objective = objective;
        this.RESTART_RATE = RESTART_RATE;
    }
    ;
    solve(additional_info) {
    }
    expand_lowlevel(H, L) {
    }
    rewrite(H_from, T, H_goal, OPEN) {
    }
    get_edge_cost(C1, C2) {
    }
    get_edge_cost(H_from, H_to) {
    }
    get_h_value(C) {
    }
    get_new_config(H, L) {
    }
    funcPIBT(ai) {
    }
    ;
    // swap operation
    swap_possible_and_required(ai) {
    }
    is_swap_required(pusher, puller, v_pusher_origin, v_puller_origin) {
    }
    is_swap_possible(v_pusher_origin, v_puller_origin) {
    }
    // utilities
    solver_info(level, body) {
        if (this.verbose < level) {
            console.log(`elapsed: ${elapsed_ms(deadline)} ms  loop_cnt: ${this.loop_cnt}  node_cnt: ${HNode.HNODE_CNT}`);
            info(level, this.verbose, body);
        }
    }
}
exports.Planner = Planner;
;
