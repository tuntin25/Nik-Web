import * as THREE from "three"
import Experience from "../Experience.js"
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        
        this.actualRoom = this.room.scene
        
        this.lerp = {
            current: 0 ,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        //this.setAnimation();
        this.onMouseMove();
    }
    setModel(){
        this.actualRoom.children.forEach(child => {
            if(child.isMesh){
                child.castShadow = true;
                child.receiveShadow =  true;
            }
            if(child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    if(groupchild.isMesh){
                         //groupchild.castShadow = true;
                         //groupchild.receiveShadow = true;
                    }
                });
            }
            if(child.name === "Screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
        });

        // const width = 1;
        // const height = 1;
        // const intensity = 1;
        // const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );

        // rectLight.position.set( 0, 0, 0 );
        // this.actualRoom.add(rectLight)
        
        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
        
        this.actualRoom.rotation.y = Math.PI;
    }

    // setAnimation(){
        
    // }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=> {
            this.rotation = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
            this.lerp.target = this.rotation * 0.15;
        });
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }
}