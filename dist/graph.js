"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_same_config = exports.Graph = exports.Vertex = void 0;
class Vertex {
    constructor(id, // index for V in Graph
    index // index for U, width * y + x, in Graph
    ) {
        this.id = id;
        this.index = index;
        this.neighbor = [];
    }
}
exports.Vertex = Vertex;
;
class Graph {
    constructor(filename) {
        this.V = [];
        this.width = 0;
        this.height = 0;
    }
    size() {
        return this.V.length;
    }
}
exports.Graph = Graph;
function is_same_config(C1, C2) {
    const N = C1.length;
    for (let i = 0; i < N; i++) {
        if (C1[i].id !== C2[i].id)
            return false;
    }
    return true;
}
exports.is_same_config = is_same_config;
// // hash function of configuration
// // c.f.
// // https://stackoverflow.com/questions/10405030/c-unordered-map-fail-when-used-with-a-vector-as-key
// struct ConfigHasher {
//   uint operator()(const Config& C) const;
// };
// std::ostream& operator<<(std::ostream& os, const Vertex* v);
// std::ostream& operator<<(std::ostream& os, const Config& config);
