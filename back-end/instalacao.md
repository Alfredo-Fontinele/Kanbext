## Pré-requisitos

Antes de prosseguir com a configuração, verifique se você tem os seguintes itens instalados em seu notebook:

-   **PHP**: Versão 7.4 ou superior
-   **Composer**: O gerenciador de pacotes para PHP
-   **Servidor Web**: Por exemplo, Apache ou Nginx
-   **Banco de Dados**: Por exemplo, MySQL ou PostgreSQL

## Passo 1: Instalar o PHP

1. Faça o download da versão mais recente do PHP em https://www.php.net/downloads.php.
2. Siga as instruções de instalação para o seu sistema operacional.
3. Verifique a instalação executando o comando `php -v` no terminal. Deverá exibir a versão instalada do PHP.

## Passo 2: Instalar o Composer

1. Faça o download do Composer em https://getcomposer.org/download/.
2. Siga as instruções de instalação para o seu sistema operacional.
3. Verifique a instalação executando o comando `composer --version` no terminal. Deverá exibir a versão instalada do Composer.

## Passo 3: Configurar o Servidor Web

1. Instale e configure um servidor web, como o Apache ou Nginx. Consulte a documentação específica do servidor web escolhido para obter instruções detalhadas.
2. Verifique se o servidor web está em execução executando o navegador e acessando `http://localhost`. Se estiver tudo correto, você deverá ver uma página padrão de "Olá, Mundo!".

## Passo 4: Instalar um Banco de Dados

1. Escolha um banco de dados que deseja utilizar, como MySQL, PostgreSQL, SQLite, etc.
2. Instale e configure o banco de dados seguindo as instruções específicas para o sistema operacional e o banco de dados escolhido.

## Passo 5: Instalando as dependências

```php
    composer install
```

## Passo 6: Crie o arquivo .env baseando-se no arquivo .env.example

## Passo 7: Crie um banco de dados e informe o nome dele no arquivo .env na variável DB_DATABASE

## Passo 8: Crie a chave jwt

```php
    php artisan jwt:secret
```

## Passo 9: Rode o servidor e em seguida rode as migrations com o seguinte comando

```php
    php artisan migrate
```

## Passo 10: Criando usuario admin

```php
    php artisan db:seed --class=UserSeeder
```

## Passo 11: Rode a aplicação na porta 5000

```php
    php artisan serve --port=5000
```
