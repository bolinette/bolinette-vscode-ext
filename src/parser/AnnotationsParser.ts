import * as esquery from "esquery";
import Annotation from "../models/Annotation";
import AnnotationParameter from "../models/AnnotationParameter";
import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";

export default class AnnotationParser {
  async parse(
    folderName: string,
    annotationName: string
  ): Promise<Annotation[]> {
    const annotations: Annotation[] = [];
    const serviceFiles = await FilesUtil.listRecursivelyFilesInFolder(
      folderName
    );
    await Promise.all(
      serviceFiles.map(async (file) => {
        const fileContent: string = await FilesUtil.readFile(file.path);
        const ast: any = await AstGenerator.parseCode(fileContent);
        const astClassDefs: any[] = esquery(ast, "ClassDef");
        const astDecorator: any = astClassDefs
          .map((classDef) => classDef.decorator_list)
          .flat()
          .find((decorator: any) => decorator.func?.id === annotationName);

        if (!astDecorator) {
          return;
        }

        const parameters: AnnotationParameter[] = [
          ...astDecorator.args.map(
            (arg: any) => new AnnotationParameter("arg", arg.s, null)
          ),
          ...astDecorator.keywords.map(
            (keyword: any) =>
              new AnnotationParameter(
                "keyword",
                keyword.arg,
                keyword.value.type === "Str"
                  ? keyword.value.s
                  : keyword.value.value
              )
          ),
        ];

        annotations.push(new Annotation(annotationName, parameters));
      })
    );

    return annotations;
  }
}
