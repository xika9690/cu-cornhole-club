// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

'use strict';
class DisclosureButton {
  constructor(buttonNode) {
    this.buttonNode = buttonNode;
    this.controlledNode = false;

    var id = this.buttonNode.getAttribute('aria-controls');

    if (id) {
      this.controlledNode = document.getElementById(id);
    }

    this.buttonNode.setAttribute('aria-expanded', 'false');
    this.hideContent();

    this.buttonNode.addEventListener('click', this.onClick.bind(this));
    this.buttonNode.addEventListener('focus', this.onFocus.bind(this));
    this.buttonNode.addEventListener('blur', this.onBlur.bind(this));
  }
  showContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'block';
    }
  }
  hideContent() {
    if (this.controlledNode) {
      this.controlledNode.style.display = 'none';
    }
  }
  toggleExpand() {
    if (this.buttonNode.getAttribute('aria-expanded') === 'true') {
      this.buttonNode.setAttribute('aria-expanded', 'false');
      this.hideContent();
    } else {
      this.buttonNode.setAttribute('aria-expanded', 'true');
      this.showContent();
    }
  }

  /* EVENT HANDLERS */
  onClick() {
    this.toggleExpand();
  }
  onFocus() {
    this.buttonNode.classList.add('focus');
  }
  onBlur() {
    this.buttonNode.classList.remove('focus');
  }
}

/* Initialize Hide/Show Buttons */
window.addEventListener(
  'load',
  function () {
    var buttons = document.querySelectorAll(
      'button[aria-expanded][aria-controls]'
    );

    for (var i = 0; i < buttons.length; i++) {
      new DisclosureButton(buttons[i]);
    }
  },
  false
);

// Function to increase image size
function enlargeImg(id) {
  // Set image size to 1.5 times original
  var div = document.getElementById(id).parentElement;;

  div.style.zIndex = "1";
  var img = document.getElementById(id)
  img.style.transform = "scale(1.5)";
  img.style.transition = "transform 0.25s ease";
  
}
// Function to reset image size
function resetImg(id) {
  // Set image size to original
  var div = document.getElementById(id).parentElement;;
  div.style.zIndex = "0";

  var img = document.getElementById(id);
  img.style.transform = "scale(1)";
  img.style.transition = "transform 0.25s ease";
  
}
// Get Picture to Full Screen
function fullScreen(id) {

  var img = document.getElementById(id);
  img.requestFullscreen()
}

function genScreen(){
  //Change this for more photos
  var len = 16;
  var imgarr = [];
  for (var i = 1; i<=len; i++){
    imgarr.push(i.toString());
  }

  console.log(imgarr);

  var content = "";
  var start = 1;
  var last = 4 - len % 4
  if (last == 4) {
    last = 0;
  }
  var runlen = len + last;
  for (var i = 0; i < runlen; i++) {
    if (((i % 4) == 0) && start == 1) {
      content +=`<div class="row">
      <div class="column">
        <img src= "img/photo` + imgarr[i] + `.jpg"
        
        id="photo` + imgarr[i] + `"
        position: relative;
        onmouseenter="enlargeImg(id)"
        onmouseleave="resetImg(id)"
        onclick="fullScreen(id)" 
        style="width:100%">
      </div>`
      start = 0;
    }
    else if ((i % 4) == 0) {
      content +=`</div>
      <div class="row">
      <div class="column">
        <img src= "img/photo` + imgarr[i] + `.jpg"
        
        id="photo` + imgarr[i] + `"
        position: relative;
        onmouseenter="enlargeImg(id)"
        onmouseleave="resetImg(id)"
        onclick="fullScreen(id)" 
        style="width:100%">
      </div>`
    }
    else if (i >= len) {
      content +=`<div class="column"
        style="width:100%">
      </div>`
    }
    else {
      content +=`<div class="column">
        <img src= "img/photo` + imgarr[i] + `.jpg"

        id="photo` + imgarr[i] + `"
        position: relative;
        onmouseenter="enlargeImg(id)"
        onmouseleave="resetImg(id)"
        onclick="fullScreen(id)" 
        style="width:100%">
      </div>`
    }
  }  
  content += `</div>`
  return content;
}
document.getElementById("Gallary").innerHTML=genScreen();

