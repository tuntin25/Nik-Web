import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    //this.setAnimation();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          if (groupchild.isMesh) {
            groupchild.castShadow = true;
            groupchild.receiveShadow = true;
          }
        });
      }

      if (child.name === "Computer") {
        //console.log(child.name)
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "Mini_Floor") {
        child.position.x = -0.914985;
        child.position.y = -0.02;
        child.position.z = 5.9;
      }
      // if (child.name ==="Lamp1" || child.name ==="Lamp2"|| child.name ==="Lamp3" || child.name ==="Lamp4" || child.name ==="Black_Chair" || child.name ==="White_Chair" || child.name ==="Chess_Table" || child.name ==="ChessBoard" || child.name ==="Chess_Box" || child.name ==="Mini_mat"){
      //     //console.log(child.name)
      //     child.scale.set(0,0,0);
      // }

      child.scale.set(0, 0, 0);
      if (child.name === "Cube040") {
        child.scale.set(1, 1, 1);
        child.position.set(0, -2, 0);
        child.rotation.y = Math.PI / 4;
      }
      this.roomChildren[child.name.toLowerCase()] = child;
      //console.log(child.name.toLowerCase());
    });
    const width = 0.2;
    const height = 0.2;
    const intensity = 15;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(-15.8, 5, 0);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);

    this.roomChildren["rectLight"] = rectLight;

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  // setAnimation(){

  // }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.05;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
