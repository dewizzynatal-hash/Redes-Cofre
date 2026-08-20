/* =====================================================
   CONFIGURAÇÃO
===================================================== */

let notas = JSON.parse(
    localStorage.getItem("notas")
) || [];

let pinGuardado = localStorage.getItem("pin");

let notaAtual = null;


/* =====================================================
   ELEMENTOS
===================================================== */

const telaPIN =
    document.getElementById("telaPIN");

const aplicacao =
    document.getElementById("aplicacao");

const campoPIN =
    document.getElementById("campoPIN");

const textoPIN =
    document.getElementById("textoPIN");

const mensagemPIN =
    document.getElementById("mensagemPIN");


/* =====================================================
   INICIAR APP
===================================================== */

window.addEventListener("load", function () {

    if (!pinGuardado) {

        textoPIN.textContent =
            "Crie um PIN de 4 a 6 números";

    } else {

        textoPIN.textContent =
            "Digite o seu PIN";

    }

});


/* =====================================================
   ENTRAR / CRIAR PIN
===================================================== */

function entrar() {

    const pin = campoPIN.value.trim();


    if (!/^\d{4,6}$/.test(pin)) {

        mostrarMensagem(
            "O PIN deve ter entre 4 e 6 números."
        );

        return;
    }


    /* PRIMEIRA UTILIZAÇÃO */

    if (!pinGuardado) {

        localStorage.setItem(
            "pin",
            pin
        );

        pinGuardado = pin;

        mostrarAplicacao();

        campoPIN.value = "";

        return;
    }


    /* VERIFICAR PIN */

    if (pin === pinGuardado) {

        mostrarAplicacao();

        campoPIN.value = "";

        mensagemPIN.textContent = "";

    } else {

        mostrarMensagem(
            "PIN incorreto."
        );

        campoPIN.value = "";

        campoPIN.focus();

    }

}


/* =====================================================
   MENSAGEM PIN
===================================================== */

function mostrarMensagem(texto) {

    mensagemPIN.textContent = texto;

}


/* =====================================================
   MOSTRAR APLICAÇÃO
===================================================== */

function mostrarAplicacao() {

    telaPIN.style.display = "none";

    aplicacao.style.display = "block";

    mostrarNotas();

}


/* =====================================================
   BLOQUEAR APP
===================================================== */

function bloquearAplicacao() {

    aplicacao.style.display = "none";

    telaPIN.style.display = "flex";

    textoPIN.textContent =
        "Digite o seu PIN";

    campoPIN.value = "";

    mensagemPIN.textContent = "";

    campoPIN.focus();

}


/* =====================================================
   MOSTRAR NOTAS
===================================================== */

function mostrarNotas(lista = notas) {

    const listaNotas =
        document.getElementById("listaNotas");

    listaNotas.innerHTML = "";


    atualizarContador();


    if (lista.length === 0) {

        listaNotas.innerHTML = `
            <div
                style="
                    text-align:center;
                    padding:40px 10px;
                    color:#777;
                "
            >
                <div style="font-size:45px;">
                    📝
                </div>

                <p style="margin-top:10px;">
                    Nenhuma nota encontrada.
                </p>
            </div>
        `;

        return;
    }


    lista.forEach(function (nota) {

        const elemento =
            document.createElement("div");

        elemento.className = "nota";


        const indiceReal =
            notas.indexOf(nota);


        elemento.innerHTML = `

            <div class="notaInfo">

                <div>

                    <h3>
                        ${escaparHTML(nota.titulo)}
                    </h3>

                    <p>
                        ${escaparHTML(
                            nota.usuario ||
                            nota.email ||
                            "Sem informações"
                        )}
                    </p>

                </div>

                <span class="notaSeta">
                    ›
                </span>

            </div>

        `;


        elemento.addEventListener(
            "click",
            function () {

                abrirNota(indiceReal);

            }
        );


        listaNotas.appendChild(elemento);

    });

}


/* =====================================================
   CONTADOR
===================================================== */

