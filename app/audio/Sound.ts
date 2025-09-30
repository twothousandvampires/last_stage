import Track from "./Track"

export default class Sound{
    pool: any[]
    back: any
    lobby_back: any

    constructor(){
        this.pool = [new Track(), new Track(), new Track(),  new Track(), new Track()]

        this.back = new Audio()
        this.back.src = 'sounds/99_Cavern_of_Lost_Souls.mp3'
        this.back.volume = 0.2

        this.lobby_back = new Audio()
        this.lobby_back.src = 'sounds/ls_stage_lobby.mp3'
        this.lobby_back.volume = 0.15
    }

    static distance(x, y, x1, y1){
        return Math.round(Math.sqrt(((x - x1) ** 2) + ((y - y1) ** 2)))
    }

    updateData(server_data: any, player: any){
       
        server_data.sounds.sort((a, b) => Sound.distance(b.x, b.y, player.x, player.y) - Sound.distance(a.x, a.y, player.x, player.y))
        let sounds = server_data.sounds.slice(0, 3)
       
        sounds.forEach(elem => {
            let d = Sound.distance(elem.x, elem.y, player.x, player.y)
            this.setSound(elem.name, d)
        })  
    } 

    setSound(name: string, distance = 0){
        let track = this.pool[4]

        if(distance < track.distance){
            let info = this.getSrcByName(name)
            track.stop()
            track.setDistance(distance)
            track.setSrc(info.src)
            track.setVolume(info.max_volume)
            track.play()

            this.sortPool()
        }
    }

