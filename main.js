// Needed containers
const projects = document.querySelector('.projects')
const friendList = document.querySelector('.friend-list')
const themeBtn = document.getElementById('theme-toggle')

const getData = async (link) => {
    const request = await fetch(link)
    const data = await request.json()
    return data
}

const repos = []
const friends = []

// Function to switch to dark/light mode
let storedTheme = localStorage.getItem('theme')
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)

themeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme')
    let target = 'light'

    if (currentTheme === 'light') target = 'dark'

    document.documentElement.setAttribute('data-theme', target)
    localStorage.setItem('theme', target);
})

// Render things
window.addEventListener('DOMContentLoaded', () => {
    getRepos()
    getTrending()
})

// Functions to render something
const getRepos = () => {
    getData('https://api.github.com/users/curvu/repos')
    .then(data => {
        for(var i = 0; i < data.length; i++) {
            if (data[i].has_pages == true && data[i].name !== 'admin-dashboard') {
                repos.push({
                    name: data[i].name,
                    code: data[i].html_url,
                    page: `https://curvu.github.io/${data[i].name}/`,
                    description: data[i].description
                })
            }
        }

        let element = ''
        repos.forEach(repo => {
            element = `
                <div class="project">
                    <p class="project-title">${repo.name.split('-').join(' ')}</p>
                    <p class="text">${repo.description}</p>
                    <div class="project-buttons">
                        <img class="project-button" src="./src/star.svg" alt="star">
                        <a target="_blank" href="${repo.page}">
                            <img class="project-button" src="./src/view.svg" alt="view">
                        </a>
                        <a target="_blank" href="${repo.code}">
                            <img class="project-button" src="./src/code.svg" alt="code">
                        </a>
                    </div>
                </div>
            `
            projects.innerHTML += element
        })
    })
}

const getTrending = () => {
    getData('https://api.github.com/users/curvu/followers')
    .then(data => {
        const num = data.length > 4 ? 4 : data.length
        for(var i = 0; i < num; i++) {
            friends.push({
                name: data[i].login,
                url: data[i].html_url,
                avatar: data[i].avatar_url
            })
        }
        
        let element = ''
        friends.forEach(friend => {
            element = `
                <li class="person">
                    <img src="${friend.avatar}" alt="pfp-person1" class="pic">
                    <a href="${friend.url}">@${friend.name}</a>
                    <p>Lorem ipsum dolor</p>
                </li>
            `
            friendList.innerHTML += element
        })
    })
}

// Search for specific project

const input = document.getElementById('search-bar-input')

input.oninput = (e) => {
    renderRepos(filterRepos(e.currentTarget.value))
}

const filterRepos = (value) => repos.filter((repo) => repo.name.toLowerCase().includes(value.toLowerCase()))

const renderRepos = (filtered) => {
    let element = ''
    projects.innerHTML = '' // Clean everything
    filtered.forEach(repo => {
        element = `
            <div class="project">
                <p class="project-title">${repo.name.split('-').join(' ')}</p>
                <p class="text">${repo.description}</p>
                <div class="project-buttons">
                    <img class="project-button" src="./src/star.svg" alt="star">
                    <a target="_blank" href="${repo.page}">
                        <img class="project-button" src="./src/view.svg" alt="view">
                    </a>
                    <a target="_blank" href="${repo.code}">
                        <img class="project-button" src="./src/code.svg" alt="code">
                    </a>
                </div>
            </div>
        `
        projects.innerHTML += element
    })
}