document.addEventListener("DOMContentLoaded", function(event) {
  M.AutoInit()
  //general function calls
  getPosts()
})
////Main Card\\\\\
let cardRow = document.createElement('span')
cardRow.className = 'row cardRow'
cardRow.id = 'addtome1'
let cardCol = document.createElement('span')
cardCol.className = 'col s6 offset-s1 card mainCard'
let defaultCardTitle = document.createElement('h4')
defaultCardTitle.className = 'h4title'
defaultCardTitle.innerText = 'Welcome to'
let defaultCardImg = document.createElement('img')
defaultCardImg.className = 'defaultCardImg'
defaultCardImg.src = 'http://oi63.tinypic.com/zjjf2a.jpg'
cardCol.appendChild(defaultCardTitle)
cardCol.appendChild(defaultCardImg)
////////////get posts\\\\\\\\\\
function getPosts() {
  axios.get('https://food-seen.herokuapp.com/posts')
    .then((res) => {
      // handle success
      // console.log(res.data)
      res.data.forEach((posts) => {
        var tagPostId = posts.id
        ////////////set data into cards\\\\\\\\\\\\
        ///////////////GENERATE CARDS\\\\\\\\\\\\\\
        let card = document.createElement('div')
        card.className = 'card hoverable'
        let cardTitle = document.createElement('span')
        cardTitle.className = 'title'
        if (posts.promoted === true) {
          cardTitle.className = 'promoted'
        }

        let cardImage = document.createElement('div')
        cardImage.className = 'card-image'
        let imgSrc = document.createElement('img')
        let foodName = document.createElement('div')
        foodName.className = 'foodName'
        let startTime = document.createElement('span')
        startTime.className = 'times'
        let endTime = document.createElement('span')
        endTime.className = 'times'
        let location = document.createElement('div')
        location.className = 'location'
        let dateOnCard = document.createElement('div')
        dateOnCard.className = 'date'
        ///////DATE MANIPULATION\\\\\\\
        let date = new Date(posts.date)
        let newDate = date.toString().split(' ').slice(0, 3)
        let dayOfWeek = newDate[0].substr(0)
        // console.log(dayOfWeek)
        let month = newDate.slice(1, 2)
        // console.log(month)
        let numberDate = newDate.slice(2)
        // console.log(numberDate)
        ///////MINI CARDS\\\\\\
        let parentContainer = document.getElementById('parentContainer')
        let miniCardsColumn = document.getElementById('miniCards')
        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)
        cardRow.appendChild(cardCol)
        ////////APPEND INFO TO CARDS\\\\\\\\\\
        parentContainer.appendChild(cardRow)
        card.appendChild(cardTitle)
        card.appendChild(cardImage)
        card.appendChild(foodName)
        card.appendChild(dateOnCard)
        card.appendChild(startTime)
        card.appendChild(endTime)
        card.appendChild(location)
        cardImage.appendChild(imgSrc)
        ////tags for posts\\\\
        let tags = document.createElement('div')
        tags.innerHTML += "<br>"
        card.appendChild(tags)
        axios.get(`https://food-seen.herokuapp.com/tags_posts/${tagPostId}`)
          .then((res) => {
            let tagsArray = res.data
            tagsArray.forEach((post) => {
              let newTag = document.createElement('span')
              newTag.className = "cardTags"
              newTag.innerText = post.name
              tags.appendChild(newTag)
            })
            tags.style.display = "none"
          })
        ////FIELDS FOR CARDS\\\\
        if (posts.promoted === true) {
          cardTitle.innerText = `${posts.eventName} 👑`
        } else {
          cardTitle.innerText = posts.eventName
        }
        imgSrc.src = posts.imageUrl
        foodName.innerText = posts.foodName
        dateOnCard.innerText = dayOfWeek + ' ' + month + ', ' + numberDate
        startTime.innerText = 'Starts At: ' + posts.startTime.split('T')[1].split('.')[0].slice(0, -3)
        endTime.innerText = 'Ends At: ' + posts.endTime.split('T')[1].split('.')[0].slice(0, -3)
        location.innerText = posts.address + ', ' + posts.city + ', ' + posts.state + ', ' + posts.zipcode
        dateOnCard.style.display = 'none'
        startTime.style.display = 'none'
        endTime.style.display = 'none'
        location.style.display = 'none'
        tags.style.display = 'none'
        ///////SCROLLING EVENT FOR CARDS\\\\\\\
        function throttled(delay, fn) {
          let lastCall = 0;
          return function(...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
              return;
            }
            lastCall = now;
            return fn(...args);
          }
        }
        const myHandler = (ev) => {
          ev.preventDefault()
          let miniCardColNodes = miniCardsColumn.children
          /////SET OPACITY OF MINI CARDS\\\\\
          miniCardColNodes[1].setAttribute('style', 'opacity:1')
          miniCardColNodes[2].setAttribute('style', 'opacity:.8')
          miniCardColNodes[3].setAttribute('style', 'opacity:.5')
          miniCardColNodes[4].setAttribute('style', 'opacity:.3')

          /////IF DEFAULT CARD IS THERE, REMOVE\\\\\
          if (cardCol.childNodes[0].className === "h4title") {
            cardCol.removeChild(defaultCardImg)
            cardCol.removeChild(defaultCardTitle)
          }

          /////APPEND FIRST MINI CARD TO MAIN CARD WITH HIDDEN INFO\\\\\
          cardCol.appendChild(miniCardColNodes[0])
          cardCol.childNodes[0].children[3].setAttribute('style', 'display:inline')
          cardCol.childNodes[0].children[4].setAttribute('style', 'display:inline')
          cardCol.childNodes[0].children[5].setAttribute('style', 'display:inline')
          cardCol.childNodes[0].children[6].setAttribute('style', 'display:inline')
          /////APPEND REST OF MINI CARD TO MAIN CARD WITH HIDDEN INFO\\\\\
          if (cardCol.childNodes) {
            cardCol.childNodes[1].children[3].setAttribute('style', 'display:inline')
            cardCol.childNodes[1].children[4].setAttribute('style', 'display:inline')
            cardCol.childNodes[1].children[5].setAttribute('style', 'display:inline')
            cardCol.childNodes[1].children[6].setAttribute('style', 'display:inline')
          }
          /////APPEND MAIN CARD TO BOTTOM OF MINI STACK\\\\\
          while (cardCol.childNodes.length > 1) {
            miniCardsColumn.appendChild(cardCol.children[0])
          }

          ////REMOVE EXTRA INFO TO MINI CARDS\\\\
          for (let i = 0; i < miniCardColNodes.length; i++) {
            miniCardColNodes[i].childNodes[3].setAttribute('style', 'display:none')
            miniCardColNodes[i].childNodes[4].setAttribute('style', 'display:none')
            miniCardColNodes[i].childNodes[5].setAttribute('style', 'display:none')
            miniCardColNodes[i].childNodes[6].setAttribute('style', 'display:none')
          }
        }
        const tHandler = throttled(200, myHandler);
        card.addEventListener("wheel", tHandler);
      })
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    })
}

function getAllTags() {
  let tagsArray = []
  axios.get('/tags')
    .then((tags) => {
      tags.data.forEach((tag) => {
        tagsArray.push(tag)
      })
      console.log('tags:', tagsArray)
    })
}