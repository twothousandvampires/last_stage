// import ImpySprite from "./Enemy/ImpySprite";
import Sprite from "./Sprite";

export default abstract class UnitSprite extends Sprite{

    state: string | undefined
    action: boolean
  
    min_frame: number
    real_x: number | undefined
    real_y: number | undefined

    level_id: number = 0

    constructor(id: number){
        super(id)
        this.action = false
        this.sprite_h = 80
        this.sprite_w = 80
        this.min_frame = 0
    }

    abstract setState(state: string): void

    setLevelId(id: number, x ,y){
        this.level_id = id
        this.x = x
        this.y = y
    }

    public act(){
        if(this.stopped) return

        this.frame_tick ++
        
        if(this.frame_tick >= this.max_frame_tick){
            this.frame_tick = 0
            this.frame ++

            if(this.frame >= this.max_frame){
                if(this.removable){
                    this.need_to_remove = true
                }
                else if(this.repeatable){
                    this.frame = this.min_frame
                }
                else{
                    this.frame -= 1
                    this.stopped = true
                }
            }
        }
    }

    noSprite(){
        this.sprite_h = 30
        this.sprite_w = 30
        this.y_frame_offset = 0
        this.max_frame = 1
        this.max_frame_tick = 1
        this.sprite_name = 'no_sprite'
    }

    public update(data: any){
        super.update(data)

        this.action = data.action
        this.action_time = data.action_time

        if(this.state != data.state || !this.state){
            this.reset()
            this.setState(data.state)
        }
    }

    private reset(){
        this.frame = 0
        this.frame_tick = 0
        this.stopped = false
        this.stopped = false
        this.repeatable = true
        this.action = false
        this.removable = false
        this.is_bottom = false
    }   
}