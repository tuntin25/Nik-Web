import * as THREE from "three"
import Experience from "../Experience.js"

import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        GSAP.registerPlugin(ScrollTrigger);

        //this.setPath();
        this.setScrollTrigger();
    }

    // setPath(){
    //     console.log(this.room)
    //     this.timeline = new GSAP.timeline();
    //     this.timeline.to(this.room.position,{
    //         x:()=>{
    //             return this.sizes.width * 0.00125},
    //         scrollTrigger:{
    //             trigger: ".first-move",
    //             markers:false,
    //             start:"top top",
    //             end: "bottom bottom",
    //             scrub: 0.6,
    //             invalidateOnRefresh: true,
    //         }
    //     });
        
    // }
    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": ()=> {
                console.log("Desktop")

                //First section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers:false,
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position,{
                    x:()=>{
                        return this.sizes.width * 0.00125},
                    });

                    //Second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        markers:false,
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position,{
                     x:()=>{
                         return -5.8

                     },
                    z:()=>{
                        return this.sizes.height * 0.0032;
                    },
                }, "same"
                );
                this.secondMoveTimeline.to(this.room.scale,{
                    x:0.3,
                    y:0.3,
                    z:0.3,
                }, "same"
                );

                //Third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        markers:false,
                        start:"top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.orthographicCamera.position,{
                    y:-2,
                    x:-12,
                });
            },

            //Mobile
            "(max-width: 968px)": ()=> {
                console.log("Mobile")
            },

            "all": function() {
            },
              
          }); 
    }
    resize(){
    }

    update(){
    }
}