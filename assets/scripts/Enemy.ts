// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import InGame from "./InGame";
@ccclass
export default class NewClass extends cc.Component {

    colors: cc.Color[] = [];
    colorIndex: number;

    inGame: InGame = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.colors = [cc.Color.RED, cc.Color.BLUE, cc.Color.GREEN, cc.Color.YELLOW, cc.Color.WHITE, cc.Color.ORANGE, cc.Color.MAGENTA];
        this.colorIndex = 0;
    }

    start () {
        this.schedule(this.changeColor, 1, cc.macro.REPEAT_FOREVER);
    }

    update (dt) {}

    init () {
        this.inGame.enemyContainer.push(this.node);
    }

    destroyEnemy () {
        this.inGame.enemyContainer.splice(this.inGame.enemyContainer.indexOf(this.node), 1);
    }

    changeColor () {
        this.colorIndex = (this.colorIndex + 1) % this.colors.length;
        this.node.color = this.colors[this.colorIndex];
    }

    reuse () {
    }

    unuse () {

    }
}
