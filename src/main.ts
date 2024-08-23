import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";
import Opening from "./scene/Opening";
import Level1Cutscene from "./scene/Level1Cutscene";
import Level2Cutscene from "./scene/Level2Cutscene";
import Level3Cutscene from "./scene/Level3Cutscene";

const level1 = new Level(1);
IC.register('level1', level1);

const level2 = new Level(2);
IC.register('level2', level2);

const level3 = new Level(3);
IC.register('level3', level3);

level1.init();

const opening = new Opening();
// opening.init();
IC.register('opening', opening);

const gameover = new Gameover();
IC.register('gameover', gameover);

const level1Cutscene = new Level1Cutscene();
IC.register('level1Cutscene', level1Cutscene);

const level2Cutscene = new Level2Cutscene();
IC.register('level2Cutscene', level2Cutscene);

const level3Cutscene = new Level3Cutscene();
IC.register('level3Cutscene', level3Cutscene);
