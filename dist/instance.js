"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = exports.Mt19937 = void 0;
const utils_1 = require("./utils");
class Mt19937 {
}
exports.Mt19937 = Mt19937;
class Instance {
    constructor(arg1, arg2, arg3) {
    }
    is_valid(verbose = 0) {
        if (this.N !== this.starts.length || this.N !== this.goals.length) {
            (0, utils_1.info)(1, verbose, "invalid N, check instance");
            return false;
        }
        return true;
    }
}
exports.Instance = Instance;
;
// std::ostream& operator<<(std::ostream& os, const Solution& solution);
