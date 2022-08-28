const projects = document.querySelector('.projects')
// console.log(projects)

const repos = []


const getData = async () => {
    const request = await fetch('https://api.github.com/users/curvu/repos')
    const data = await request.json()
    return data
}

getData()
.then(data => {
    for(var i = 0; i < data.length; i++) {
        if (data[i].has_pages == true) {
            repos.push(
                {
                    name: data[i].name,
                    git: data[i].url,
                    page: `https://curvu.github.io/${data[i].name}/`
                }
            )
        }
    }
})

console.log(repos)