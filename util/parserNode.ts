export default interface ParserNode {
  type: string;
  data: {
    [key: string]: string;
  };
  children: null | ParserNode[];
}
