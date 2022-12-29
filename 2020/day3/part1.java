import java.nio.file.Files;
import java.nio.file.Path;

class Solution {
  public static void log(Object o) {
    System.out.println(o);
  }
  public static String solve(String input) {
    String[] lines = input.split("\n");
    int width = lines[0].length();
    int row = 0;
    int col = 0;
    int count = 0;
    while (row < lines.length) {
      int rCol = col % width;
      if (lines[row].substring(rCol, rCol+1).equals("#")) {
        count++;
      }
      row++;
      col += 3;
    }
    return Integer.toString(count);
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