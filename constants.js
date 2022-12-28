const EXTS = {
  javascript: 'js',
  python: 'py',
  java: 'java'
}

const PYTHON_TEMPLATE =
`def solution(input):
  return None
`;

const JAVASCRIPT_TEMPLATE =
`const solution = input => {
  return null;
}
module.exports = solution;
`;

const JAVA_TEMPLATE =
`import java.nio.file.Files;
import java.nio.file.Path;

class Solution {
  public static void log(Object o) {
    System.out.println(o);
  }
  public static String solve(String input) {
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
}`

const TEMPLATES = {
  javascript: JAVASCRIPT_TEMPLATE,
  python: PYTHON_TEMPLATE,
  java: JAVA_TEMPLATE
}

module.exports = {
  EXTS,
  TEMPLATES
}