// Sélectionne tous les éléments à animer
const animatedElements = document.querySelectorAll(
  '.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .fade-in-down'
);

// Crée un observateur qui déclenche l’animation quand l’élément est visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show'); 
      } else {
        // Quand on quitte la zone visible, on retire la classe pour rejouer l’animation
        entry.target.classList.remove('show');
      }
    });
  },
  {
    threshold: 0.2, // 20 % de l’élément visible avant de déclencher
  }
);

// Observe chaque élément
animatedElements.forEach((el) => observer.observe(el));


let carsImg =document.querySelector(".img-cars");
let images =['../Assets/Voiture/voiture1.png','../Assets/Voiture/voiture19.jpg','../Assets/Voiture/voiture22.jpg','../Assets/Voiture/voiture21.jpg','../Assets/Voiture/voiture6.jpg']
let index=0;
const changeImage = ()=>
{
  index=(index+1)%images.length;
  carsImg.src=images[index];
}
setInterval(() => {
  changeImage();
  
}, 5000);