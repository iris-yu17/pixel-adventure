import IcEnum from "../types/instanceContainer";

class InstanceContainer {
  dependencies: { [key: string]: any; };

  constructor() {
    this.dependencies = {};
  }

  register(key: IcEnum, instance: any) {
    this.dependencies[key] = instance;
  }

  get(key: IcEnum) {
    return this.dependencies[key];
  }
}

const IC = new InstanceContainer();

export default IC;