    getSrcByName(name: string){

        let result = {
            max_volume: 1,
            src: ''
        }

        if(name === 'lightning bolt'){
            let v = ['lning1.wav' ,'ltning.wav', 'storm.wav', 'cbolt.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.6
        }
        else if(name === 'demon roar'){
            let v = ['attack1.wav', 'attack3.wav', 'attack2.wav', 'biclopd2.wav']

            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.2
        }
        else if(name === 'impy'){
            result.src = 'impy.wav'
        }
        
        else if(name === 'shatter'){
            let v = ['shatter1.wav', 'coldimpact1.wav', 'coldimpact2.wav', 'coldimpact3.wav']

            result.src = v[Math.floor(Math.random() * v.length)]
        }

        else if(name === 'gold spending'){
            let v = ['gold.wav', 'gold1.wav']

            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.4
        }

        else if(name === 'upgrade'){
            let v = ['readbook.wav']

            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.4
        }

        else if(name === 'ambient'){
            let v = ['drip1.wav', 'drip2.wav', 'drip3.wav', 'drip4.wav', 'drip5.wav', 'drip6.wav', 'drip7.wav','drip8.wav', 'vtheft.wav', 'breath1.wav',
                'breath2.wav','breath3.wav', 'breath4.wav' , 'breath5.wav', 'breath6.wav', 'breath7.wav', 'breath8.wav', 'breath9.wav', 'scream1.wav', 'scream2.wav', 'bat1.wav', 'bat2.wav'
            ]
            
            result.max_volume = 0.7
            result.src = v[Math.floor(Math.random() * v.length)]
        }
        
        else if(name === 'frost nova'){
             let v = ['cold1.wav', 'cold2.wav', 'cold3.wav', 'cold4.wav']

            result.src = v[Math.floor(Math.random() * v.length)]
        }
        else if(name === 'sword hit'){
            let v = ['sword1.wav' ,'sword2.wav', 'sword3.wav', 'sword4.wav', 'sword5.wav', 'sword6.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.2
        }
        else if(name === 'metal hit'){
            let v = ['block arrow1.wav' ,'block arrow2.wav', 'block arrow3.wav', 'block blade1.wav', 'block blade4.wav', 'block blade5.wav', 'metalshield.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.2
        }
        else if(name === 'ward hit'){
            let v = ['emerge06.wav', 'emerge04.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.2
        }
        else if(name === 'fire explosion'){
            let v = ['explosionlarge2.wav' ,'explosionlarge4.wav', 'explosionlarge5.wav', 'explosionmed1.wav', 'explosionmed2.wav', 'explosionmed3.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.4
        }
        else if(name === 'fire cast'){
            let v = ['firecast.wav', 'firelaunch1.wav', 'firelaunch2.wav', 'die1.wav' , 'die4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'skullpile'){
            let v = ['skullpile1.wav', 'skullpile2.wav', 'skullpile3.wav', 'skullpile4.wav', 'skullpile5.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.25
        }
        else if(name === 'goo'){
            let v = ['goopile1.wav', 'goopile3.wav', 'goopile2.wav', 'acidd1.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.2
        }
     
       
        else if(name === 'cold cast'){
            let v = ['coldcast.wav', 'icebolt2.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'ground hit'){
            let v = ['blunt1.wav', 'blunt2.wav', 'blunt3.wav', 'blunt4.wav', 'blunt5.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'fire massive'){
            let v = ['diabloseal.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'lightning cast'){
            let v = ['eleccast.wav', 'LMag.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'cast'){
            let v = ['summon.wav', 'firecasta.wav', 'cloak.wav', 'cast8.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'holy cast'){
            let v = ['holybolt1.wav', 'holybolt2.wav', 'holybolt3.wav','handofgodbolt.wav', 'fmag.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'dark cast'){
            let v = ['cursecast.wav', 'revivecast.wav', 'cast3.wav', 'Cast10.wav', 'dark_cast.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'sword swing'){
            let v = ['bigswish1.wav', 'bigswish2.wav', 'bigswish3.wav', 'bigswish5.wav', 'bigswish4.wav', 'swing.wav', 'swing2.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.1
        }
        else if(name === 'enlight'){
            let v = ['magic.wav', 'Magic1.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]
            result.max_volume = 0.6
        }
        else if(name === 'corpse explode'){
            let v = ['corpse explode 1.wav', 'corpse explode 2.wav', 'corpse explode 3.wav', 'corpse explode 4.wav', 'corpse explode 5.wav', 'corpse explode 6.wav']
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.3
        }
        else if(name === 'menu button'){
            result.src = 'button.wav'

            result.max_volume = 1
        }

        else if(name === 'menu button 2'){
            result.src = 'pointdrop.wav'

            result.max_volume = 1
        }

        else if(name === 'menu item take'){
            result.src = 'belt.wav'

            result.max_volume = 0.3
        }

        else if(name === 'walk'){
            let v = ['walk1.wav', 'walk2.wav', 'walk3.wav', 'walk4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.6
        }

        else if(name === 'menu item drop'){
            result.src = 'glovesmetal.wav'

            result.max_volume = 0.3
        }

        else if(name === 'select_skill'){
            let v = ['metalshield.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.2
        }

        else if(name === 'donate'){
            let v = ['handofgod.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.7
        }
        
        else if(name === 'zap'){
            let v = ['zap1.wav', 'zap2.wav', 'zap3.wav', 'zap4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.2
        }

        else if(name === 'static'){
            let v = ['static1.wav', 'static2.wav', 'static3.wav', 'static4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.3
        }

        else if(name === 'hit bones'){
            let v = ['gethit1.wav', 'gethit2.wav', 'gethit3.wav', 'gethit4.wav', 'gethit5.wav', 'gethit6.wav', 'gethit7.wav', 'bsimpct.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.3
        }
        else if(name === 'door open'){
        
            result.src = 'dooropen.wav'

            result.max_volume = 0.7
        }
    
        else if(name === 'bones explode'){
            let v = ['death1.wav', 'death2.wav', 'death3.wav', 'death4.wav', 'death5.wav', 'golumded.wav', 'shatter.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.3
        }

        else if(name === 'heal'){
            let v = ['healing.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.12
        }


        else if(name === 'potion'){
            let v = ['invpot.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.4
        }
       
        else if(name === 'short sword swing'){
            let v = ['defiles1.wav', 'defiles2.wav', 'swing.wav', 'swing2.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.2
        }

        else if(name === 'not deserving'){
            result.src = 'not_deserving.wav'

            result.max_volume = 0.6
        }

        else if(name === 'specter attack'){
            let v = ['s_attack1.wav', 's_attack2.wav', 's_attack3.wav', 's_attack4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.6
        }

        else if(name === 'blow'){
            let v = ['blow1.wav', 'blow2.wav', 'blow3.wav', 'blow4.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.2
        }

        else if(name === 'get hit'){
            let v = ['soft1.wav', 'soft3.wav', 'soft5.wav' , 'lghit.wav', 'lghit1.wav', 'bhit.wav', 'bhit1.wav', 'sword1.wav' ,'sword2.wav', 'sword3.wav', 'sword4.wav', 'sword5.wav', 'sword6.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.2
        }

        else if(name === 'evel upgrade'){
            let v = ['poison.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 1
        }

        else if(name === 'blood'){
            let v = ['blodstar.wav']
         
            result.src = v[Math.floor(Math.random() * v.length)]

            result.max_volume = 0.6
        }
       
        return result
  
    }

    sortPool(){
        this.pool.sort((a, b) => a.distance - b.distance)
    }
}