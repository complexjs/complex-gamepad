'use strict';

/**
 *
 */
class cxGamepadSystem extends cxVoidSystem{
    constructor( connectedCB ){
        super();
        this.tag = 'cx.gamepad.system';

        /**
         * collection of connected gamepads
         * @type {Gamepad[]}
         */
        this.gamepads = [];
        this.controllers = [];
        this.connectedCB = connectedCB;

        window.addEventListener("gamepadconnected", this._connectedClosure(this));
        window.addEventListener("gamepaddisconnected", this._disconnectedClosure(this));
    }

    /**
     * [_connectedClosure description]
     * @param  {cxGamepadSystem} self [description]
     */
    _connectedClosure(self){
        return function(e){
            self.connected(e.gamepad);
        }
    }

    /**
     * [_disconnectedClosure description]
     * @param  {cxGamepadSystem} self [description]
     */
    _disconnectedClosure(self){
        return function(e){
            self.disconnected(e.gamepad);
        }
    }

    /**
     * [added description]
     * @param  {[type]} cxEntity [description]
     * @return {[type]}          [description]
     */
    added (cxEntity ){
        this.fetchController(cxEntity);
    }

    /**
     * [fetchController description]
     * @param  {[type]} cxEntity [description]
     * @return {[type]}          [description]
     */
    fetchController(cxEntity){

        if(cxEntity.hasComponent('cx.gamepad.component')){
            let comp = cxEntity.getComponent('cx.gamepad.component');
            let name = comp.controllerName;
            let gamepad = comp.gamepad;

            if(this.controllers[name] && gamepad === null){
                comp.gamepad = this.gamepads[this.controllers[name].gamepad];
                comp.controllerConnected = true;
            }
        }
    }

    /**
     * [connect description]
     * @param  {Gamepad} gamepad [description]
     */
    connected(gamepad){
        var controllerName = this.connectedCB(this, gamepad.index, gamepad);
        this.gamepads[gamepad.index] = gamepad;
        if(controllerName != null){
            this.controllers[controllerName] = { 'gamepad' : gamepad.index};
        }
    }

    /**
     * [disconnect description]
     * @param  {Gamepad} gamepad [description]
     */
    disconnected(gamepad){
        delete this.gamepads[gamepad.index];
    }

    /**
     * [getPad description]
     * @param  {int} idx [description]
     * @return {Gamepad}     [description]
     */
    getPad(idx){
        return this.gamepads[idx];
    }

    /**
     * [isPressed description]
     * @param  {Gamepad}  gamepad  [description]
     * @param  {int}  buttonId [description]
     * @return {Boolean}          [description]
     */
    isPressed (gamepad, buttonId){
        let b = gamepad.buttons[buttonId];
        if (typeof(b) == "object") {
            return b.pressed;
          }
          return b == 1.0;
    }

    /**
     * [getDirection description]
     * @param  {Gamepad} gamepad [description]
     * @param  {int} axeId   [description]
     * @return {float}         [description]
     */
    getDirection(gamepad, axeId){
        return gamepad.axes[axeId];
    }
}
