import * as THREE from "three"
import Experience from "../Experience.js"

import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst
        this.circleSecond = this.experience.world.floor.circleSecond
        this.circleThird = this.experience.world.floor.circleThird
        GSAP.registerPlugin(ScrollTrigger);

        //this.setPath();
        this.setSmoothScroll();
        this.setScrollTrigger();
    }
    setupASScroll() {
        const asscroll = new ASScroll({
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }
    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": ()=> {
                console.log("Desktop")
                this.room.scale.set(0.11,0.11,0.11)
                this.camera.orthographicCamera.position.set(0, 6.5, 10);
                this.room.position.set(0, 0, 0);
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
                    y:1,
                    x:-12,
                });
            },

            // Mobile
            "(max-width: 968px)": () => {
                // console.log("fired mobile");

                // Resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.4;
                this.camera.orthographicCamera.position.set(0, 6.5, 10);

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
                    .to(
                        this.room.scale,
                        {
                            x: 0.25,
                            y: 0.25,
                            z: 0.25,
                        },
                        "same"
                    )
                    .to(
                        this.rectLight,
                        {
                            width: 0.3 * 3.4,
                            height: 0.4 * 3.4,
                        },
                        "same"
                    )
                    .to(
                        this.room.position,
                        {
                            x: 1.5,
                        },
                        "same"
                    );

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.position, {
                    z: -4.5,
                });
            },

            all: ()=> {
                //Mini Platform Animation
                //console.log(this.room.children)
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
                //Circle Animation
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
                }).to(this.circleFirst.scale,{
                    x:3,
                    y:3,
                    z:3,
                    },
                    "same"
                ).to(
                    this.room.position,
                    {
                        y: 0,
                    },
                    "same"
                )

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
                }).to(this.circleSecond.scale,{
                    x:3,
                    y:3,
                    z:3,
                    },
                    "same"
                ).to(
                    this.room.position,
                    {
                        y: 0.2,
                    },
                    "same"
                )

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
                }).to(this.circleThird.scale,{
                    x:3,
                    y:3,
                    z:3,
                    },
                    "same"
                ).to(
                    this.room.position,
                    {
                        y: 0,
                    },
                    "same"
                )

                //Mini Platform
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });

                this.room.children.forEach(child => {
                    if(child.name ==="Mini_Floor"){
                        this.first = GSAP.to(child.position,{
                            x: -13.3513,
                            z: 18.0093 ,
                            duration :1,
                        });
                    }
                    if(child.name ==="Lamp1"){
                        this.second = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Lamp2"){
                        this.third = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Lamp3"){
                        this.forth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Lamp4"){
                        this.fifth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Mini_mat"){
                        this.eleventh = GSAP.to(child.scale,{
                            x: 9.5,
                            z: 9.5,
                            y: 9.5,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="White_Chair"){
                        this.sixth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Black_Chair"){
                        this.seventh = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Chess_Table"){
                        this.eighth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="ChessBoard"){
                        this.ninth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                    if(child.name ==="Chess_Box"){
                        this.tenth = GSAP.to(child.scale,{
                            x: 1,
                            z: 1,
                            y: 1,
                            ease: "back.out(2)",
                            duration :1,
                        });
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second, "-=0.2");
                this.secondPartTimeline.add(this.third, "-=0.2");
                this.secondPartTimeline.add(this.forth, "-=0.2");
                this.secondPartTimeline.add(this.fifth, "-=0.2");
                this.secondPartTimeline.add(this.eleventh, "-=0.2");
                this.secondPartTimeline.add(this.sixth, "-=0.2");
                this.secondPartTimeline.add(this.seventh, "-=0.2");
                this.secondPartTimeline.add(this.eighth, "-=0.2");
                this.secondPartTimeline.add(this.ninth, "-=0.2");
                this.secondPartTimeline.add(this.tenth, "-=0.2");
            
            },
          }); 
    }
    resize(){
    }

    update(){
    }
}