class Game {
    constructor() {
      this.phone = document.querySelector('.phone');
      this.startButton = document.querySelector('.start');
      this.init();
    }
  
    init() {
      this.startButton.addEventListener('click', () => {
        this.showWelcomeScreen();
      });
    }
  
    showWelcomeScreen() {
      this.phone.innerHTML = `
        <h1 class="bou">لعبة الخراء الملعونة</h1>
      `;
      this.phone.classList = "phone";
      this.phone.classList.add('phone-bg');
      document.querySelector(".audio").play();
  
      const nameInput = this.createInput("text", "ما هو اسمك ؟", "name");
      nameInput.addEventListener("change", () => this.handleNameChange(nameInput.value));
    }
  
    createInput(type, placeholder, className) {
      const input = document.createElement("input");
      input.type = type;
      input.placeholder = placeholder;
      input.classList.add(className);
      this.phone.appendChild(input);
      return input;
    }
  
    handleNameChange(name) {
      if (name.length > 0) {
        localStorage.setItem("name", name);
        this.showGameStartConfirmation();
      }
    }
  
    showGameStartConfirmation() {
      const userName = localStorage.getItem("name");
      this.phone.innerHTML = `
        <h1 class="bou">لعبة الخراء الملعونة</h1>
        <h2>مرحبا يا ${userName} هل تريد ان تلعب لعبة الخراء ؟</h2>
      `;
      this.phone.classList.add("bg2");
  
      const divx = document.createElement("div");
      divx.classList.add("fb");
  
      const trueFla = this.createButton("لا", "con");
      const falTrue = this.createButton("نعم", "con");
  
      divx.appendChild(falTrue);
      divx.appendChild(trueFla);
      this.phone.appendChild(divx);
  
      trueFla.addEventListener("click", () => this.endGame());
      falTrue.addEventListener("click", () => this.startGame());
    }
  
    createButton(text, className) {
      const button = document.createElement("button");
      button.innerHTML = text;
      button.classList.add(className);
      return button;
    }
  
    endGame() {
      this.phone.classList = "phone";
      this.phone.classList.add("die");
      const userName = localStorage.getItem("name");
      this.phone.innerHTML = `<h3>لا تستطيع الخروج الان يا ${userName} .. ستموت بعد دقيقة </h3>`;
      let count = 10;
  
      setTimeout(() => {
        const countdownInterval = setInterval(() => {
          this.phone.innerHTML = `<h1 class="count">${count--}</h1>`;
          if (count < 0) {
            clearInterval(countdownInterval);
            this.phone.innerHTML = `<h1 class="ca">لقد مات </h1>`;
            this.phone.classList.remove("bg2");
            this.phone.classList.add("bg3");
          }
        }, 1000);
      }, 1000);
    }
  
    startGame() {
      this.phone.classList = "phone";
      this.phone.classList.add('bg4');
      const userName = localStorage.getItem("name");
      this.phone.innerHTML = `<h3>لماذا انت خائف مني يا ${userName} ؟</h3>`;
      let next = document.createElement("button");
      next.classList.add('next');
      next.innerHTML = "متابعة";
      this.phone.appendChild(next);
    }
  }
  
  const game = new Game();
  