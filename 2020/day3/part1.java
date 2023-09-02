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
}