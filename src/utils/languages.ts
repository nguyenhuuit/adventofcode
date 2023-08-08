export const EXTENSIONS: { [key: string]: string} = {
  javascript: 'js',
  python: 'py',
  java: 'java',
  go: 'go'
};

const PYTHON_TEMPLATE =
`def solution(input):
  pass
`;

const JAVASCRIPT_TEMPLATE =
`export const solution = input => {
  return null;
}
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
}`;

const GO_TEMPLATE = (state: AppState) => (
  `package main

func Part${state.part}(input string) interface{} {
	return nil
}
`);

export const TEMPLATES: any = {
  javascript: JAVASCRIPT_TEMPLATE,
  python: PYTHON_TEMPLATE,
  java: JAVA_TEMPLATE,
  go: GO_TEMPLATE
};
