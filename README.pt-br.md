# Localização Português Brasileiro para o Yup

[Read in English](README.md)

## Estilos
Há diferentes estilos de tradução:
- `pt` é a tradução padrão do arquivo `locale.js` do Yup. Exemplo: *'nome é obrigatório'*
- `ptForm` é otimizado para ser exibido em campos de formulários. Ele não repete o nome do campo e é formatado como uma frase. Exemplo: *'O campo é obrigatório.'*

## Uso
Instale com o npm ...
```
npm install yup-locale-pt
```
... ou como o yarn ...
```
yarn add yup-locale-pt
```
e mude a localizaçao com a função `setLocale` do Yup...
```js
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);
```
...ou...
```js
import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';

Yup.setLocale(ptForm);
```
