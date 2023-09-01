class UserController {

    constructor(formIdCreate, formIdUpdate,tableId) { // Precisa de um formulário(Receber dados dele), Precisa de uma tabela(Imprimir dados nela)

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit(); // Chama o método sem passar nenhum parâmetro
        this.onEdit(); // Chama o método de cancelar
        this.selectAll();

    }
    // Método cancelar
    onEdit(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e =>{
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event =>{
            event.preventDefault();

            let btn =  this.formUpdateEl.querySelector("[type=submit]"); // pega botão de submit do form

            btn.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let tr = this.tableEl.rows[index]; 

            let userOld = JSON.parse(tr.dataset.user);

            let result = Object.assign({}, userOld, values); // substitui, sobrescreve os valores antigos

          this.getPhoto(this.formUpdateEl).then(
            (content)=>{
                if(!values.photo){
                    result._photo = userOld._photo;
                } else{
                    result._photo = content;
                }

                let user = new User();

                user.loadFromJSON(result);

                user.save();

                this.getTr(user, tr);

                this.updateCount();

                this.formUpdateEl.reset();
        
                this.showPanelCreate();

                btn.disabled = false; // Faz o botão voltar a cadastrar novas pessoas

            },
            (e)=>{
                console.error(e);
            }
        );     

        });
    }

    // Método para toda vez que for enviado o formulário
    onSubmit() {

        // Como na arrow function não tem a palavra function, o this irá fazer referência direto ao formulário thi.forEl
        this.formEl.addEventListener("submit", event => { 

            event.preventDefault(); // Não deixa a página atualizar, apos apertat o botão

            let btn =  this.formEl.querySelector("[type=submit]"); // pega botão de submit do form

            btn.disabled = true;// Desabilitar o botão para o formulário só ser enviado uma pessoa por vez
            
            //let user = this.getValues(); // Chama método que pega os valores do formulário.

            let values = this.getValues(this.formEl);

            if(!values) return false; // Caso não recebe um objeto encerra

            this.getPhoto(this.formEl).then(
                (content)=>{
                    
                    values.photo = content;

                    values.save();

                    this.addLine(values);

                    this.formEl.reset();

                    btn.disabled = false; // Faz o botão voltar a cadastrar novas pessoas

                },
                (e)=>{
                    console.error(e);
                }
            );
          
        });

    }

    // Método para pegar a foto que foi enviada e gerar uma nova foto com os dados da foto original
    getPhoto(formEl){

        // Usando Promisse (alternativa para não usar funções de callback)
        return new Promise((resolve, reject)=>{

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item=>{
                if(item.name === 'photo'){
                    return item;
                }
            });
            // [0] pega o primeiro elemento da array, e [0] pega o primeiro arquivo da array
            let file = elements[0].files[0];
    
            // Função assíncrona
            fileReader.onload = ()=>{ // Função de callback, quando terminar de carregar a imagem chama a função
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) => {
                reject(e);
            }
    
            if(file){ // Verifica se algum arquivo foi carregado
                fileReader.readAsDataURL(file);
            }else{ // Caso nenhum arquivo seja carregado no butão, chama o resolv mesmo assim
                resolve('dist/img/boxed-bg.jpg'); // Caso não seja enviada nenhuma imagem coloca essa imagem como padrão
            }
            

        });

       
    }


    // Método para pegar os valores dos campos do formulário
    getValues(formEl) {

        // user por enquanto e apenas um JSON contendo dados para criar um objeto mais na frente, não é um objeto
        let user = {}; // Essa variável só vai existir dentro desse método
        let isValid = true; // Verifica se o formulário esta válido preenchido

        // Percorre cada linha de código encontrada na propriedade elements do formulário
        //[this.formEl.elements[0], this.formEl.elements[1], this.formEl.elements[2]]forEach(function (field, index) {
        [...formEl.elements].forEach(function (field, index) { // ... spread  //ler objeto e diferente de ler array

        // Verifcar campos vazios obrigatórios
        if(['name','email','password'].indexOf(field.name) > -1 && !field.value){ // Verifca se não é vazio ou se não existe
            field.parentElement.classList.add("has-error"); // Acessa classe pai e adiciona classe
            isValid = false; // deixa o formulário inválido caso os campos obriratórios não tenha sido preenchidos
        }

            if (field.name === "gender") {
                if (field.checked) { //field.checked === true
                    user[field.name] = field.value; // user.gender
                }

            } else if(field.name == "admin"){
                user[field.name] = field.checked;
            }else{
                user[field.name] = field.value;
            }

        });

        // Cria um objeto instância da clase User.js
        //var objectUser = new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);

        if(!isValid){ // Se formulário não estiver preenchido
            return false; // Para a execução
        }

        // Retorna o objeto
        //return objectUser;
        // Ou return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
            
        return new User(
            user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo, 
            user.admin
        );
    }


    selectAll(){
        let users = User.getUsersStorage();

        users.forEach(dataUser => {

            let user = new User();

            user.loadFromJSON(dataUser);

            this.addLine(user);
        });
    }

   /* insert(data){
        let users = this.getUsersStorage();
        
        users.push(data); // adiciona novo dado ao final da array

        sessionStorage.setItem("users", JSON.stringify(users));

      // localStorage.setItem("users", JSON.stringify(users)); // local storage
    }*/

    // Adiciona uma nova linha tr na tabela
    addLine(dataUser){// tableId = recebe o id de onde irá por os elemento do dataUser

        let tr = this.getTr(dataUser);
      
        this.tableEl.appendChild(tr); // appendChild adiciona no final, innerHTML substitui e apaga conteúdo antigo

        this.updateCount();

    }

    // Seleciona a tr que será gerada
    getTr(dataUser, tr = null){

        if(tr === null) tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser); // Criando dataset (contém as informações do objeto como uma variável)
        
        tr.innerHTML = `        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);

        return tr;
    }

    addEventsTr(tr){

        // Evento de deletar
        tr.querySelector(".btn-delete").addEventListener("click", e=>{
            if(confirm("Deseja realmente excluir?")){ // mensagem de alerte com opçoes
                let user = new User(JSON.parse(tr.dataset.user));

                user.loadFromJSON();

                user.remove();

                tr.remove(); // remove elemento
                
                this.updateCount();
            }
        });

        // Evento de editar
        tr.querySelector(".btn-edit").addEventListener("click", e=>{

            let json = JSON.parse(tr.dataset.user);
            //let form = document.querySelector("#form-user-update");

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for( let name in json){
               let field = this.formUpdateEl.querySelector("[name="+ name.replace("_", "")+ "]");// procura elemento e tira o _ do nome

               if(field){ // Verificar se o campo existe

                   // if(field.type == 'file') continue; // se for file passa pro próximo campo

                switch (field.type){
                    case 'file':
                        continue;
                        break;

                    case 'radio' :
                        field =  this.formUpdateEl.querySelector("[name="+ name.replace("_", "")+ "][value="+ json[name]+"]");
                        field.checked = true;
                        break;
                      case 'checkbox':
                        field.checked = json[name];
                      break;

                      default:
                        field.value = json[name];
                }

                field.value = json[name];
                   
               }
               
            }

            this.formUpdateEl.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();
        });

    }

    showPanelCreate(){
        document.querySelector("#box-user-create").style.display="block";
        document.querySelector("#box-user-update").style.display="none";
    }

    showPanelUpdate(){
        document.querySelector("#box-user-create").style.display="none";
        document.querySelector("#box-user-update").style.display="block";
    }

    // Quantidades de usuários e admin
    updateCount(){ // tableEl é uma coleção e precisar ser transformado em uma array

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr =>{

            numberUsers++; // Para cada novo usuário cadastrado soma +1 no contador usuários

            let user = JSON.parse(tr.dataset.user); //JSON.parse tranforma string de volta em objeto

            if(user._admin == true) numberAdmin++;
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    }
}