/////////COOKIE FUNCTIONS!!!!\\\\\\\\\

let myCookie = document.cookie
// console.log('cookie: ', myCookie)
let signInBtn = document.getElementById('signInBtn')
let createBtn = document.getElementById('createBtn')
let seeMyPostsBtn = document.getElementById('seeMyPostsBtn')

if (myCookie == '') {
  signInBtn.setAttribute("style", "display:inline");
  createBtn.setAttribute("style", "display:none");
  seeMyPostsBtn.setAttribute("style", "display:none");
} else {
  createBtn.setAttribute("style", "display:inline");
  seeMyPostsBtn.setAttribute("style", "display:inline");
  signInBtn.setAttribute("style", "display:none");
}
