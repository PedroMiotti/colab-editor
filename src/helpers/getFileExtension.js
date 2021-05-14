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

// Import logo img
import jsLogo from '../assets/langLogos/jsLogo.svg';
import tsLogo from '../assets/langLogos/tsLogo.svg';
import pythonLogo from '../assets/langLogos/pythonLogo.svg';
import javaLogo from '../assets/langLogos/javaLogo.svg';
import cLogo from '../assets/langLogos/cLogo.svg';
import cplusplusLogo from '../assets/langLogos/cplusplusLogo.svg';
import csharpLogo from '../assets/langLogos/csharpLogo.svg';

export function getLanguage(filename){
    let fileExtension = getFileExtension(filename);
    let language = {};

    switch(fileExtension){
        case "js":
            language = {id: 63, name: 'javascript', img: jsLogo};
            break;
        case "ts":
            language = {id: 74, name: 'typescript', img: tsLogo};
            break;
        case "py":
            language = {id: 71, name: 'python', img: pythonLogo};
            break;
        case "java":
            language = {id: 62, name: 'java', img: javaLogo};
            break;
        case "c":
            // algumas linguagens possuem versões para rodar, não sei qual é a versão ideal então coloquei qualquer uma 
            language = {id: 48, name: 'c', img: cLogo}; 
            break;
        case "cc":
            language = {id: 52, name: 'c++', img: cplusplusLogo};
            break;
        case "c#":
            language = {id: 51, name: 'c#', img: csharpLogo} 
            break;
        default:
            language = {id: 43, name: 'plain text'};

    }

    return language;
}