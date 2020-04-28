import printValue from './printValue';

export const mixed = {
  default: '${path} é inválido',
  required: '${path} é obrigatório',
  oneOf: '${path} deve ser um dos seguintes valores: ${values}',
  notOneOf: '${path} não deve ser nenhum dos seguintes valores: ${values}',
  notType: ({
    path, type, value, originalValue,
  }) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${`${path} deve ser do tipo \`${type}\`, `
      + `mas o valor final é: \`${printValue(value, true)}\``}${
      isCast
        ? ` (cast do valor \`${printValue(originalValue, true)}\`).`
        : '.'}`;

    if (value === null) {
      msg += '\n Se a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`';
    }

    return msg;
  },
  defined: '${path} deve ser definido',
};

export const string = {
  length: '${path} deve ter exatamente ${length} caracteres',
  min: '${path} deve ter pelo menos ${min} caracteres',
  max: '${path} deve ter no máximo ${max} caracteres',
  matches: '${path} deve corresponder ao seguinte: "${regex}"',
  email: '${path} deve ser um e-mail válido',
  url: '${path} deve ser uma URL válida',
  trim: '${path} deve ser uma string sem espaços adicionais',
  lowercase: '${path} deve ser uma string minúscula',
  uppercase: '${path} deve ser uma string maiúscula',
};

export const number = {
  min: '${path} deve ser maior ou igual a ${min}',
  max: '${path} dever menor ou igual a ${max}',
  lessThan: '${path} deve ser menor que ${less}',
  moreThan: '${path} deve ser maior que ${more}',
  notEqual: '${path} não deve ser igual a ${notEqual}',
  positive: '${path} deve ser um número positivo',
  negative: '${path} deve ser um número negativo',
  integer: '${path} deve ser um número inteiro',
};

export const date = {
  min: '${path} deve ser posterior a ${min}',
  max: '${path} deve se anterior a ${max}',
};

export const boolean = {};

export const object = {
  noUnknown: '${path} tem chaves não especificadas: ${unknown}',
};

export const array = {
  min: '${path} deve ter pelo menos ${min} items',
  max: '${path} deve ter menos que ou ${max} itens',
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
