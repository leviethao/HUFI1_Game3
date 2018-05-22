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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    circle: cc.Node = null;

    radius: number;
    angle: number;
    speed: number;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.radius = 100;
        this.angle = 0;
        this.speed = 100;
    }

    update (dt) {
        this.angle = (this.angle + this.speed * dt) % 360; 
        this.rotate(this.angle);
    }

    rotate (angle: number) {
        angle *= Math.PI / 180;
        let vec = cc.Vec2.ZERO;
        vec.x = Math.cos(angle);
        vec.y = Math.sin(angle);
        vec.normalizeSelf();

        //vec.mul(this.radius);
        vec.x *= this.radius;
        vec.y *= this.radius;

        vec.x += this.circle.x;
        vec.y += this.circle.y;
        //vec.addSelf(this.circle.position);
        this.node.position = vec;
    }
}
