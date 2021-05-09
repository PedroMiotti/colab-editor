export function getFileExtension(filename){
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