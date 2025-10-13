import Sprite from "../Sprite";

export default class Heal extends Sprite {
    constructor(id) {
        super(id);
        this.max_frame = 5;
        this.max_frame_tick = 2;
        this.sprite_w = 30;
        this.sprite_h = 40;
        this.sprite_name = 'pack3';
        this.y_frame_offset = 1330;
        this.removable = true
    }
}