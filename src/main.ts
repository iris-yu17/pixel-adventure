import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";
import Opening from "./scene/Opening";
import Level1Cutscene from "./scene/Level1Cutscene";

const level1 = new Level();
IC.register('level1', level1);

// level1.init();

const opening = new Opening();
opening.init();
IC.register('opening', opening);

const gameover = new Gameover();
IC.register('gameover', gameover);

const level1Cutscene = new Level1Cutscene();
IC.register('level1Cutscene', level1Cutscene);
