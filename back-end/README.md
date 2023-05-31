# Pré-requisitos 📋

Antes de prosseguir com a configuração, verifique se você tem os seguintes itens instalados em seu notebook:

-   ⚙️ **PHP**: Versão 7.4 ou superior
-   🎵 **Composer**: O gerenciador de pacotes para PHP
-   🌐 **Servidor Web**: Por exemplo, Apache ou Nginx
-   💾 **Banco de Dados**: Por exemplo, MySQL ou PostgreSQL

## Passo 1: Instalando o XAMPP 💻

O XAMPP é um pacote de software livre que contém os componentes necessários para criar um ambiente de desenvolvimento local com Apache, MySQL, PHP e muito mais. Este guia fornecerá instruções passo a passo sobre como instalar o XAMPP em seu sistema.

## Passo 2: Baixar o XAMPP 📦

Faça o download da versão mais recente do XAMPP no site oficial: [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html) conforme seu sistema operacional

## Passo 3: Executar o instalador 🗄️

1. Execute o arquivo de instalação do XAMPP que você baixou.
2. Siga as instruções do instalador para selecionar os componentes que deseja instalar e o diretório de instalação.

## Passo 4: Iniciar o XAMPP 💽

Após a conclusão da instalação, siga as etapas abaixo para iniciar o XAMPP:

1. No Windows, clique duas vezes no atalho do XAMPP no menu Iniciar.
2. No macOS, abra o XAMPP a partir do Launchpad ou do diretório de aplicativos.

## Passo 5: Configurar o XAMPP 🌍

1. Na interface de controle do XAMPP, você pode iniciar e parar os serviços do Apache e MySQL clicando nos botões "Start" e "Stop".
2. Para acessar o phpMyAdmin e gerenciar seus bancos de dados, clique no botão "Admin" próximo ao módulo MySQL.

## Passo 6: Testar a instalação 🗄️

Abra seu navegador web e acesse [http://localhost](http://localhost) para verificar se o XAMPP foi instalado corretamente. Você deve ver a página padrão do XAMPP.

Parabéns! Agora você tem o XAMPP instalado em seu sistema e está pronto para desenvolver e executar aplicativos PHP no ambiente local.

## Passo 7: Instalar o Composer 🎼

1. Faça o download do Composer em https://getcomposer.org/download/.
2. Siga as instruções de instalação para o seu sistema operacional.
3. Verifique a instalação executando o comando `composer --version` no terminal. Deverá exibir a versão instalada do Composer.

## Passo 8: Instalando as dependências 📦

```php
    composer install
```

## Passo 9: Crie o arquivo .env baseando-se no arquivo .env.example 🌐

<br/>

## Passo 10: Crie um banco de dados e informe o nome dele no arquivo .env na variável DB_DATABASE 🗄️

<br/>

## Passo 11: Crie a chave jwt 🔑

```php
    php artisan jwt:secret
```

## Passo 12: Rode o servidor e em seguida rode as migrations com o seguinte comando 🐘

```php
    php artisan migrate
```

## Passo 13: Criando usuario admin 👤

```php
    php artisan db:seed --class=UserSeeder
```

## Passo 14: Rode a aplicação na porta 5000 🚀

```php
    php artisan serve --port=5000
```
