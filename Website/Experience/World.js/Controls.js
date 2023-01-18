import * as THREE from "three"
import Experience from "../Experience.js"

import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();

    }

    setPath(){
        
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position,{
            x:2,
            ScrollTrigger:{
                trigger: ".first-move"
            }
        });
        
    }
    resize(){
    }

    update(){
    }
}