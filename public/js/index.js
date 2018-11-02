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
cardCol.className = 'col s6 pull-s1 card mainCard'
let defaultCardTitle = document.createElement('h4')
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
        let secondMiniCardsColumn = document.getElementById('miniCards2')
        let thirdMiniCardsColumn = document.getElementById('miniCards3')

        cardRow.appendChild(thirdMiniCardsColumn)
        cardRow.appendChild(secondMiniCardsColumn)
        cardRow.appendChild(miniCardsColumn)
        miniCardsColumn.appendChild(card)
        cardRow.appendChild(cardCol)

        ////////SET CARDS TO LEFT MINIATURE COLUMN\\\\\\\\
        if (miniCardsColumn.childNodes.length > 4) {
          secondMiniCardsColumn.appendChild(miniCardsColumn.childNodes[4])
        }

        if (secondMiniCardsColumn.childNodes.length > 4) {
          thirdMiniCardsColumn.appendChild(secondMiniCardsColumn.childNodes[4])
        }
        if (thirdMiniCardsColumn.childNodes.length > 4) {
          miniCardsColumn.appendChild(thirdMiniCardsColumn.childNodes[4])
        }

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
        tags.style.display = "none"

        card.addEventListener('click', (ev) => {
          if (ev && ev.target.className === "card hoverable") {
            ////SET TARGET INFO TO MAIN CARD\\\\
            cardCol.innerHTML = ev.target.innerHTML

            // console.log(cardCol.childNodes)
            let cardElements = cardCol.childNodes
            cardElements.forEach(ele => {
              ele.setAttribute('style', 'display:inline')
            })
          } else {
            if (ev.target.parentNode.className !== "card-image") {
              cardCol.innerHTML = ev.target.parentNode.innerHTML
              // console.log(cardCol.childNodes)
              let cardElements = cardCol.childNodes
              cardElements.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            } else {
              cardCol.innerHTML = ev.target.parentNode.parentNode.innerHTML
              let cardElements = cardCol.childNodes
              cardElements.forEach(ele => {
                ele.setAttribute('style', 'display:inline')
              })
            }
          }
        })
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