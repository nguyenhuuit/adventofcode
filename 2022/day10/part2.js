export const solution = (input) => {
  let cycle = 0;
  let register = 1;
  let output = "#";
  const tick = () => {
    output += Math.abs(register - (cycle % 40)) <= 1 ? '#' : '.'
  };

  const lines = input.split(/\n/);

  for (let i = 0; i < lines.length; i++) {
    const [command, param] = lines[i].split(" ");
    if (command === "noop") {
      cycle++;
      tick();
    }
    if (command == "addx") {
      cycle++;
      tick();
      cycle++;
      register += int(param);
      tick();
    }
  }

  let rs = "";
  for (let i = 0; i < 6; i++) {
    rs += `\n${output.substring(i * 40, i * 40 + 39)}`;
  }
  return rs;
};
