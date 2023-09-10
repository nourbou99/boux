let phone = document.querySelector('.phone');
let start = document.querySelector('.start');

start.addEventListener('click', () => {
    phone.innerHTML = '';
    phone.innerHTML =` <h1 class="bou">لعبة الخراء الملعونة</h1>`
    document.querySelector(".audio").play()
    let name = document.createElement("input");
    name.type = "text";
    name.placeholder = "ما هو اسمك ؟";

    name.classList.add("name");
    phone.appendChild(name);
    
    name.addEventListener("change", () => {
        if(name.value.length > 0){
            localStorage.setItem("name", name.value); // Use setItem() to store the name in localStorage

            let nextBtn = document.createElement("button");
            nextBtn.innerHTML = "متابعة";
            nextBtn.classList.add("next");
            phone.appendChild(nextBtn);
            nextBtn.addEventListener("click", () => {
                phone.innerHTML = '';
                phone.innerHTML =` <h1 class="bou">لعبة الخراء الملعونة</h1>`
                let UserName = localStorage.getItem("name")
                let title= document.createElement("h2")
                title.innerHTML = `مرحبا يا ${UserName} هل تريد ان تلعب لعبة الخراء ؟`;
                phone.appendChild(title);
                phone.classList.add("bg2")
                let divx = document.createElement("div");
                let trueFla= document.createElement("button")
                trueFla.classList.add("con");
                trueFla.innerHTML="لا"
                let falTrue= document.createElement("button")
                falTrue.innerHTML="نعم"
                falTrue.classList.add("con");
                divx.classList.add("fb")
                divx.appendChild(falTrue);
                divx.appendChild(trueFla)
                phone.appendChild(divx)
                trueFla.addEventListener("click", () => {
                    phone.innerHTML = "";
                    phone.innerHTML = `<h3>لا تستطيع الخروج الان يا ${localStorage.getItem("name")} .. ستموت بعد دقيقة </h3>`;
                    let count = 60;
                  
                   setTimeout(() => {
                    const countdownInterval = setInterval(() => {
                        phone.innerHTML = `<h1 class="count">${count--}</h1>`;
                        if (count < 0) {
                          clearInterval(countdownInterval); // Stop the countdown when it reaches 0
                          phone.innerHTML = `<h1 class="ca">لقد مات </h1>`; // Clear the content
                            phone.classList.remove("bg2")
                            phone.classList.add("bg3");
                        }
                      }, 1000);
                   },1000)
                  });
                  
            }); 
        }
    })
});
