import * as THREE from "three"
import Experience from "../Experience.js"
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.resources = this.experience.resources;
        
        //this.gui = new GUI({container: document.querySelector(".hero-main")});
        this.obj = {
            colorObj:{r:0,g:0,b:0},
            intensity: 3,
        }

        
        this.setSunlight();
        //this.setGUI();
    }
    setGUI(){
        this.gui.addColor(this.obj,"colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
        });
        this.gui.add(this.obj,"intensity",0,10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity
            this.sunLight.ambientLight = this.obj.intensity
        })
    }
    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff",3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.5;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.sunLight.position.set(0,6,3);
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight("#ffffff",1)
        this.scene.add(this.ambientLight)
    }
    switchTheme(theme){
        console.log(this.sunLight)
        if(theme === "dark"){
            // console.log(theme)
            // GSAP.to(this.sunLight.color,{
            //     r:108 / 255,
            //     g:83 / 255,
            //     b:178 / 255,
            // });
            // GSAP.to(this.ambientLight.color,{
            //     r:108 / 255,
            //     g:83 / 255,
            //     b:178 / 255,
            // });
            //console.log(theme)
            GSAP.to(this.sunLight.color,{
                r:52  / 255,
                g:36 / 255,
                b:174 / 255,
            });
            GSAP.to(this.ambientLight.color,{
                r:52  / 255,
                g:36 / 255,
                b:174 / 255,
            });
            GSAP.to(this.sunLight,{
                intensity: 3,
            });

            GSAP.to(this.ambientLight,{
                intensity: 3,
            });
        }else{
            console.log(theme)
            GSAP.to(this.sunLight.color,{
                r:255 / 255,
                g:255 / 255,
                b:255 / 255,
            });
            GSAP.to(this.ambientLight.color,{
                r:255 / 255,
                g:255 / 255,
                b:255 / 255,
            });
        }
    }

    resize(){

    }

    update(){

    }
}