function atualizarContador() {

    const contador =
        document.getElementById("contadorNotas");

    const quantidade = notas.length;


    if (quantidade === 1) {

        contador.textContent =
            "1 nota";

    } else {

        contador.textContent =
            quantidade + " notas";

    }

}


/* =====================================================
   ABRIR NOTA
===================================================== */

function abrirNota(index) {

    const nota = notas[index];


    if (!nota) {
        return;
    }


    notaAtual = index;


    document.getElementById(
        "detalhesTitulo"
    ).textContent =
        nota.titulo;


    document.getElementById(
        "detalhesUsuario"
    ).textContent =
        nota.usuario || "Não informado";


    document.getElementById(
        "detalhesEmail"
    ).textContent =
        nota.email || "Não informado";


    document.getElementById(
        "detalhesSenha"
    ).value =
        nota.senha || "";


    document.getElementById(
        "detalhesSenha"
    ).type = "password";


    document.getElementById(
        "detalhesNumero"
    ).textContent =
        nota.numero || "Não informado";


    document.getElementById(
        "detalhesObservacoes"
    ).textContent =
        nota.observacoes || "Sem observações";


    document.getElementById(
        "telaDetalhes"
    ).style.display = "flex";

}


/* =====================================================
   FECHAR DETALHES
===================================================== */

function fecharDetalhes() {

    document.getElementById(
        "telaDetalhes"
    ).style.display = "none";

    notaAtual = null;

}


/* =====================================================
   NOVA NOTA
===================================================== */

function abrirNovaNota() {

    limparFormulario();

    document.getElementById(
        "telaNovaNota"
    ).style.display = "flex";

}


function fecharNovaNota() {

    document.getElementById(
        "telaNovaNota"
    ).style.display = "none";

}


/* =====================================================
   GUARDAR NOTA
===================================================== */

function guardarNota() {

    const titulo =
        document.getElementById("titulo").value.trim();

    const usuario =
        document.getElementById("usuario").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const senha =
        document.getElementById("senha").value;

    const numero =
        document.getElementById("numero").value.trim();

    const observacoes =
        document.getElementById("observacoes").value.trim();


    if (titulo === "") {

        alert(
            "Digite o nome da nota."
        );

        return;
    }


    const novaNota = {

        titulo: titulo,

        usuario: usuario,

        email: email,

        senha: senha,

        numero: numero,

        observacoes: observacoes

    };


    notas.push(novaNota);


    salvarNotas();


    fecharNovaNota();

    mostrarNotas();

}


/* =====================================================
   EDITAR NOTA
===================================================== */

function editarNotaAtual() {

    if (notaAtual === null) {
        return;
    }


    const nota = notas[notaAtual];


    fecharDetalhes();


    document.getElementById(
        "titulo"
    ).value = nota.titulo || "";


    document.getElementById(
        "usuario"
    ).value = nota.usuario || "";


    document.getElementById(
        "email"
    ).value = nota.email || "";


    document.getElementById(
        "senha"
    ).value = nota.senha || "";


    document.getElementById(
        "numero"
    ).value = nota.numero || "";


    document.getElementById(
        "observacoes"
    ).value = nota.observacoes || "";


    document.getElementById(
        "telaNovaNota"
    ).style.display = "flex";


    /* Alterar o botão para edição */

    const botao =
        document.querySelector(
            "#telaNovaNota .botaoPrincipal"
        );


    botao.textContent =
        "Atualizar Nota";


    botao.onclick =
        function () {

            atualizarNota(notaAtual);

        };

}


/* =====================================================
   ATUALIZAR NOTA
===================================================== */

