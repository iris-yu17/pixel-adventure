import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";
import Opening from "./scene/Opening";
import Level1Cutscene from "./scene/Level1Cutscene";
import Level2Cutscene from "./scene/Level2Cutscene";
import Level3Cutscene from "./scene/Level3Cutscene";
import WinCutscene from "./scene/WinCutscene";
import IcEnum from "./types/instanceContainer";
import Win from "./scene/Win";
import LoadingScene from "./scene/LoadingScene";

const level1 = new Level(1);
IC.register(IcEnum.Level1, level1);

const level2 = new Level(2);
IC.register(IcEnum.Level2, level2);

const level3 = new Level(3);
IC.register(IcEnum.Level3, level3);

const loading = new LoadingScene();
loading.init()

const opening = new Opening();
IC.register(IcEnum.Opening, opening);

const gameover = new Gameover();
IC.register(IcEnum.Gameover, gameover);

const win = new Win();
IC.register(IcEnum.Win, win);

const level1Cutscene = new Level1Cutscene();
IC.register(IcEnum.Level1Cutscene, level1Cutscene);

const level2Cutscene = new Level2Cutscene();
IC.register(IcEnum.Level2Cutscene, level2Cutscene);

const level3Cutscene = new Level3Cutscene();
IC.register(IcEnum.Level3Cutscene, level3Cutscene);

const winCutscene = new WinCutscene();
IC.register(IcEnum.WinCutscene, winCutscene);
