
//See all ramen images in the div with the id of ramen-menu. When the page loads, request the data from the server to get all the ramen objects. Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

function displayImage(foodData) {
    console.log("this is it", foodData)
    let card = document.createElement('p')
    card.innerHTML = `<img src = ${foodData.image} class="menu-image">`
    document.querySelector("#ramen-menu").appendChild(card)  

    card.querySelector(".menu-image").addEventListener('click', () => {
     //   updateImage(foodData)  
        document.querySelector(".detail-image").src = `${foodData.image}`
        document.querySelector(".name").textContent = `${foodData.name}`
        document.querySelector(".restaurant").textContent = `${foodData.restaurant}`
        document.querySelector("#rating-display").textContent=`${foodData.rating}`
        document.querySelector("#comment-display").textContent=`${foodData.comment}`
        
    })
}
function getDataObj() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
   // .then(foodData => console.log(foodData))
    .then(foodData => foodData.forEach(foodData => displayImage(foodData)))
}
getDataObj()

let form=document.getElementById("new-ramen")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newRamenObj = {
        name: e.target["new-name"].value,
        restaurant: e.target["new-restaurant"].value,
        image: e.target["new-image"].value,
        rating: e.target["new-rating"].value,
        comment: e.target["new-comment"].value
    }
   addNewItem(newRamenObj)     
 })
    
function addNewItem(newRamenObj) {
    fetch('http://localhost:3000/ramens', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept":  "application/json"
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(res => res.json())
    .then(ramenData => displayImage(ramenData))    
}