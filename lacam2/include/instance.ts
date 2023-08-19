import { Config, Graph, Vertex } from "./graph";
import { info } from "./utils";
import fs from 'fs';

export class Mt19937 {
  // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  shuffle(arr: any[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}

const r_instance = /(\d+\t.+\.map\t\d+\t\d+\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t.+)/;

export class Instance {
  readonly G: Graph;
  readonly starts: Config;
  readonly goals: Config;
  readonly N: number;  // number of agents
  constructor(map_filename: string, start_indexes: number[], goal_indexes: number[]); // for testing
  constructor(scen_filename: string, map_filename: string, N?: number/* = 1 */); // for MAPF benchmark
  constructor(map_filename: string, MT: Mt19937, N?: number/* = 1 */); // random instance generation
  constructor(arg1: string, arg2: number[] | string | Mt19937, arg3?: number[] | number) {
    this.starts = new Config();
    this.goals = new Config();
    if (Array.isArray(arg2)) {
      // constructeur 1
      this.G = new Graph(arg1);
      this.starts.push(...(arg2 as number[]).map(k => this.G.U[k] as Vertex));
      this.goals.push(...(arg3 as number[]).map(k => this.G.U[k] as Vertex));
      this.N = this.starts.length;
    } else if (typeof arg2 === 'string') {
      // constructeur 2
      this.G = new Graph(arg2);
      this.N = arg3 as number;

      // load start-goal pairs
      if (!fs.existsSync(arg1)) {
        console.log(`file ${arg1} is not found.`);
      }
      const lines = fs.readFileSync(arg1)
        .toString()
        .split('\n')
        // for CRLF coding
        .map(line => line.endsWith('\r') ? line.slice(0, -1) : line);
      let line: string = '';

      // read fundamental graph parameters
      let result: RegExpMatchArray | null = null;
      while (line = lines.shift() ?? '') {
        if (result = line.match(r_instance)) {
          const x_s = parseInt(result[1]);
          const y_s = parseInt(result[2]);
          const x_g = parseInt(result[3]);
          const y_g = parseInt(result[4]);
          if (x_s < 0 || this.G.width <= x_s || x_g < 0 || this.G.width <= x_g) continue;
          if (y_s < 0 || this.G.height <= y_s || y_g < 0 || this.G.height <= y_g) continue;
          const s = this.G.U[this.G.width * y_s + x_s];
          const g = this.G.U[this.G.width * y_g + x_g];
          if (s === null || g === null) continue;
          this.starts.push(s);
          this.goals.push(g);
        }
        if (this.starts.length === this.N) break;
      }
    } else {
      // constructeur 3
      this.G = new Graph(arg1);
      this.N = arg3 as number;

      // randon assignment
      const V_size = this.G.size();

      // set starts
      const s_indexes: number[] = [];
      for (let n = 0; n < V_size; n++) {
        s_indexes.push(n);
      }
      (arg2 as Mt19937).shuffle(s_indexes);
      let i = 0;
      while (true) {
        if (i >= V_size) return;
        this.starts.push(this.G.V[s_indexes[i]] as Vertex);
        if (this.starts.length === this.N) break;
        i++;
      }

      // set goals
      const g_indexes: number[] = [];
      for (let n = 0; n < V_size; n++) {
        g_indexes.push(n);
      }
      (arg2 as Mt19937).shuffle(g_indexes);
      let j = 0;
      while (true) {
        if (j >= V_size) return;
        this.goals.push(this.G.V[g_indexes[j]] as Vertex);
        if (this.goals.length === this.N) break;
        j++;
      }
    }
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
export class Solution extends Array<Config> {
  toString(): string {
    return this.map((c, i) => `${i.toFixed()}:${c.map(v => v.index).join('->')}`).join('\n');
  }
}
