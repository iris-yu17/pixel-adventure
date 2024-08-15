import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";

const level1 = new Level();
IC.register('level1', level1);

level1.init();


const gameover = new Gameover();
IC.register('gameover', gameover);