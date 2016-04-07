'use strict';
/**
 *
 */
class cxGamepadConnectSystem extends cxEntitySystem{
    constructor(){
        super();
        this.tag = 'cx.gamepad.connectsystem';
        this.components = ['cx.gamepad.component'];
    }

    /**
     * [update description]
     * @param  {[type]} entity     [description]
     * @param  {[type]} components [description]
     * @return {[type]}            [description]
     */
    update (entity, components){
        let comp = components['cx.gamepad.component'];
        if(comp.controllerConnected){
            return;
        }

        this.world.getSystem('cx.gamepad.system').fetchController(entity);
    }
}
