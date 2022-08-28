const projects = document.querySelector('.projects')
const friendList = document.querySelector('.friend-list')

const repos = []
const friends = []

const getData = async (link) => {
    const request = await fetch(link)
    const data = await request.json()
    return data
}

window.addEventListener('DOMContentLoaded', () => {
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
    })
    .then(() => {
        let element = ''
        for(var i = 0; i < repos.length; i++) {
            element = (`
                <div class="project">
                    <p class="project-title">${repos[i].name.split('-').join(' ')}</p>
                    <p class="text">${repos[i].description}</p>
                    <div class="project-buttons">
                        <img class="project-button" src="./src/star.svg" alt="star">
                        <a target="_blank" href="${repos[i].page}">
                            <img class="project-button" src="./src/view.svg" alt="view">
                        </a>
                        <a target="_blank" href="${repos[i].code}">
                            <img class="project-button" src="./src/code.svg" alt="code">
                        </a>
                    </div>
                </div>
            `)
            projects.innerHTML += element
        }
    })

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
        return num
    })
    .then((num) => {
        let element = ''
        for(var i = 0; i < num; i++) {
            element = (`
                <li class="person">
                    <img src="${friends[i].avatar}" alt="pfp-person1" class="pic">
                    <a href="${friends[i].url}">@${friends[i].name}</a>
                    <p>Lorem ipsum dolor</p>
                </li>
            `)
            friendList.innerHTML += element
        }
    })

    console.log(repos)
})