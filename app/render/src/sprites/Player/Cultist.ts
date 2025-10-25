import UnitSprite from "../UnitSprite"

export default class Cultist extends UnitSprite{

    resource: number
    max_resource: number
    life_status: number
    first: boolean | undefined
    secondary: boolean | undefined
    finisher: boolean | undefined
    utility: boolean | undefined
    level_id: number
    second: any
    ward: number = 0
    invisible: boolean = false
   
    constructor(id: number){
      super(id)
      this.resource = 0
      this.max_resource = 0
      this.life_status = 0
      this.real_x = 6
      this.real_y = 10
      this.can_share_light = false
      this.level_id = 0
      this.light_z = 6
    }

    update(data: any){
        super.update(data)
        this.resource = data.resource
        this.max_resource = data.maximum_resources
        this.life_status = data.life_status
        this.first = data.first
        this.secondary = data.secondary
        this.finisher = data.finisher
        this.utility = data.utility
        this.second = data.second
        this.ward = data.ward
        this.invisible = data.invisible
        this.abilities = data.abilities
        this.can_use = data.can_use
        this.courage = data.courage
        this.max_courage = data.max_courage
    }
    
    setState(state: string){
        this.state = state
        
        if(this.state === 'idle'){
            let r = Math.random()
            if(r > 0.5){
                this.sprite_name = 'cultist1'
                this.y_frame_offset = 0
                this.max_frame = 1
                this.max_frame_tick = 200
            }
            else{
                this.sprite_name = 'cultist1'
                this.y_frame_offset = 80
                this.max_frame = 14
                this.max_frame_tick = 10
            }
        }
        else if(this.state === 'move'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 160
            this.max_frame = 7
            this.max_frame_tick = 7
        }
        else if(this.state === 'attack'){
            let r = Math.random()
            this.repeatable = false

            if(r < 0.33){
                this.sprite_name = 'cultist2'
                this.y_frame_offset = 0
                this.max_frame = 10
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            }
            else if(r < 0.66){
                this.sprite_name = 'cultist2'
                this.y_frame_offset = 80
                this.max_frame = 9
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)

            }
            else{
                this.sprite_name = 'cultist2'
                this.y_frame_offset = 160
                this.max_frame = 8
                this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            }
        }
        else if(this.state === 'damaged'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 480
            this.max_frame = 1
            this.max_frame_tick = 1
        }
        else if(this.state === 'stunned'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 480
            this.max_frame = 2
            this.max_frame_tick = 2
        }
        else if(this.state === 'defend'){
            this.sprite_name = 'cultist3'
            this.y_frame_offset = 0
            this.max_frame = 5
            this.max_frame_tick = 2
            this.repeatable = false
        }
        else if(this.state === 'dying'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 240
            this.max_frame = 12
            this.max_frame_tick = Math.round( (1500 / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'dead'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 320
            this.max_frame = 1
            this.max_frame_tick = 1000000
            this.repeatable = false
        }
        else if(this.state === 'cast'){
            this.sprite_name = 'cultist1'
            this.y_frame_offset = 400
            this.max_frame = 10
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'shield hit'){
            this.sprite_name = 'cultist2'
            this.y_frame_offset = 240
            this.max_frame = 8
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'freezed'){
            this.sprite_name = 'cultist3'
            this.y_frame_offset = 80
            this.max_frame = 1
            this.max_frame_tick = 100000
        }
        else if(this.state === 'freezed_dying'){
            this.repeatable = false
            this.sprite_name = 'swordman3'
            this.y_frame_offset = 320
            this.max_frame = 9
            this.max_frame_tick = 2
        }
        else if(this.state === 'explode'){
            this.repeatable = false
            this.sprite_name = 'swordman3'
            this.y_frame_offset = 160
            this.max_frame = 6
            this.max_frame_tick = 3
        }
        else if(this.state === 'zaped'){
            this.sprite_name = 'cultist3'
            this.y_frame_offset = 160
            this.max_frame = 7
            this.max_frame_tick = 3
        }
        else if(this.state === 'start ghost'){
            this.sprite_name = 'cultist2'
            this.y_frame_offset = 320
            this.max_frame = 4
            this.max_frame_tick = Math.round( (this.action_time / this.max_frame) / 30)
            this.repeatable = false
        }
        else if(this.state === 'ghost'){
            this.sprite_name = 'cultist2'
            this.y_frame_offset = 400
            this.max_frame = 5
            this.max_frame_tick = 6
        }
    }
}