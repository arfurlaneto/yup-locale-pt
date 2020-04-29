# Brazilian Portuguese Localization for Yup

[Ler em Português](README.pt-br.md)

## Flavors
There are "flavors" of translation:
- `pt`  is the default translation of Yup's `locale.js` file. Example: *'name is required'*.
- `ptForm` is optimized to be shown in form fields. It does not repeat the field name and is formatted like a sentence. Example: *'The field is required'*.

## Usage
Install with npm ...
```
npm install yup-locale-pt
```
... or with yarn ...
```
yarn add yup-locale-pt
```
... and set locale with Yup's `setLocale`...
```js
import * as Yup from 'yup';
import { pt } from 'yup-locale-pt';

Yup.setLocale(pt);
```
...or...
```js
import * as Yup from 'yup';
import { ptForm } from 'yup-locale-pt';

Yup.setLocale(ptForm);
```
