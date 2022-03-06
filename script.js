// Variaveis universais
let seuvotopara = document.querySelector(".seuvotopara p");
let cargo = document.querySelector(".cargo h2");
let boxvoto = document.querySelector(".boxvoto");
let dados = document.querySelector(".dados");
let instrucao = document.querySelector(".instrucao p");
let foto = document.querySelector(".foto");
let etapa = 0;
let numCandidato = '';

// Funções
function inicio(){

    let novaetapa = etapas[etapa]; // pega a etapa no json
    let qtdbox = novaetapa.numeros; // pega o numero de box desta etapa
    seuvotopara.style.display="none"; // tira da tela
    cargo.innerHTML=novaetapa.titulo; // pega o titulo do json
    boxvoto.innerHTML=''; // tira da tela
    instrucao.style.display="none"; // tira da tela

    for(let i = 1; i <= qtdbox ; i++){ // monta os box pro voto
        if(i == 1){
            boxvoto.innerHTML += '<span class="boxvoto span pisca "></span>';
        }else{
            boxvoto.innerHTML += '<span class="boxvoto span"></span>';
        }
    }

}

function btnClick(n){
    let boxpisca = document.querySelector(".pisca");
    if(boxpisca != null){
        numCandidato += `${n}`;
        boxpisca.innerHTML = n;
        boxpisca.classList.remove("pisca");
        if(boxpisca.nextElementSibling != null){
            boxpisca.nextElementSibling.classList.add("pisca");
        }else{
            let jsonNumCandidato = etapas[etapa].candidatos.filter((item)=>{
                if(numCandidato == item.numero){
                    return true;
                }else{
                    return false;}
            })
            if(jsonNumCandidato.length > 0 ){
                numCandidato='';
                seuvotopara.style.display="block";
                instrucao.style.display="block";
                dados.innerHTML=`Nome: ${jsonNumCandidato[0].nome} <br>Partido: ${jsonNumCandidato[0].partido}`;
                for(let i = 0; i < jsonNumCandidato[0].fotos.length; i++){
                    if(i == 0){
                        foto.innerHTML +=`
                        <img src="images/${jsonNumCandidato[0].fotos[i].url}" alt="">${jsonNumCandidato[0].fotos[i].legenda}`;
                    }else{
                        foto.innerHTML +=`
                        <img class="small" src="images/${jsonNumCandidato[0].fotos[i].url}" alt="">${jsonNumCandidato[0].fotos[i].legenda}`;
                    }
                }

            }else{
                seuvotopara.style.display="block";
                instrucao.style.display="block";
                dados.innerHTML='<div class="nulo pisca">VOTO NULO</div>';
            }
        }
    }
}

function btnCorrige(){
    numCandidato = "";
    dados.innerHTML='';
    foto.innerHTML=''
    inicio();
}

function btnConfirma(){
    if(etapas.length > (etapa +1)){
        foto.innerHTML='';
        dados.innerHTML='';
        etapa++;
        inicio();
    }else{
        document.querySelector(".tela").innerHTML="<p>FIM</p>";
        document.querySelector(".tela").classList.replace("tela","fim");
        document.querySelector(".fim p").classList.add("pisca");
    }
}

function btnBranco(){
    boxvoto.innerHTML='';
    foto.innerHTML='';
    dados.innerHTML = '<div class="nulo pisca">VOTO EM BRANCO</div>';
}


inicio();