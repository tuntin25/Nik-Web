import * as THREE from "three"
import Experience from "../Experience.js";

import { EventEmitter } from "events";

import Room from "./Room.js";
import Environment from "./Environment.js";
export default class World extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
            console.log("Room created")
            //this.emit("created room");
        });
    }

    resize(){

    }

    update(){

    }
}