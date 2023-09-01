// Instância a classe UserController 
let userController = new UserController("form-user-create", "form-user-update", "table-users"); // construtor pede como parametro um formulario = "form-user-create", e uma tabela

// Primeira versão dos códigos
/**
    window // Navegador, janela
    document // Documento, site

    alert("Hello word! 2");
    console.log("Oi");

 // Objeto ->  Método  ->       Selector ->     Propriedade
    document.querySelector("#exampleInputName").value
    document.querySelector("#exampleInputName").value = "Oi"; // muda o texto dentro do elemento
*/

/* Pegando conteudo do Formulário e pondo em Variáveis */
/*var name = document.querySelector("#exampleInputName");
var gender = document.querySelectorAll("#form-user-create [name=gender]:checked");
var birth = document.querySelector("#exampleInputBirth");
var country = document.querySelector("#exampleInputCountry");
var email = document.querySelector("#exampleInputEmail");
var password = document.querySelector("#exampleInputPassword");
var photo = document.querySelector("#exampleInputFile");
var admin = document.querySelector("exampleInputAdmin");*/


/* Mudando propriedades do elemento Selecionado */
//var nome = document.querySelector("#exampleInputnome");
//console.log(nome); // Pega o elemento inteiro
// console.log(nome.value); // Pega só o valor do elemento
// nome.style.color = "red"; // Mudar a cor do texto para vermelho

/*  Filtrando busca do formulário botão de rádio selecionado */
// querySelectorAll busca vários elementos, todos do tipo passado
/*var genero = document.querySelectorAll("#form-user-create [name=gender]:checked"); // [name=gender Busca elementos com name gender, e  :checked que estejam selecionados
console.log(genero);*/


/* Rotina para ler todos os elementos do formulario com name */
/*var fields = document.querySelectorAll("#form-user-create [name]");
var user = {};*/


/*function addLine(dataUser){

    console.log(dataUser);
    
    document.getElementById("table-users").innerHTML= `  
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    </tr>    
    `;
    // document.getElementById("table-users").appendChild(tr);
}*/

/*// Pega o formulário e fica ouvindo o evento de submit
document.getElementById("form-user-create").addEventListener("submit", function(event){
    event.preventDefault(); // Não deixa a página atualizar, apos apertat o botão
    
    // Para cada linha de código encontrada com campo name executa esse bloco de código:
    fields.forEach(function(field, index){

        if(field.name == "gender"){
            if(field.checked){ //field.checked === true
                user[field.name] = field.value; // user.gender
            }
            
        }else{
            user[field.name] = field.value;
        }
    // user acaba sendo um JSON com dados do usuário != objeto
    // console.log(field.id, field.name, field.value, field.checked, index); // Mostra id, nome, valor, checked, indice

    });

    // Cria um objeto intância da clase User.js
    var objectUser = new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);

    addLine(objectUser);

});/*

/*
// Fica ouvindo todos os botões caso algum seja clicado dispara a mensagem para casa botao da lista
document.querySelectorAll("button").forEach(function(){

    this.addEventListener("click", function(){
        console.log("Clicou!")
    });
});*/


// Notação JSON
//var data = { name: "Rafael", sobrenome: "Florentino", idade:29}
// console.log(data.name);
// console.log(typeof(data.idade));

// SPA Single Page Aplication (sites onde toda a aplicação e em uma página apenas);
