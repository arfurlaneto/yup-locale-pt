import printValue from './printValue';

export const mixed = {
  default: 'Inválido.',
  required: 'Obrigatório.',
  oneOf: 'Deve ter um dos seguintes valores: ${values}.',
  notOneOf: 'Não deve ter nenhum dos seguintes valores: ${values}.',
  notType: ({
    type, value, originalValue,
  }: any) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${`Deve ser do tipo \`${type}\`, `
      + `mas o valor final é: \`${printValue(value, true)}\``}${
      isCast
        ? ` (cast do valor \`${printValue(originalValue, true)}\`).`
        : '.'}`;

    if (value === null) {
      msg += '\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.';
    }

    return msg;
  },
  defined: 'Não deve ser indefinido.',
};

export const string = {
  length: 'Deve ter exatamente ${length} caracteres.',
  min: 'Deve ter pelo menos ${min} caracteres.',
  max: 'Deve ter no máximo ${max} caracteres.',
  matches: 'Deve corresponder ao padrão: "${regex}".',
  email: 'Deve ser um e-mail válido.',
  url: 'Deve ser uma URL válida.',
  trim: 'Não deve conter espaços adicionais no início nem no fim.',
  lowercase: 'Deve estar em letras minúsculas.',
  uppercase: 'Deve estar em letras maiúsculas.',
};

export const number = {
  min: 'Deve ser maior ou igual a ${min}.',
  max: 'Deve menor ou igual a ${max}.',
  lessThan: 'Deve ser menor que ${less}.',
  moreThan: 'Deve ser maior que ${more}.',
  notEqual: 'Não deve ser igual a ${notEqual}.',
  positive: 'Deve ser um número positivo.',
  negative: 'Deve ser um número negativo.',
  integer: 'Deve ser um número inteiro.',
};

export const date = {
  min: 'Deve ser posterior a ${min}.',
  max: 'Deve ser anterior a ${max}.',
};

export const boolean = {};

export const object = {
  noUnknown: 'Existem chaves desconhecidas: ${unknown}.',
};

export const array = {
  min: 'Deve ter pelo menos ${min} itens.',
  max: 'Deve ter no máximo ${max} itens.',
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
