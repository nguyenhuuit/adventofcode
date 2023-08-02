import sys
import os
import time
args = sys.argv
folder = args[1] + "/day" + args[2]
input_file = folder + "/" + args[4] + ".txt"
sys.path.append(os.path.abspath(folder))

if (args[3] == "1"):
  from part1 import solution
else:
  from part2 import solution

with open(os.path.abspath(input_file)) as inp:
  input_text = inp.read().strip()
  start_time = time.perf_counter_ns()
  rs = solution(input_text)
  end_time = time.perf_counter_ns()
  execution_time = (end_time - start_time)/1000000
  print(rs);
  print("{:.3f}ms".format(execution_time))
