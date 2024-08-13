class InstanceContainer {
  dependencies: { [key: string]: any; };

  constructor() {
    this.dependencies = {};
  }

  register(key: string, instance: any) {
    this.dependencies[key] = instance;
  }

  get(key: string) {
    return this.dependencies[key];
  }
}

const IC = new InstanceContainer();

export default IC;