class LevelRecord {
  level: number = 1;

  set setLevel(lv: number) {
    this.level = lv;
  }

  get getLevel() {
    return this.level;
  }
}

const levelRecord = new LevelRecord();

export default levelRecord;