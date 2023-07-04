import { DistTable } from "./dist_table";
import { Config, Vertex, Vertices } from "./graph";
import { Instance, Mt19937 } from "./instance";
import { Queue, Stack } from "std.ts";

export const enum Objective { OBJ_NONE, OBJ_MAKESPAN, OBJ_SUM_OF_LOSS }
// std::ostream& operator<<(std::ostream& os, const Objective objective);

// PIBT agent
class Agent {
  v_now?: Vertex; // current location
  v_next?: Vertex; // next location
  constructor(readonly id: number) {

  }
};

type Agents = Agent[];

// low-level node
class LNode {
  who: number[];
  where: Vertices;
  depth: number;
  constructor(parent?: LNode, i = 0, v?: Vertex) { // who and where

  }
};

// high-level node
class HNode {
  static HNODE_CNT: number;  // count #(high-level node)

  // tree
  neighbor: Set<HNode>;

  // costs
  f: number; // g + h (might be updated)

  // for low-level search
  priorities: number[];
  order: number[];
  search_tree: Queue<LNode>;

  constructor(
    readonly C: Config,
    D: DistTable,
    readonly parent: HNode,
    public g: number, // g-value (might be updated)
    readonly h: number // h-value
  ) {
    this.f = g + h;
  }
};

type HNodes = HNode[];

export class Planner {
  // solver utils
  readonly N: number;       // number of agents
  readonly V_size: number;  // number o vertices
  D: DistTable;
  loop_cnt: number;      // auxiliary

  // used in PIBT
  C_next: [Vertex | undefined, Vertex | undefined, Vertex | undefined, Vertex | undefined, Vertex | undefined][];  // next locations, used in PIBT
  tie_breakers: number[];              // random values, used in PIBT
  A: Agents;
  occupied_now: Agents;                          // for quick collision checking
  occupied_next: Agents;                         // for quick collision checking

  constructor(
    readonly ins: Instance,
    readonly deadline: Deadline,
    MT: Mt19937,
    readonly verbose = 0,
    // hyper parameters
    readonly objective = Objective.OBJ_NONE,
    readonly RESTART_RATE = 0.001 // random restart
  ) {

  };

  solve(additional_info: string): Solution {

  }

  expand_lowlevel(H: HNode, L: LNode): void {

  }
  rewrite(H_from: HNode, T: HNode, H_goal: HNode, OPEN: Stack<HNode>): void {

  }
  get_edge_cost(C1: Config, C2: Config): number {

  }
  get_edge_cost(H_from: HNode, H_to: HNode): number {

  }
  get_h_value(C: Config): number {

  }
  get_new_config(H: HNode, L: LNode): boolean {

  }
  funcPIBT(ai: Agent): boolean {

  };

  // swap operation
  swap_possible_and_required(ai: Agent): Agent {

  }
  is_swap_required(
    pusher: number,
    puller: number,
    v_pusher_origin: Vertex,
    v_puller_origin: Vertex
  ): boolean {

  }
  is_swap_possible(v_pusher_origin: Vertex, v_puller_origin: Vertex): boolean {

  }

  // utilities
  solver_info<T>(level: number, body: T): void {
    if (this.verbose < level) {
      console.log(`elapsed: ${elapsed_ms(deadline)} ms  loop_cnt: ${this.loop_cnt}  node_cnt: ${HNode.HNODE_CNT}`);
      info(level, this.verbose, body);
    }
  }
};
