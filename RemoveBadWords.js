const BadWords = ["fuck", "sex", "prick", "bastard", "bellend", "ass", "arse", "cunt", "balls", "shit", "gobdaw", "fecker", "ráicleach", "cúl tóna", "aiteann", "merde", "putain", "c’est des conneries", "salope, fils de salope", "t’as pas de couilles", "je m’en fous", "osti de calisse de tabarnak", "mierda váyase a la mierda",  "que te folle un pez,puto,verga" ,"cojones,coño", "cazzo ","che palle","tette" ,"stronzo","fanculo" ,"vaffanculo" ,"pompinara" ,"arschgesicht","scheißkopf","küss meinen arsch","verpiss dich!","zur hölle mit","wichser" ,"arschgeige" ,"cabra" , "cabrão","monte de merda" ,"caralho" ,"vai para o caralho","rego do cu" ,"puta que pariu", "chupa-mos"]

function RemoveWords(client) {
    client.on('messageCreate', message => {
        const args = message.content.toLowerCase().split(' ')
        for(let i = 0; i <= args.length; i++){
            if(BadWords.includes(args[i])) {
              message.delete()
            }
        }
    })    
}

module.exports = RemoveWords