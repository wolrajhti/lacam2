import { Mt19937 } from "./instance";

// using Time = std::chrono::steady_clock;
export function info<T extends any[]>(level: number, verbose: number, ...body: T): void {
  if (verbose < level) return;
  console.log(body.shift());
  info(level, verbose, ...body);
}

// time manager
export class Deadline {
  t_s: number;

  constructor(readonly time_limit_ms = 0) {

  }
  elapsed_ms(): number {

  }
  elapsed_ns(): number {

  }
};

export function elapsed_ms(deadline: Deadline): number {

}
export function elapsed_ns(deadline: Deadline): number {

}
export function is_expired(deadline: Deadline): boolean {

}

export function get_random_float(MT: Mt19937, from = 0, to = 1): number {

}
export function get_random_int(MT: Mt19937, from = 0, to = 1): number {

}