function atualizarNota(index) {

    const titulo =
        document.getElementById("titulo").value.trim();

    if (titulo === "") {

        alert(
            "Digite o nome da nota."
        );

        return;
    }


    notas[index] = {

        titulo: titulo,

        usuario:
            document.getElementById(
                "usuario"
            ).value.trim(),

        email:
            document.getElementById(
                "email"
            ).value.trim(),

        senha:
            document.getElementById(
                "senha"
            ).value,

        numero:
            document.getElementById(
                "numero"
            ).value.trim(),

        observacoes:
            document.getElementById(
                "observacoes"
            ).value.trim()

    };


    salvarNotas();


    const botao =
        document.querySelector(
            "#telaNovaNota .botaoPrincipal"
        );


    botao.textContent =
        "Guardar Nota";


    botao.onclick =
        guardarNota;


    fecharNovaNota();

    limparFormulario();

    mostrarNotas();

}


/* =====================================================
   APAGAR NOTA
===================================================== */

function apagarNotaAtual() {

    if (notaAtual === null) {
        return;
    }


    const confirmar =
        confirm(
            "Tem certeza que deseja apagar esta nota?"
        );


    if (!confirmar) {
        return;
    }


    notas.splice(
        notaAtual,
        1
    );


    salvarNotas();


    fecharDetalhes();

    mostrarNotas();

}


/* =====================================================
   SALVAR NOTAS
===================================================== */

function salvarNotas() {

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

}


/* =====================================================
   LIMPAR FORMULÁRIO
===================================================== */

function limparFormulario() {

    document.getElementById(
        "titulo"
    ).value = "";

    document.getElementById(
        "usuario"
    ).value = "";

    document.getElementById(
        "email"
    ).value = "";

    document.getElementById(
        "senha"
    ).value = "";

    document.getElementById(
        "numero"
    ).value = "";

    document.getElementById(
        "observacoes"
    ).value = "";


    const botao =
        document.querySelector(
            "#telaNovaNota .botaoPrincipal"
        );


    if (botao) {

        botao.textContent =
            "Guardar Nota";

        botao.onclick =
            guardarNota;

    }

}


/* =====================================================
   MOSTRAR / ESCONDER SENHA
===================================================== */

function alternarSenha(
    id,
    botao
) {

    const campo =
        document.getElementById(id);


    if (campo.type === "password") {

        campo.type = "text";

        botao.textContent = "🙈";

    } else {

        campo.type = "password";

        botao.textContent = "👁";

    }

}


/* =====================================================
   COPIAR TEXTO
===================================================== */

function copiarTexto(id) {

    const elemento =
        document.getElementById(id);


    let texto = "";


    if (
        elemento.tagName === "INPUT" ||
        elemento.tagName === "TEXTAREA"
    ) {

        texto = elemento.value;

    } else {

        texto = elemento.textContent;

    }


    if (!texto || texto === "Não informado") {

        return;

    }


    navigator.clipboard.writeText(
        texto
    )
    .then(function () {

        alert(
            "Copiado!"
        );

    })
    .catch(function () {

        alert(
            "Não foi possível copiar."
        );

    });

}


/* =====================================================
   PESQUISA
===================================================== */

document
    .getElementById("pesquisa")
    .addEventListener(
        "input",
        function () {

            const texto =
                this.value
                    .toLowerCase()
                    .trim();


            if (texto === "") {

                mostrarNotas();

                return;

            }


            const filtradas =
                notas.filter(
                    function (nota) {

                        return (

                            (nota.titulo || "")
                                .toLowerCase()
                                .includes(texto)

                            ||

                            (nota.usuario || "")
                                .toLowerCase()
                                .includes(texto)

                            ||

                            (nota.email || "")
                                .toLowerCase()
                                .includes(texto)

                            ||

                            (nota.numero || "")
                                .toLowerCase()
                                .includes(texto)

                        );

                    }
                );


            mostrarNotas(filtradas);

        }
    );


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto || "";

    return div.innerHTML;

}


/* =====================================================
   ENTER NO PIN
===================================================== */

campoPIN.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            entrar();

        }

    }
);


/* =====================================================
   BLOQUEAR QUANDO A PÁGINA FICA OCULTA
===================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden &&
            aplicacao.style.display === "block"
        ) {

            bloquearAplicacao();

        }

    }
);
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register(
            "./service-worker.js"
        );
    });
}