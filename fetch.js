const url = 'http://localhost:3000/foods'

fetch(url).then((res) => {
    if (!res.ok)
    {
        throw new Error('Network response was not ok')
    }
    return res.json();
}).then((data) => {
    console.log({'userData': data})
}).catch((err) => console.log(err))