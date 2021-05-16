function getFileExtension(filename){
    var extension = "Arquivo sem extensão";
    // Verifica se tem pontos no nome do arquivo
    var indexOfPeriod = filename.indexOf(".");
    
    // se tiver, faz um for invertido até chegar no index do primeiro ponto
    if(indexOfPeriod != -1){
        for (let i = filename.length ; i >= 0 ; i--){
            if(filename[i] === "."){
                var indexOfPeriod = i;
                break;
            }
        }
        // pegar do index do ponto ate a ultima letra para obter o nome da extensão!
        indexOfPeriod++; // Aqui, trata o erro caso a pessoa escolha como ultimo char o "."
        while(indexOfPeriod < filename.length){
            extension += filename[indexOfPeriod];
            indexOfPeriod++;
        }
    }

    return extension;    
}


export function getLanguageInfo(filename){
    let fileExtension = getFileExtension(filename);
    let language = {};

    switch(fileExtension){
        case "js":
            language = {id: 63, name: 'javascript', src: "langLogos/63.svg"};
            break;
        case "ts":
            language = {id: 74, name: 'typescript', src: "langLogos/74.svg"};
            break;
        case "py":
            language = {id: 71, name: 'python', src: "langLogos/71.svg"};
            break;
        case "java":
            language = {id: 62, name: 'java', src: "langLogos/62.svg"};
            break;
        case "c":
            // algumas linguagens possuem versões para rodar, não sei qual é a versão ideal então coloquei qualquer uma 
            language = {id: 48, name: 'c', src: "langLogos/48.svg"}; 
            break;
        case "cpp":
            language = {id: 52, name: 'c++', src: "langLogos/52.svg"};
            break;
        case "c#":
            language = {id: 51, name: 'c#', src: "langLogos/51.svg"} 
            break;
        default:
            language = {id: 43, name: 'plain text', src: "langLogos/23.svg"};

    }

    return language;
}

export const validateFileName = (filename) => {
    var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2=/^\./; // cannot start with dot 
    var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    
    return rg1.test(filename)&&!rg2.test(filename)&&!rg3.test(filename);
    
}
