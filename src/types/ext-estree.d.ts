export interface Decorator {
  args: Argument[];
  func: {
    id: string;
  };
  keywords: Keyword[];
}

export type Argument = {
  type: string;
  col_offset: number;
  lineno: number;
  s?: string;
  value?: string;
};

export type Keyword = {
  type: string;
  arg: string;
  value: Argument;
};

export type TupleElement = {
  type: string;
  s?: string;
  value?: string;
};

export type ClassDef = import("estree").Node & {
  decorator_list: Decorator[];
  lineno: number;
  end_lineno: number;
};

export type Tuple = import("estree").Node & {
  elts: TupleElement[];
};
