import fs from 'fs';

export class Vertex {
  readonly neighbor: Vertex[] = [];
  constructor(
    readonly id: number, // index for V in Graph
    readonly index: number // index for U, width * y + x, in Graph
  ) {

  }
};

export type Vertices = Vertex[];
export type Config = Vertex[]; // a set of locations for all agents

export class Graph {
  V: Vertices; // without nullptr
  U: Vertices; // with nullptr
  width: number; // grid width
  height: number; // grid height
  constructor(filename: string) { // taking map filename
    this.V = [];
    this.width = 0;
    this.height = 0;
    if (!fs.existsSync(filename)) {
      console.log(`file ${filename} is not found.`);
    }
    const lines = fs.readFileSync(filename).toString().split('\n');
    lines.map(line => line.endsWith('\r') ? line.slice(0, -1) : line)

  }
  size(): number { // the number of vertices
    return this.V.length;
  }
}

export function is_same_config(C1: Config, C2: Config): boolean { // check equivalence of two configurations
  const N = C1.length;
  for (let i = 0; i < N; i++) {
    if (C1[i].id !== C2[i].id) return false;
  }
  return true;
}

// // hash function of configuration
// // c.f.
// // https://stackoverflow.com/questions/10405030/c-unordered-map-fail-when-used-with-a-vector-as-key
// struct ConfigHasher {
//   uint operator()(const Config& C) const;
// };

// std::ostream& operator<<(std::ostream& os, const Vertex* v);
// std::ostream& operator<<(std::ostream& os, const Config& config);
