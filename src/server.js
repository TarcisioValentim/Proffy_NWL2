//Dados
const proffys = [
    {
        name: "Tarcisio Valentim",
        avatar: "https://avatars3.githubusercontent.com/u/"
            + "33500059?s=460&u=dc6e7ff0e06d9bf1eb1d485426f137e"
            + "14f18a08f&v=4",
        whatsapp: "062997001234",
        bio: "Entusiasta das melhores tecnologias de frontend avançado."
            + "<br></br>Apaixonado por explorar coisas em laboratorio e por mudar"
            + "a vida das pessoas atraves de experiencias.Mais de 200.000 pessoas já passaram"
            + "por uma das minhas jornadas.",
        subject: "JavaScript",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },

    {
        name: "Tarcisio Valentim",
        avatar: "https://avatars3.githubusercontent.com/u/"
            + "33500059?s=460&u=dc6e7ff0e06d9bf1eb1d485426f137e"
            + "14f18a08f&v=4",
        whatsapp: "062997001234",
        bio: "Entusiasta das melhores tecnologias de frontend avançado."
            + "<br></br>Apaixonado por explorar coisas em laboratorio e por mudar"
            + "a vida das pessoas atraves de experiencias.Mais de 200.000 pessoas já passaram"
            + "por uma das minhas jornadas.",
        subject: "JavaScript",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    },

    {
        name: "Jemima O'Brien",
        avatar: "https://scontent.fgyn2-1.fna.fbcdn.net/v/t1.0-9/19895075"
            + "_10154850968678099_6246855426730708433_n.jpg?_nc_cat=102&_nc_sid="
            + "174925&_nc_ohc=N-R-6pJ4XXkAX90TBw6&_nc_ht=scontent.fgyn2-1.fna&oh="
            + "647212cc425b131a826a0371afb8d759&oe=5F541E1E",
        whatsapp: "062997004321",
        bio: "International teacher, Polyglota and Mae of a beautiful cat named 'Mishky'."
            + "Its native language is Spanish-Peruvian,"
            + "has advanced knowledge in languages such as English and Portuguese."
            + "<br><br>Passionized by travel, already stamped his passport"
            + "in the best points in the world. Thousands of people have already been transformed by their didactic.",
        subject: "English",
        cost: "50",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciencias",
    "Educacao fisica",
    "Fisica",
    "Historia",
    "Geografia",
    "Matematica",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// Funcionalidades pega dados e num da aula
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}
// Funcionalidades apresentacao da pagina inicial
function pageLanding(req, res) {
    return res.render("index.html")
}
// Funcionalidades apresentacao da pagina study + filtros
function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
// Funcionalidades apresentacao da pagina give-classes
function pageGiveClasses(req, res) {
    const data = req.query

    // []
    const isNotEmpty = Object.keys(data).length != 0
    //se tiver data adicionar
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        // adicionar data a lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    } else
        // se nao, mostrar pagina vazia
        return res.render("give-classes.html", { subjects, weekdays })
}

// Servidor
const express = require('express')
const server = express()


//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Inicio e configuracao do servidor
server
    //configurar arquivos estaticos (css, scripts, images)
    .use(express.static('public'))
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    // start do servidor
    .listen(5500)