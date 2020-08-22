class Assets {
  static ASSETS_PATH = "../../../assets/";
  static DEFAULT_TYPE = "svg";

  static get(attr) {
    const type = this.getType(attr);
    return this.ASSETS_PATH + attr.name + "." + type;
  }

  static getType(attr) {
    return attr.type ? attr.type : this.DEFAULT_TYPE;
  }
  
}

export default Assets;