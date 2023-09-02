class Solution {
  public static String solve(String input) {
    String[] lines = input.split("\n");
    Integer rs = 0;
    for (String line : lines) {
      String parts[] = line.split("[- :]");
      Integer occurence = parts[4].length() - parts[4].replaceAll(parts[2], "").length();
      if (occurence >= Integer.parseInt(parts[0]) && occurence <= Integer.parseInt(parts[1]) ) {
        rs++;
      }
    }
    return Integer.toString(rs);
  }
}