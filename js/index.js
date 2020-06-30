const app = new Vue({
    el: "#app",
    data: {
        audios: [],
        playing: false,
        fakePointer: 20,
        myMusic: [],
        tocando: -1,
        tocandoE: null
    },
    methods: {
        putAudio(audio, indice){
            const object = {  
                "id": this.myMusic.length,
                "audio": audio,
                "indice": indice
            }
            if(this.myMusic.indexOf(object) == -1){
                this.myMusic.push(object)
                var total = 0;
                for(let i = 0; i < this.myMusic.length; i++){
                    if(this.myMusic[i].audio == object.audio && 
                        this.myMusic[i].indice == object.indice){
                        total++;
                        if(total == 2){
                            total = 0;
                            const id = this.myMusic.indexOf(this.myMusic[i])
                            this.myMusic.splice(id, 1)
                        }
                    }
                }
            }
            
        },
        removeAudio(audio, indice){
            const found = app.myMusic.find(e => e.audio == audio && e.indice == indice)
            if(found){
                const id = this.myMusic.indexOf(found)
                this.myMusic.splice(id, 1)
            }
        },
        playingNote(){
            for(let i = 0; i < this.fakePointer; i++){
                const found = app.myMusic.find(e => e.indice == this.tocando)
                const id = app.myMusic.indexOf(found)
                if(found){
                    if(this.myMusic[id].indice == i){
                        var audio = new Audio(`./audios/${found.audio}`);
                        audio.play();
                    }
                }
            }
        },
        pause(){
            this.playing = false
            clearInterval(this.tocandoE)
        },
        play(){
            if(!this.playing){
                this.playing = true
                clearInterval(this.tocandoE)
                this.tocandoE = setInterval(() => {
                    if(this.tocando < this.fakePointer){
                        this.tocando++
                        this.playingNote()
                    } else{
                        this.tocando = 0
                    }
                }, 300);
            } else{
                this.pause()
            }
        }
    }
})

function getAudios(){
    app.audios = []
    fetch('http://localhost:3000/audios')
    .then(res => res.json())
    .then(res => {
        app.audios = res
    });  
}

getAudios()