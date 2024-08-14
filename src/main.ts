import IC from "./components/InstanceContainer";
import Level from "./system/Level";

const level1 = new Level();
IC.register('level', level1)

level1.init();
