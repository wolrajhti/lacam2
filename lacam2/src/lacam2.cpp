#include "../include/lacam2.hpp"

Solution solve(const Instance& ins, std::string& additional_info,
               const int verbose, const Deadline* deadline, std::mt19937* TT,
               const Objective objective, const float restart_rate)
{
  auto planner = Planner(&ins, deadline, TT, verbose, objective, restart_rate);
  return planner.solve(additional_info);
}
