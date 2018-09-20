var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){

	//puxo apenas a parte da querystring (após o sinal '?')
	var url = window.location.search;

	//Substituo o sinal '?' por vazio. Fico assim só com a querystring.
	var nivel_jogo = url.replace("?","");

	var tempo_segundos = 0;

	if(nivel_jogo == 1){
		tempo_segundos = 120;
	}

	if (nivel_jogo == 2) {
		tempo_segundos = 60;
	}

	if (nivel_jogo == 3) {
		tempo_segundos = 30;
	}

	//inserindo a variavel tempo_segundos no elemento span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de balões
	var qtd_baloes = 60;

	cria_baloes(qtd_baloes);
	
	//imprimir contagem de balões inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;

	//imprimir contagem de balões estourados
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
}


function contagem_tempo(tempo_segundos){

	tempo_segundos = tempo_segundos - 1;	

	if(tempo_segundos == -1){
		clearTimeout(timerId); //para a execução da função do setTimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	timerId = setTimeout("contagem_tempo("+tempo_segundos+")", 1000);

}

function game_over(){
	remove_eventos();
	alert('GAME OVER! Você não conseguiu estourar todos os balões a tempo.');
}

function cria_baloes(qtd_baloes){

	for(var i = 1; i <= qtd_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this);}

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
		alert('Parabéns! Você conseguiu estourar todos os balões a tempo.');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos(){
	var i = 1; //contador para recuperar balões por id

	//percorre o elemento de acordo com o id e só(...)
	//(...)irá sair do laço quando não houver correspondência com elemento.
	while(document.getElementById('b'+i)){
		//retira o elemento onclick do elemento
		document.getElementById('b'+i).onclick = "";

		i++ //incremento
	}
}