import fs from 'fs';

export class Vertex {
  readonly neighbor: Vertex[] = [];
  constructor(
    readonly id: number, // index for V in Graph
    readonly index: number // index for U, width * y + x, in Graph
  ) {

  }

  toString(): string {
    return this.index.toFixed();
  }
};

export type Vertices = Vertex[];
export type NullableVertices = (Vertex | null)[];

export class Config extends Array<Vertex> { // a set of locations for all agents
  toString(): string {
    return this.map(v => v.toString()).join(',');
  }
}

const r_height = /^height\s(\d+)$/;
const r_width = /^width\s(\d+)$/;
const r_map = /^map$/;

export class Graph {
  V: Vertices; // without nullptr
  U: NullableVertices; // with nullptr
  width: number; // grid width
  height: number; // grid height
  constructor(filename: string) { // taking map filename
    this.V = [];
    this.width = 0;
    this.height = 0;
    if (!fs.existsSync(filename)) {
      console.log(`file ${filename} is not found.`);
    }
    const lines = fs.readFileSync(filename)
      .toString()
      .split('\n')
      // for CRLF coding
      .map(line => line.endsWith('\r') ? line.slice(0, -1) : line);
    let line: string = '';

    // read fundamental graph parameters
    let result: RegExpMatchArray | null = null;
    while (line = lines.shift() ?? '') {
      if (result = line.match(r_height)) {
        this.height = parseInt(result[1]);
      }
      if (result = line.match(r_width)) {
        this.width = parseInt(result[1]);
      }
      if (line.match(r_map)) break;
    }

    this.U = [];

    // create vertices
    let y = 0;
    while (line = lines.shift() ?? '') {
      for (let x = 0; x < this.width; x++) {
        const s = line[x];
        if (s === 'T' || s === '@') {
          this.U.push(null);
        } else {
          const index = this.width * y + x;
          const v = new Vertex(this.V.length, index);
          this.V.push(v);
          this.U.push(v);
        }
      }
      y++;
    }

    // create edges
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const v = this.U[this.width * y + x];
        if (v === null) continue;
        // left
        if (x > 0) {
          const u = this.U[this.width * y + (x - 1)];
          if (u !== null) v.neighbor.push(u);
        }
        // right
        if (x < this.width - 1) {
          const u = this.U[this.width * y + (x + 1)];
          if (u !== null) v.neighbor.push(u);
        }
        // up
        if (y < this.height - 1) {
          const u = this.U[this.width * (y + 1) + x];
          if (u !== null) v.neighbor.push(u);
        }
        // down
        if (y > 0) {
          const u = this.U[this.width * (y - 1) + x];
          if (u !== null) v.neighbor.push(u);
        }
      }
    }
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
