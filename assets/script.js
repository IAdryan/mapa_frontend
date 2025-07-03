class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form); // Seleciona o formulário pelo seletor fornecido
        this.button = document.querySelector(settings.button); // Seleciona o botão pelo seletor fornecido
        if (this.form) {
            this.url = this.form.getAttribute('action'); // Obtém a URL de envio do atributo 'action' do formulário
        }
        this.sendForm = this.sendForm.bind(this); // Garante o contexto correto do 'this' em sendForm
    }

    displaySuccessMessage() {
        // Exibe mensagem de sucesso no formulário
        this.form.innerHTML = this.settings.successMessage;
    }

    displayErrorMessage() {
        // Exibe mensagem de erro no formulário
        this.form.innerHTML = this.settings.errorMessage;
    }

    displayCamposObrigatorios() {
        // Exibe mensagem de campos obrigatórios não preenchidos
        this.form.innerHTML = this.settings.camposObrigatorios;
    }

    getFormObject() {
        // Cria um objeto com os dados do formulário
        const formObject = {};
        const fields = this.form.querySelectorAll('[name]');
        fields.forEach((field) => {
            formObject[field.getAttribute('name')] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        event.target.innerText = 'Enviando...'; // Altera o texto do botão para indicar envio
    }

    async sendForm(event) {
        this.onSubmission(event);

        // Verifica se todos os campos estão preenchidos
        const fields = this.form.querySelectorAll('[name]');
        let allFilled = true;
        fields.forEach((field) => {
            if (!field.value.trim()) {
                allFilled = false;
            }
        });

        if (!allFilled) {
            this.displayCamposObrigatorios(); // Exibe mensagem se algum campo estiver vazio
        } else {
            try {
                // Envia os dados do formulário via fetch (POST)
                await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.getFormObject()),
                });
                this.displaySuccessMessage(); // Exibe mensagem de sucesso
            } catch (error) {
                this.displayErrorMessage(); // Exibe mensagem de erro
                throw new Error(error);
            }
        }
    }

    init() {
        // Adiciona o evento de clique ao botão para enviar o formulário
        if (this.form) this.button.addEventListener('click', this.sendForm);
        return this;
    }
}

// Instancia a classe com as configurações necessárias
const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    successMessage: "<h1 class='success'>Mensagem enviada com êxito!</h1>",
    errorMessage: "<h1 class='error'>Ocorreu um erro ao enviar a mensagem.</h1>",
    camposObrigatorios: "<h1 class='error'>Todos os campos devem estar preenchidos.</h1>",
});

formSubmit.init(); // Inicializa o envio do formulário