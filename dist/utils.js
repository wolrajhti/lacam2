"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_random_int = exports.get_random_float = exports.is_expired = exports.elapsed_ns = exports.elapsed_ms = exports.Deadline = exports.info = void 0;
// using Time = std::chrono::steady_clock;
function info(level, verbose, ...body) {
    if (verbose < level)
        return;
    console.log(body.shift());
    info(level, verbose, ...body);
}
exports.info = info;
// time manager
class Deadline {
    constructor(time_limit_ms = 0) {
        this.time_limit_ms = time_limit_ms;
    }
    elapsed_ms() {
    }
    elapsed_ns() {
    }
}
exports.Deadline = Deadline;
;
function elapsed_ms(deadline) {
}
exports.elapsed_ms = elapsed_ms;
function elapsed_ns(deadline) {
}
exports.elapsed_ns = elapsed_ns;
function is_expired(deadline) {
}
exports.is_expired = is_expired;
function get_random_float(MT, from = 0, to = 1) {
}
exports.get_random_float = get_random_float;
function get_random_int(MT, from = 0, to = 1) {
}
exports.get_random_int = get_random_int;
