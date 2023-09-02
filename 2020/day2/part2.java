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
}