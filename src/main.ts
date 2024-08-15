import { app } from "./app";
import IC from "./components/InstanceContainer";
import Level from "./system/Level";
import Gameover from "./scene/Gameover";

const level1 = new Level();
IC.register('level', level1);

level1.init();


const scene = new Gameover();
scene.init();