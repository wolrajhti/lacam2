import { Queue } from 'std.ts';
import { Vertex } from './graph';
import { Instance } from './instance';

export class DistTable {
  readonly V_size: number;  // number of vertices
  readonly table: number[][]; // distance table, index: agent-id & vertex-id
  readonly OPEN: Queue<Vertex>[] = []; // search queue
  constructor(ins: Instance) {
    this.V_size = ins.G.V.length;
    this.table = [];
    for (let i = 0; i < ins.N; i++) {
      const a: number[] = [];
      for (let j = 0; j < this.V_size; j++) {
        a.push(this.V_size);
      }
      this.table.push(a);
    }
    this.setup(ins);
  }
  get(i: number, v_id: Vertex | number): number {
    return this._get(i, typeof v_id === 'number' ? v_id : v_id.id);
  }
  private _get(i: number, v_id: number): number {
    if (this.table[i][v_id] < this.V_size) return this.table[i][v_id];

    /*
    * BFS with lazy evaluation
    * c.f., Reverse Resumable A*
    * https://www.aaai.org/Papers/AIIDE/2005/AIIDE05-020.pdf
    *
    * sidenote:
    * tested RRA* but lazy BFS was much better in performance
    */

    while (!this.OPEN[i].empty()) {
      const n = this.OPEN[i].front();
      this.OPEN[i].pop();
      const d_n = this.table[i][n.id];
      for (const m of n.neighbor) {
        const d_m = this.table[i][m.id];
        if (d_n + 1 >= d_m) continue;
        this.table[i][m.id] = d_n + 1;
        this.OPEN[i].push(m);
      }
      if (n.id == v_id) return d_n;
    }
    return this.V_size;
  }

  setup(ins: Instance) { // initialization
    for (let i = 0; i < ins.N; i++) {
      this.OPEN.push(new Queue());
      const n = ins.goals[i];
      this.OPEN[i].push(n);
      this.table[i][n.id] = 0;
    }
  }
};
