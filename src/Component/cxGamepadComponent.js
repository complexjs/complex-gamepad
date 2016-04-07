'use strict';

class cxGamepadComponent extends cxComponent{
    constructor( controllerName ){
        super();
        this.tag = 'cx.gamepad.component';
        this.gamepad = null;
        this.controllerName = controllerName;
        this.controllerConnected = false;
    }

    /**
     * [isPressed description]
     * @param  {[type]}  buttonId [description]
     * @return {Boolean}          [description]
     */
    isPressed (buttonId){
        if(!this.controllerConnected){
            return;
        }

        let b = this.gamepad.buttons[buttonId];
        if (typeof(b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }

    /**
     * [getDirection description]
     * @param  {int} axeId [description]
     * @return {[type]}       [description]
     */
    getDirection(axeId){
        if(!this.controllerConnected){
            return;
        }

        return this.gamepad.axes[axeId];
    }
}
