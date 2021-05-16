import languages from '../assets/languages.json';

function getFileExtension(filename){
    var extension = "";
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


export function getLanguageId(filename){
    let fileExtension = getFileExtension(filename);
    let language = {};

    switch(fileExtension){
        case "js":
            language = 63;
            break;
        case "ts":
            language = 74;
            break;
        case "py":
            language = 71;
            break;
        case "java":
            language = 62;
            break;
        case "c":
            language = 48; 
            break;
        case "cpp":
            language = 52;
            break;
        case "c#":
            language = 51; 
            break;
        default:
            language = 43;

    }

    return language;
}

export const validateFileName = (filename) => {
    var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
    var rg2=/^\./; // cannot start with dot 
    var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
    
    return rg1.test(filename)&&!rg2.test(filename)&&!rg3.test(filename);
    
}

export const selectLanguageSrc = (languageId) => {
    let result;
    let src;

    result = languages.languages.filter((i) => i.id.toString() == languageId)

    src = result[0] ? result[0].src : '';

    return src;
}
