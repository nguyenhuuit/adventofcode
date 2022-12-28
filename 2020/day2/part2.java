import java.nio.file.Files;
import java.nio.file.Path;

class Solution {
  public static void log(Object o) {
    System.out.println(o);
  }
  public static String solve(String input) {
    String[] lines = input.split("\n");
    Integer rs = 0;
    for (String line : lines) {
      String parts[] = line.split("[- :]");
      char ch = parts[2].charAt(0);
      if (parts[4].charAt(Integer.parseInt(parts[0])-1) == ch ^
        parts[4].charAt(Integer.parseInt(parts[1])-1) == ch) {
        rs++;
      }
    }
    return Integer.toString(rs);
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