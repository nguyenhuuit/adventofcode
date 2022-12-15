const solution = (input) => {
  let sum = 0;
  let cycle = 0;
  let register = 1;
  const tick = () => {
    cycle++;
    if (cycle % 40 === 20) {
      sum += register * cycle;
    }
  };

  const lines = input.split(/\n/);

  for (let i = 0; i < lines.length; i++) {
    const [command, param] = lines[i].split(" ");
    if (command === "noop") {
      tick();
    }
    if (command == "addx") {
      tick();
      tick();
      register += int(param);
    }
  }
  return sum;
};

module.exports = solution;
