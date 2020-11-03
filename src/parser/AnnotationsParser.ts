import * as esquery from "esquery";
import AstGenerator from "../utils/AstGenerator";
import FilesUtil from "../utils/FilesUtil";

export default class AnnotationParser {
  async parseServices(): Promise<string[]> {
    const serviceFiles = await FilesUtil.listRecursivelyFilesInFolder(
      "services"
    );
    const servicesPromises: Promise<any>[] = serviceFiles.map(async (file) => {
      const fileContent: string = await FilesUtil.readFile(file.path);
      const ast: any = await AstGenerator.parseCode(fileContent);
      const astClassDefs: any[] = esquery(ast, "ClassDef");
      const astDecorators = astClassDefs.map((classDef) =>
        classDef.decorator_list.find(
          (decorator: any) => decorator.func.id === "service"
        )
      );
      return astDecorators[0]?.args[0]?.s;
    });

    const serviceNames: string[] = await Promise.all(servicesPromises);
    return serviceNames.filter((serviceName) => !!serviceName);
  }
}
