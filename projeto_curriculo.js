class Curriculo {
  constructor(nome,endereco,telefone,email,rg,dataNascimento,sexo,instituicao,curso,dataInicio,dataFim,empresa,cargo,dataEntrada,dataSaida,funcao) {
	this.nome = nome;
	this.endereco = endereco;
	this.telefone = telefone;
	this.email = email;
	this.rg = rg;
	this.dataNascimento = dataNascimento;
	this.sexo = sexo;
	this.instituicao = instituicao;
	this.curso = curso;
	this.dataInicio = dataInicio;
	this.dataFim = dataFim;
	this.empresa = empresa;
	this.cargo = cargo;
	this.dataEntrada = dataEntrada;
	this.dataSaida = dataSaida;
	this.funcao = funcao;
  }
}

listaCandidatos = [];
posicao = '';

function adicionarCandidato(lista,candidato) {
  lista.push(candidato);
}

function atualizarCandidato(lista,candidato,pos){
	lista[pos] = candidato;
}

function excluirCandidato(lista,pos){
	lista.splice(pos,1);
}

function listarCandidatos(lista) {
  var auxHtml = '<thead>'+
                '<tr>'+
				'<th>Nome</th>'+
				'<th>Endereço</th>'+
				'<th>Telefone</th>'+
				'<th>E-mail</th>'+
				'<th>RG</th>'+
				'<th>Data de Nascimento</th>'+
				'<th>Sexo</th>'+
				'<th>Instituição</th>'+
				'<th>Curso</th>'+
				'<th>Data de Início</th>'+
				'<th>Data de Finalização</th>'+
				'<th>Empresa</th>'+
				'<th>Cargo</th>'+
				'<th>Data de Entrada</th>'+
				'<th>Data de Saída</th>'+
				'<th>Funções</th>'+
				'<th>Alterar</th>'+
				'<th>Excluir</th>'+
				'</tr>'+
                '</thead>';
  for (var i = 0; i < lista.length; i++) {
    auxHtml += '<tr>'+
                  '<td>'+ lista[i].nome +'</td>'+
				 '<td>'+ lista[i].endereco +'</td>'+
				 '<td>'+ lista[i].telefone +'</td>'+
				 '<td>'+ lista[i].email +'</td>'+
				 '<td>'+ lista[i].rg +'</td>'+
				 '<td>'+ lista[i].dataNascimento +'</td>'+
				 '<td>'+ lista[i].sexo +'</td>'+
				 '<td>'+ lista[i].instituicao +'</td>'+
				 '<td>'+ lista[i].curso +'</td>'+
				 '<td>'+ lista[i].dataInicio +'</td>'+
				 '<td>'+ lista[i].dataFim +'</td>'+
				 '<td>'+ lista[i].empresa +'</td>'+
				 '<td>'+ lista[i].cargo +'</td>'+
				 '<td>'+ lista[i].dataEntrada +'</td>'+
				 '<td>'+ lista[i].dataSaida +'</td>'+
				 '<td>'+ lista[i].funcao +'</td>'+
				 '<td><a class="btn btn-warning btAlterar" rel="'+ i +'">A</a></td>'+
				 '<td><a class="btn btn-danger btExcluir" rel="'+ i +'">X</a></td>'+
			   '</tr>';
  }
  return auxHtml;
}

$(document).ready(function() {
  $('#btSalvar').click(function() {
	var nome = $('#nome').val();
	var endereco = $('#endereco').val();
	var telefone = $('#telefone').val();
	var email = $('#email').val();
	var rg = $('#rg').val();
	var dataNascimento = $('#dataNascimento').val();
	var sexo = $('#sexo').val();
	var instituicao = $('#instituicao').val();
	var curso = $('#curso').val();
	var dataInicio = $('#dataInicio').val();
	var dataFim = $('#dataFim').val();
	var empresa = $('#empresa').val();
	var cargo = $('#cargo').val();
	var dataEntrada = $('#dataEntrada').val();
	var dataSaida = $('#dataSaida').val();
	var funcao = $('#funcao').val();
	var candidato = new Curriculo(nome,endereco,telefone,email,rg,dataNascimento,sexo,instituicao,curso,dataInicio,dataFim,empresa,cargo,dataEntrada,dataSaida,funcao);
	if(posicao == ''){
		adicionarCandidato(listaCandidatos,candidato);
	}else{
		atualizarCandidato(listaCandidatos,candidato,posicao);
		posicao = '';
	}

	$('#tabela').html(listarCandidatos(listaCandidatos));
	
	$('input').val('');
  });
  
  $('#btJSON').click(function() {
    var listaJSON = JSON.stringify(listaCandidatos);
	alert(listaJSON);
  });
  
  $('#btAJAX').click(function() {
	$.ajax({
      method: 'GET',
	  url: 'http://date.jsontest.com/'
	}).done(function(retorno) {
	  for (item in retorno) {
		console.log(item);
	  }
	  $('#dados').html(retorno.date +' - '+ retorno.time);
	});
  });
  
  $('body').on('click', '.btAlterar', function(evento) {
	  var elemento = evento.target || evento.SrcElement;
	  posicao = elemento.rel;
	  $('#nome').val(listaCandidatos[posicao].nome);
	  $('#endereco').val(listaCandidatos[posicao].endereco);
	  $('#telefone').val(listaCandidatos[posicao].telefone);
	  $('#email').val(listaCandidatos[posicao].email);
	  $('#rg').val(listaCandidatos[posicao].rg);
	  $('#dataNascimento').val(listaCandidatos[posicao].dataNascimento);
	  $('#sexo').val(listaCandidatos[posicao].sexo);
	  $('#instituicao').val(listaCandidatos[posicao].instituicao);
	  $('#curso').val(listaCandidatos[posicao].curso);
	  $('#dataInicio').val(listaCandidatos[posicao].dataInicio);
	  $('#dataFim').val(listaCandidatos[posicao].dataFim);
	  $('#empresa').val(listaCandidatos[posicao].empresa);
	  $('#cargo').val(listaCandidatos[posicao].cargo);
	  $('#dataEntrada').val(listaCandidatos[posicao].dataEntrada);
	  $('#dataSaida').val(listaCandidatos[posicao].dataSaida);
	  $('#funcao').val(listaCandidatos[posicao].funcao);
  });
  
    $('body').on('click', '.btExcluir', function(evento) {
	  var elemento = evento.target || evento.SrcElement;
	  if(confirm('Excluir curriculum?')){
		excluirCandidato(listaCandidatos, elemento.rel); 
		$('#tabela').html(listarCandidatos(listaCandidatos));
	  }
  });
  
  $('#btCancelar').click(function(){
	  $('input').val('');
	  posicao = '';
  });
});