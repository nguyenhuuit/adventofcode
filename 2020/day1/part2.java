import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Set;

class Solution {
  public static String solve(String input) {
    Set<Integer> set = new HashSet<Integer>();
    String[] lines = input.split("\n");
    for (int i = 0; i < lines.length; i++) {
      Integer v = Integer.parseInt(lines[i]);
      for (Integer v1 : set) {
        if (set.contains(2020 - v - v1)) {
          return Integer.toString(v * v1 * (2020 - v - v1));
        }
      }
      set.add(v);
    }
    return null;
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
