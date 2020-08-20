const ASSETS_PATH = "./assets/";
function AssetGetter(obj) {
  return ASSETS_PATH + obj.name + "." + obj.type;
}

export { AssetGetter }