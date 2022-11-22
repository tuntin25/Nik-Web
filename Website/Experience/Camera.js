import Experience from"./Experience.js"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scence;
        this.canvas = this.experience.canvas;
        console.log("Hello World")
        console.log(this.experience)
        console.log(this.sizes)
        console.log(this.scence)
        console.log(this.canvas)
    }
}