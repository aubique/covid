export function throwIfAlreadyLoaded(
  parentModule: any,
  moduleName: string,
) {
  if (parentModule) {
    throw new Error(`${moduleName} had already been loaded. `
      + `Import ${moduleName} modules in the AppModule only.`);
  }
}
