# Pré-requisitos 📋

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
