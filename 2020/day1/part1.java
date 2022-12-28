import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;

class Solution {
  public static String solve(String input) {
    HashSet<Integer> set = new HashSet<Integer>();
    String[] lines = input.split("\n");
    for (int i = 0; i < lines.length; i++) {
      Integer v = Integer.parseInt(lines[i]);
      if (set.contains(2020 - v)) {
        return Integer.toString(v * (2020 - v));
      } else {
        set.add(v);
      }
    }
    return input;
  } 
  public static void main(String[] args) {
    try {
      String input = Files.readString(Path.of(args[0]));
      System.out.println(solve(input));
    } catch(Exception ex) {
      System.out.println(ex);
      System.exit(1);
    }
  }
}