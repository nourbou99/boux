class Game {
    constructor() {
      this.phone = document.querySelector('.phone');
      this.startButton = document.querySelector('.start');
      this.init();
    }
  
    init() {
      this.startButton.addEventListener('click', () => this.showWelcomeScreen());
    }
  
    showWelcomeScreen() {
      this.phone.innerHTML = `
        <h1 class="bou">لعبة الخراء الملعونة</h1>
      `;
      this.phone.className = "phone phone-bg";
      // Assuming you have an HTML audio element with class "audio"
      const audio = document.querySelector(".audio");
      if (audio) {
        audio.play();
      }
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
      this.phone.appendChild(this.createConfirmationButtons());
    }
  
    createConfirmationButtons() {
      const divx = document.createElement("div");
      divx.classList.add("fb");
      const trueFla = this.createButton("لا", "con");
      const falTrue = this.createButton("نعم", "con");
      divx.appendChild(falTrue);
      divx.appendChild(trueFla);
      trueFla.addEventListener("click", () => this.endGame());
      falTrue.addEventListener("click", () => this.startGame());
      return divx;
    }
  
    createButton(text, className) {
      const button = document.createElement("button");
      button.innerHTML = text;
      button.classList.add(className);
      return button;
    }
  
    endGame() {
      this.phone.classList.remove("bg2");
      this.phone.classList.add("die");
      const userName = localStorage.getItem("name");
      this.phone.innerHTML = `<h3>لا تستطيع الخروج الان يا ${userName} .. ستموت بعد دقيقة </h3>`;
      this.startCountdown();
    }
  
    startCountdown() {
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
      this.phone.classList.remove("bg3");
      this.phone.classList.add("bg4");
      const userName = localStorage.getItem("name");
      this.phone.innerHTML = `<h3>لماذا انت خائف مني يا ${userName} ؟</h3>`;
      this.showNextStep("هل خريت اليوم ؟", ["نعم", "لا"], (option) => {
        if (option == "لا") {
            this.phone.classList.remove("bg4");
            this.phone.classList.add("kok")
            this.showNextStep("عندما تذهب لكي تخرا ستجدني انتضرك هناك ", ["حسنا"], () => {
                this.phone.classList.remove("kok");
                this.phone.classList.add("crep")
                this.showNextStep("هل تريد ان تموت اليوم ؟", ["نعم","لا"], (option) => {
                    if(option == "لا"){
                        this.phone.classList.remove("crep");
                        this.phone.classList.add("koc")
                        this.showNextStep("لكي لا اقتلك اليوم يجب عليك تنفيذ ما اقوله لك", ["حسنا"], () => {
                            this.phone.classList.remove("koc");
                        this.phone.classList.add("q")
                            this.showNextStep("اذهب عند اسلام و قل له يا اخي انا اريد ان اصبح خادمك", ["حسنا"], () => {
                                
                            });
                        });
                    }
                    else{
                        this.phone.classList.remove("kok");
                        this.phone.classList.add("crep")
                        this.showNextStep("سأقتلك في المساء منتصف الليل سأنحر لك عنقك", ["حسنا"], () => {
                            this.phone.classList.remove("crep");
                        this.phone.classList.add("koc")
                            this.showNextStep("سأقطع لك رأسك و اطرافك و اكلها", ["حسنا"], () => {
                                this.phone.classList.remove("koc");
                        this.phone.classList.add("q")
                                this.showNextStep(" سأشرب لك دمك في جمجمة رأسك ايها الكلب ", ["حسنا"], () => {
                           
                                });
                            });
                        });
                    }
                });
              });
        }else{
            this.showNextStep("هل شعرت بي هناك في المرحاض عندما خريت ؟", ["نعم","لا"], () => {
                if (option == "لا") {
                    this.showNextStep("في المرة القادمة التي ستدخل فيها المرحاض ردد اسم جعفر و سأضهر لك", ["حسنا"], () => {
                       
                      });
                }else{
                    this.showNextStep("هل تخاف من السكين ؟", ["نعم","لا"], () => {
                       
                    });
                }
            });
        }
      });
    }
  
    showNextStep(question, options, callback) {
      this.phone.classList.remove("bg2");
      this.phone.classList.add("kok");
      this.phone.innerHTML = '';
      let elem = document.createElement("h2");
      elem.innerHTML = question;
      this.phone.appendChild(elem);
  
      const divx = document.createElement("div");
      divx.classList.add("fb");
  
      options.forEach(option => {
        const btn = this.createButton(option, "next");
        btn.addEventListener("click", () => callback(option));
        divx.appendChild(btn);
      });
  
      this.phone.appendChild(divx);
    }
  }
  
  const game = new Game();
  