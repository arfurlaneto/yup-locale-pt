import printValue from './printValue';

export const mixed = {
  default: 'O campo é inválido.',
  required: 'O campo é obrigatório.',
  oneOf: 'O campo deve ter um dos seguintes valores: ${values}.',
  notOneOf: 'O campo não deve ter nenhum dos seguintes valores: ${values}.',
  notType: ({
    type, value, originalValue,
  }: any) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${`O campo deve ser do tipo \`${type}\`, `
      + `mas o valor final é: \`${printValue(value, true)}\``}${
      isCast
        ? ` (cast do valor \`${printValue(originalValue, true)}\`).`
        : '.'}`;

    if (value === null) {
      msg += '\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.';
    }

    return msg;
  },
  defined: 'O campo não deve ser indefinido.',
};

export const string = {
  length: 'O campo deve ter exatamente ${length} caracteres.',
  min: 'O campo deve ter pelo menos ${min} caracteres.',
  max: 'O campo deve ter no máximo ${max} caracteres.',
  matches: 'O campo deve corresponder ao padrão: "${regex}".',
  email: 'O campo deve ser um e-mail válido.',
  url: 'O campo deve ser uma URL válida.',
  trim: 'O campo não deve conter espaços adicionais no início nem no fim.',
  lowercase: 'O campo deve estar em letras minúsculas.',
  uppercase: 'O campo deve estar em letras maiúsculas.',
};

export const number = {
  min: 'O campo deve ser maior ou igual a ${min}.',
  max: 'O campo deve menor ou igual a ${max}.',
  lessThan: 'O campo deve ser menor que ${less}.',
  moreThan: 'O campo deve ser maior que ${more}.',
  notEqual: 'O campo não deve ser igual a ${notEqual}.',
  positive: 'O campo deve ser um número positivo.',
  negative: 'O campo deve ser um número negativo.',
  integer: 'O campo deve ser um número inteiro.',
};

export const date = {
  min: 'O campo deve ser posterior a ${min}.',
  max: 'O campo deve ser anterior a ${max}.',
};

export const boolean = {};

export const object = {
  noUnknown: 'O campo tem chaves desconhecidas: ${unknown}.',
};

export const array = {
  min: 'O campo deve ter pelo menos ${min} itens.',
  max: 'O campo deve ter no máximo ${max} itens.',
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
