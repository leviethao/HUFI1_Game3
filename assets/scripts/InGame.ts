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
        for (let i = 0; i < 10; i++) {
            this.spawnEnemy(i * 36);
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
        enemy.getComponent(Enemy).init();
        return enemy;
    }

    spawnEnemy (angle: number) {
        let enemy = this.createEnemy();
        this.enemyRotateOrigin.addChild(enemy);

        //random position
        let vec2 = cc.Vec2.ZERO;

        angle *= Math.PI / 180;
        vec2.x = Math.cos(angle);
        vec2.y = Math.sin(angle);
        
        vec2.x = vec2.x * this.trajectoryRadius;
        vec2.y = vec2.y * this.trajectoryRadius;
    
        enemy.position = vec2;
    }

    // checkOverrideEnemy(vec: cc.Vec2) {
    //     for (let enemy of this.enemyContainer) {
    //         if (cc.pDistance(vec, enemy.position) <= enemy.width) {
    //              return true;
    //         }
    //     }
    //     return false;
    // }
}
