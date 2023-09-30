import { LightningElement } from 'lwc';

export default class StopWatch extends LightningElement {

    timer =0
    timerRef
    
    actionHandler(event){
        const {label} = event.target
        if(label === 'Start'){
            this.setTimer()
        }
        if(label === 'Stop'){
            window.clearInterval(this.timerRef)
            window.localStorage.removeItem('startTimer')
        }
        if(label === 'Reset'){
            this.timer='0'
            window.clearInterval(this.timerRef)
            window.localStorage.removeItem('startTimer')
        }
        
    }
    
    StartTimerHandler(){
        const startTime = new Date()
        window.localStorage.setItem('startTimer', startTime)
        return startTime
    }
    setTimer(){
        const startTime = new Date( window.localStorage.getItem("startTimer") || this.StartTimerHandler())
        this.timerRef = window.setInterval(()=>{
            const secsDiff = new Date().getTime() - startTime.getTime()
            this.timer = this.secondToHms(Math.floor(secsDiff/1000))
        }, 1000)
    }

    secondToHms(d){
        d = Number(d)
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);
        const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    connectedCallback(){
        if(window.localStorage.getItem("startTimer")){
            this.setTimer()
        }
    }
}