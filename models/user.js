class User{

    // Construtor
    constructor(name, gender, birth, country, email, password, photo, admin){
        this._id;
        this._name = name; // (_) diz que é uma propriedade privada e não deve ser aceesada de fora
        this._gender= gender;
        this._birth =  birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();

    }

    // Getters

    get id(){
        return this._id;
    }
    get register(){
        return this._register;
    }
    get name(){
        return this._name;
    }
    get gender(){
        return this._gender;
    }
    get birth(){
        return this._birth;
    }
    get country(){
        return this._country;
    }
    get email(){
        return this._email;
    }
    get password(){
        return this._password;
    }
    get photo(){
        return this._photo;
    }
    get admin(){
        return this._admin;
    }

    // Setters
    set photo(value){
        this._photo = value;
    }


    loadFromJSON(json){
        for(let name in json){
            switch(name){
                case '_register':
                    this[name] = new Date(json[name]); // se for register tranforma em uma data
                break;
                default:
                    this[name] = json[name];                    
            }

        }
    }

    // Retorna todos os usuários que esta no localstorage
    static getUsersStorage(){
        let users = [];

        if(localStorage.getItem("users")){ // verifica se já tem itens na array e  pega os dados

            users = JSON.parse(localStorage.getItem("users"));
        }  
        return users;  
    }

    getNewID(){

        let usersID = parseInt(localStorage.getItem("userID"));
        // window refere a toda a aplicação
        if(usersID) window.id = 0; // Se não existir cria id

        usersID++; // soma +1 aos id

        localStorage.setItem("usersID", usersID);

        return usersID;
    }

    save(){
        let users = User.getUsersStorage();

        // Verifica se já tem id, caso sim localiza o registro com id
        if(this.id > 0){
            
            users.map(u=>{
                if(u.id == this.id){
                    Object.assign(u, this);
                }
                return u;
            });
        }
        else{ // Gera um novo id // criando usuário
            this._id = this.getNewID(); // Chama o método para criar novo id
            // poderia criar um set id, mas como estou dentro da classe também posso usar _id

            users.push(this); 
        }
        localStorage.setItem("users", JSON.stringify(users)); //salvando no storage
    }

    remove(){
        let users = User.getUsersStorage();   

        users.forEach((userData, index)=>{

            if(this._id == userData._id){
                users.splice(index, 1);
            }

        });
        localStorage.setItem("users", JSON.stringify(users));
    }
}