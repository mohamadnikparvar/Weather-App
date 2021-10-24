// api.openweathermap.org/data/2.5/weather?q=tehran&appid=aa7aa39618f14a1110f168e872496797&units=metric
// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

const form = document.querySelector("form")
const input = document.querySelector("input")
const msg = document.querySelector(".msg")
const list = document.querySelector(".cities")

const apiKey = "aa7aa39618f14a1110f168e872496797"

form.addEventListener("submit",e => {
    e.preventDefault()
    let inputVal = input.value
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)
         .then(response => response.json())
         .then(data =>{
             const{main,name,sys,weather}=data
             const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
             const li = document.createElement("li")
             li.classList.add("city")
             const markup =`
             <h2 class='city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src='${icon}' alt ='city' >
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure>
             `
             li.innerHTML = markup
             list.appendChild(li)
             msg.innerText = ""
         })
         .catch(()=>{
             msg.innerText = "Search for a valid city"
         })
    input.value = ""
})

