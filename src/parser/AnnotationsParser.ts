import * as esquery from "esquery";
import Annotation from "../models/Annotation";
import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";

export default class AnnotationParser {
  async parse(folder: string, annotation: string): Promise<Annotation[]> {
    const annotations: Annotation[] = [];
    const serviceFiles = await FilesUtil.listRecursivelyFilesInFolder(folder);
    await Promise.all(
      serviceFiles.map(async (file) => {
        const fileContent: string = await FilesUtil.readFile(file.path);
        const ast: any = await AstGenerator.parseCode(fileContent);
        const astClassDefs: any[] = esquery(ast, "ClassDef");
        const astDecorator: any = astClassDefs
          .map((classDef) => classDef.decorator_list)
          .flat()
          .find((decorator: any) => decorator.func?.id === annotation);

        if (!astDecorator) {
          return;
        }

        annotations.push(new Annotation(astDecorator));
      })
    );

    return annotations;
  }
}
