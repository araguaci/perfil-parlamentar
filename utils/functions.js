function formataRespostas(resultado) {
  const resultadoNovo = resultado.map(cand => cand.get({ plain: true }));

  resultadoNovo.forEach(cand => {
    const respostas = {};
    cand.cpf_resp.forEach(resposta => {
      respostas[resposta.pergunta_id] = resposta.resposta;
    });
    cand.respostas = respostas;
    delete cand.cpf_resp;
  });
  return resultadoNovo;
}

function formataVotacoes(resultado) {
  const resultadoNovo = resultado.map(cand => cand.get({ plain: true }));

  resultadoNovo.forEach(cand => {
    const votacoes = {};
    cand.votacoes.forEach(vot => {
      votacoes[vot.id_votacao] = vot.voto;
    });
    cand.votacoes = votacoes;    
  });
  return resultadoNovo;
}

function formataRespostasUser(resultado) {
  const resultadoNovo = resultado.map(cand => cand.get({ plain: true }));
  resultadoNovo.forEach(cand => {
    const vozAtiva = {};
    const votacoes = {};
    cand.user_resp.forEach(resposta => {
      vozAtiva[resposta.pergunta_id] = resposta.resposta;
    });
    cand.user_vot.forEach(vot => {
      votacoes[vot.id_votacao] = vot.resposta;
    });
    const respostas = { vozAtiva, votacoes };
    cand.respostas = respostas;
    delete cand.user_resp;
    delete cand.user_vot;
  });

  return resultadoNovo;
}

module.exports = {
  formataRespostas,
  formataVotacoes,
  formataRespostasUser
};
