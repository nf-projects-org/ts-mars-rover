import { InputParser } from "./src/controller/InputParser";
import {NodeInputParser} from "./src/controller/NodeInputParser"
import {BrowserInputParser} from "./src/controller/BrowserInputParser"
import { MarsStateController } from "./src/controller/MarsStateController";

let inputParser:InputParser;

if (typeof window !== 'undefined') {
    inputParser = new BrowserInputParser();
  } else {
    inputParser = new NodeInputParser(); 
}


export function start(){
  let marsStateController = new MarsStateController(inputParser);
  marsStateController.start();
}

start();