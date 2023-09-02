class Solution {
  public static long countTree(String[] lines, int dRow, int dCol) {
    int width = lines[0].length();
    int row = 0;
    int col = 0;
    long count = 0;
    while (row < lines.length) {
      int rCol = col % width;
      if (lines[row].substring(rCol, rCol+1).equals("#")) {
        count++;
      }
      row += dRow;
      col += dCol;
    }
    return count;
  }
  public static String solve(String input) {
    String[] lines = input.split("\n");
    long rs = countTree(lines, 1, 1) *
      countTree(lines, 1, 3) *
      countTree(lines, 1, 5) *
      countTree(lines, 1, 7) *
      countTree(lines, 2, 1);
    return Long.toString(rs);
  }
}