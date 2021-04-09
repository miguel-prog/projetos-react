const lista = document.getElementById("lista");
const formulario = document.getElementById("formulario");
const adicionarContato = document.getElementById("adicionarContato");
const abrirFormularioContato = document.getElementById(
  "abrirFormularioContato"
);
const contatoLista = document.getElementById("contatoLista");
const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const enderecoImagem = document.getElementById("enderecoImagem");
const botoesContatoRemover = document.getElementsByClassName(
  "js-contato-remover"
);
const buscarContatos = document.getElementById("buscarContatos");

let templateItemLista = `<li class="contato-lista-item">
    <div class="contato-avatar" style="background-image: url(FOTO)"></div>
    <div class="contato-detalhes">
        <p>NOME</p>
        <p>TELEFONE</p>
    </div>
    <button class="contato-remover js-contato-remover">
        Remover
    </button>
    </li>`;

abrirFormularioContato.addEventListener("click", function (e) {
  console.debug("Clicou no botão Abrir formulário contato");
  lista.classList.add("js-escondido");
  formulario.classList.remove("js-escondido");
});

adicionarContato.addEventListener("click", function (e) {
  console.debug("Clicou no botão Adicionar contato");

  let conteudoNovoContato = templateItemLista
    .replace("FOTO", enderecoImagem.value)
    .replace("NOME", nome.value)
    .replace("TELEFONE", telefone.value);

  let div = document.createElement("div");
  div.innerHTML = conteudoNovoContato;
  contatoLista.append(div);

  vincularEventoAosBotoesDeExclusao();

  lista.classList.remove("js-escondido");
  formulario.classList.add("js-escondido");
});

function vincularEventoAosBotoesDeExclusao() {
  for (let botaoContatoRemover of botoesContatoRemover) {
    botaoContatoRemover.addEventListener("click", function (e) {
      e.target.parentNode.remove();
    });
  }
}

vincularEventoAosBotoesDeExclusao();

buscarContatos.addEventListener("input", function (e) {
  const textoFiltro = e.target.value.toLowerCase();

  let paragrafosDetalhe = document.querySelectorAll(
    "li.contato-lista-item div.contato-detalhes p"
  );
  for (let i = 0; i < paragrafosDetalhe.length; i += 2) {
    let conteudo1 = paragrafosDetalhe[i].innerHTML.toLowerCase();
    let conteudo2 = paragrafosDetalhe[i + 1].innerHTML.toLowerCase();
    if (
      conteudo1.indexOf(textoFiltro) >= 0 ||
      conteudo2.indexOf(textoFiltro) >= 0
    ) {
      paragrafosDetalhe[i].parentNode.parentNode.classList.remove(
        "js-escondido"
      );
      paragrafosDetalhe[i + 1].parentNode.parentNode.classList.remove(
        "js-escondido"
      );
    } else {
      paragrafosDetalhe[i].parentNode.parentNode.classList.add("js-escondido");
      paragrafosDetalhe[i + 1].parentNode.parentNode.classList.add(
        "js-escondido"
      );
    }
  }
});
