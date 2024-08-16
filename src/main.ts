import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";
import Opening from "./scene/Opening";

const level1 = new Level();
IC.register('level1', level1);

// level1.init();

const opening = new Opening();
opening.init();

const gameover = new Gameover();
IC.register('gameover', gameover);