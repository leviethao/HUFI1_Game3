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
const DEFAULT_ENEMY_POOL_SIZE = 10;
import Enemy from "./Enemy";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    enemyRotateOrigin: cc.Node = null;

    @property(cc.Node)
    circle: cc.Node = null;

    @property(cc.Prefab)
    enemyPrefab: cc.Prefab = null;

    enemyPool: cc.NodePool = null;
    trajectoryRadius: number = 0;
    enemyContainer: cc.Node[] = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enemyPool = new cc.NodePool("Enemy");
        for (let i = 0; i < DEFAULT_ENEMY_POOL_SIZE; i++) {
            let enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }

        this.enemyRotateOrigin.position = this.circle.position;
        this.trajectoryRadius = this.circle.width * 1.2;
    }

    start () {
        for (let i = 0; i < 15; i++) {
            this.spawnEnemy();
        }
    }

    update (dt) {}

    createEnemy () : cc.Node {
        let enemy: cc.Node = null;
        if (this.enemyPool.size() > 0) {
            enemy = this.enemyPool.get();
        } else {
            enemy = cc.instantiate(this.enemyPrefab);
        }
        enemy.getComponent(Enemy).inGame = this;
        return enemy;
    }

    spawnEnemy () {
        let enemy = this.createEnemy();
        this.enemyRotateOrigin.addChild(enemy);

        //random position
        let angleRand = Math.floor(cc.randomMinus1To1() * 180);
        let vec1 = new cc.Vec2(1, 0);
        let vec2 = cc.Vec2.ZERO;

        do {
            vec2.x = vec1.x / Math.cos(angleRand);
            vec2.y = Math.tan(angleRand) * vec1.x;
            vec2.normalizeSelf();
            
            vec2.x = vec2.x * this.trajectoryRadius + this.circle.x;
            vec2.y = vec2.y * this.trajectoryRadius +  this.circle.y;
        } while (this.checkOverrideEnemy(vec2));
        

        enemy.position = vec2;
    }

    checkOverrideEnemy(vec: cc.Vec2) {
        for (let enemy of this.enemyContainer) {
            if (vec.sub(enemy.position).mag() > enemy.width) {
                return true;
            }
        }
        return false;
    }
}
