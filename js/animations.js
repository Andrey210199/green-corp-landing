const   INCREASE_NUMBER_ANIMATION_SPEED = 50;

function increaseNumberAnimationStep(i,element, endNumber){
    if(i<=endNumber)
    {
    if(i===endNumber)
    {
        element.innerText = i + "+";
    }
    else
    {
        element.innerText = i;
    }
    i+=100;
    setTimeout(increaseNumberAnimationStep,INCREASE_NUMBER_ANIMATION_SPEED,i,element,endNumber);
    }
}

function initIncreaseNumberAnimation(){
    let elements = document.querySelector(".features__clients-count"); 
    increaseNumberAnimationStep(0,elements, 5000);
}

//Другой бюджет
document.querySelector("#buget").addEventListener("change", 
function handleSelecteChange(event){
    let otherInput = document.querySelector(".form__other-input");
  if(event.target.value === "other")
  {
    let formConteiner =document.createElement("div");
    formConteiner.classList.add("form__group", "form__other-input");
    let input =document.createElement("input");
    input.setAttribute("placeholder", "Введите ваш вариант");
    input.setAttribute("type", "text");
    formConteiner.appendChild(input);
    event.target.parentNode.after(formConteiner);
  }
  else if(Boolean(otherInput))
  {
    otherInput.remove();
  }
});

function updateScroll(){
  //Изменение header при скролле
  let scroll =window.scrollY;
  let header = document.querySelector("header");
  if(scroll >0){
    header.classList.add("header__scrolled");
  }
  else{
    header.classList.remove("header__scrolled");
  }

  //Запуск анимации с цифрами
  let countElementPosition = document.querySelector(".features__clients-count").offsetTop;
  let windowBottomPosition = scroll - window.innerHeight;

  if(windowBottomPosition <= countElementPosition && !animationInited)
  {
    initIncreaseNumberAnimation();
    animationInited =true;
  }

}

//Плавный скролл
function addSmoothSkroll(link){
 link.addEventListener("click", function onLinkClick(event){
  event.preventDefault();
  document.querySelector(this.getAttribute("href")).scrollIntoView({
    behavior: "smooth"
  });

});
}

let animationInited = false;
window.addEventListener("scroll", updateScroll);

document.querySelectorAll("a[href^='#']").forEach(elem=> addSmoothSkroll(elem));
document.querySelectorAll("button[href^='#']").forEach(elem=> addSmoothSkroll(elem));