const projects = document.querySelector('.projects')
// console.log(projects)

const repos = []


const getData = async () => {
    const request = await fetch('https://api.github.com/users/curvu/repos')
    const data = await request.json()
    return data
}

window.addEventListener('DOMContentLoaded', () => {
    getData()
    .then(data => {
        for(var i = 0; i < data.length; i++) {
            if (data[i].has_pages == true && data[i].name !== 'admin-dashboard') {
                repos.push(
                    {
                        name: data[i].name,
                        git: data[i].url,
                        page: `https://curvu.github.io/${data[i].name}/`,
                        description: data[i].description
                    }
                )
            }
        }
    })
    .then(() => {
        let element = ''
        for(var i = 0; i < repos.length; i++) {
            element = (`
            <div class="project">
                <a href="${repos[i].page}" class="project-title">${repos[i].name.split('-').join(' ')}</a>
                <p class="text">${repos[i].description}</p>
            </div>
            `)
            projects.innerHTML += element;
        }
    })
    console.log(repos)
})