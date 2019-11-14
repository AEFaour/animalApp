import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animals = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  constructor(private toastCtrl: ToastController) { }
  /*async presentToast(){
    const toast = await this.toastCtrl.create({
      message:"",
      duration : 2000
    })
  }*/

  private media = null;
  private currentAnimalIndex: number = null;
  reorderDisabled: boolean = true; 
  

  playSound() {
    if(this.currentAnimalIndex == null){
      this.currentAnimalIndex = Math.floor(Math.random() * this.animals.length);
    }
    
    let animal = this.animals[this.currentAnimalIndex];

    
    console.log(animal);

    this.media = new Audio('/assets' + animal.file);
    this.media.load();
    this.media.play();
  }
  guessAnimal(pos) {
    let message = "";
    if (this.currentAnimalIndex == null) {
      message = "Il faut d'abord jouer avant de choisir un animal";

    } else if (this.currentAnimalIndex == pos) {
      let animal = this.animals[pos];
      message = `Bien joué c'est bien le jouer ${animal.title} qui ${animal.desc}`;
      this.currentAnimalIndex = null;
      this.media = null;
    } else {
      message = "ce n'est pas ça, essaie encore";
    }
    console.log(message);
    this.showToast(message)
  }

  private async showToast(text) {
    /*const toast = await */this.toastCtrl.create({
    header: 'Message : ',
    message: text,
    duration: 2000,
    position: 'top'
  }).then((toast) => { toast.present() })
    /*toast.present();*/
  }
  reorderAnimal(even){
    let animal = this.animals[even.detail.from];
    this.animals.splice(even.detail.from, 1);
    this.animals.splice(even.detail.to, 0, animal);

    even.detail.complete();
  }
}
