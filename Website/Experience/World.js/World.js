import * as THREE from "three"
import Experience from "../Experience.js";

import Room from "./Room.js";
<<<<<<< HEAD
<<<<<<< HEAD
import Environment from "./Environment.js";
export default class World extends EventEmitter{
=======
export default class World{
>>>>>>> parent of 736e28b (Export Blinder World and import to website)
=======
export default class World{
>>>>>>> parent of 736e28b (Export Blinder World and import to website)
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

<<<<<<< HEAD
<<<<<<< HEAD
        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            console.log("Room created")
            //this.emit("created room");
        });
=======
        this.room = new Room();
>>>>>>> parent of 736e28b (Export Blinder World and import to website)
=======
        this.room = new Room();
>>>>>>> parent of 736e28b (Export Blinder World and import to website)
    }

    resize(){

    }

    update(){

    }
}