import * as yup from 'yup';

import { ptShort } from '../src';

yup.setLocale(ptShort);

yup.addMethod(yup.mixed, 'alwaysInvalid', function method() {
  return this.test({
    test: () => false,
  });
});

describe('locale', () => {
  it('should return localized messages for mixed group', async () => {
    const schema = yup.object().shape({
      defaultField: yup.mixed().alwaysInvalid(),
      requiredField: yup.mixed().required(),
      oneOfField: yup.mixed().oneOf([1, 2, 3]),
      notOneOfField: yup.mixed().notOneOf([1, 2, 3]),
      notTypeFieldNullIntention: yup.date(),
      notTypeField: yup.date(),
      definedField: yup.mixed().defined(),
    });

    const data = {
      defaultField: 'whatever',
      requiredField: null,
      oneOfField: 4,
      notOneOfField: 1,
      notTypeFieldNullIntention: null,
      notTypeField: 'not a date',
      definedField: undefined,
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(7);
      expect(err.errors[0]).toStrictEqual('Inválido.');
      expect(err.errors[1]).toStrictEqual('Obrigatório.');
      expect(err.errors[2]).toStrictEqual('Deve ter um dos seguintes valores: 1, 2, 3.');
      expect(err.errors[3]).toStrictEqual('Não deve ter nenhum dos seguintes valores: 1, 2, 3.');
      expect(err.errors[4]).toStrictEqual('Deve ser do tipo `date`, mas o valor final é: `null`.\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.');
      expect(err.errors[5]).toStrictEqual('Deve ser do tipo `date`, mas o valor final é: `"not a date"`.');
      expect(err.errors[6]).toStrictEqual('Não deve ser indefinido.');
    }
  });

  it('should return localized messages for mixed group (non-strict)', async () => {
    const schema = yup.object().shape({
      notTypeFieldNullIntention: yup.date(),
      notTypeField: yup.date(),
    });

    const data = {
      notTypeFieldNullIntention: null,
      notTypeField: 'not a date',
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: false });
    } catch (err) {
      expect(err.errors.length).toEqual(2);
      expect(err.errors[0]).toStrictEqual('Deve ser do tipo `date`, mas o valor final é: `Invalid Date`.');
      expect(err.errors[1]).toStrictEqual('Deve ser do tipo `date`, mas o valor final é: `Invalid Date` (cast do valor `"not a date"`).');
    }
  });

  it('should return localized messages for string group', async () => {
    const schema = yup.object().shape({
      lengthFieldSingular: yup.string().length(1),
      minFieldSingular: yup.string().min(1),
      maxFieldSingular: yup.string().max(1),
      lengthFieldPlural: yup.string().length(5),
      minFieldPlural: yup.string().min(5),
      maxFieldPlural: yup.string().max(5),
      matchesField: yup.string().matches(/\d+/),
      emailField: yup.string().email(),
      urlField: yup.string().url(),
      trimField: yup.string().trim(),
      lowercaseField: yup.string().lowercase(),
      uppercaseField: yup.string().uppercase(),
    });

    const data = {
      lengthFieldSingular: '',
      minFieldSingular: '',
      maxFieldSingular: '12',
      lengthFieldPlural: '1234',
      minFieldPlural: '1234',
      maxFieldPlural: '123456',
      matchesField: 'abc',
      emailField: 'not a e-mail',
      urlField: 'no a url',
      trimField: ' spaced sentence ',
      lowercaseField: 'NOT LOWER',
      uppercaseField: 'not upper',
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(12);
      expect(err.errors[0]).toStrictEqual('Deve ter exatamente 1 caractere.');
      expect(err.errors[1]).toStrictEqual('Deve ter pelo menos 1 caractere.');
      expect(err.errors[2]).toStrictEqual('Deve ter no máximo 1 caractere.');
      expect(err.errors[3]).toStrictEqual('Deve ter exatamente 5 caracteres.');
      expect(err.errors[4]).toStrictEqual('Deve ter pelo menos 5 caracteres.');
      expect(err.errors[5]).toStrictEqual('Deve ter no máximo 5 caracteres.');
      expect(err.errors[6]).toStrictEqual('Deve corresponder ao padrão: "/\\d+/".');
      expect(err.errors[7]).toStrictEqual('Deve ser um e-mail válido.');
      expect(err.errors[8]).toStrictEqual('Deve ser uma URL válida.');
      expect(err.errors[9]).toStrictEqual('Não deve conter espaços adicionais no início nem no fim.');
      expect(err.errors[10]).toStrictEqual('Deve estar em letras minúsculas.');
      expect(err.errors[11]).toStrictEqual('Deve estar em letras maiúsculas.');
    }
  });

  it('should return localized messages for number group', async () => {
    const schema = yup.object().shape({
      minField: yup.number().min(10),
      maxField: yup.number().max(10),
      lessThanField: yup.number().lessThan(10),
      moreThanField: yup.number().moreThan(10),
      positiveField: yup.number().positive(),
      negativeField: yup.number().negative(),
      integerField: yup.number().integer(),
    });

    const data = {
      minField: 9,
      maxField: 11,
      lessThanField: 11,
      moreThanField: 9,
      positiveField: -1,
      negativeField: 1,
      integerField: 0.5,
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(7);
      expect(err.errors[0]).toStrictEqual('Deve ser maior ou igual a 10.');
      expect(err.errors[1]).toStrictEqual('Deve ser menor ou igual a 10.');
      expect(err.errors[2]).toStrictEqual('Deve ser menor que 10.');
      expect(err.errors[3]).toStrictEqual('Deve ser maior que 10.');
      expect(err.errors[4]).toStrictEqual('Deve ser um número positivo.');
      expect(err.errors[5]).toStrictEqual('Deve ser um número negativo.');
      expect(err.errors[6]).toStrictEqual('Deve ser um número inteiro.');
    }
  });

  it('should return localized messages for date group.', async () => {
    const schema = yup.object().shape({
      minField: yup.date().min(new Date(2020, 1, 1)),
      maxField: yup.date().max(new Date(2020, 1, 1)),
    });

    const data = {
      minField: new Date(2019, 12, 31),
      maxField: new Date(2020, 1, 2),
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(2);
      expect(err.errors[0]).toStrictEqual('Deve ser posterior a 2020-02-01T03:00:00.000Z.');
      expect(err.errors[1]).toStrictEqual('Deve ser anterior a 2020-02-01T03:00:00.000Z.');
    }
  });

  it('should return localized messages for object group', async () => {
    const schema = yup.object().shape({}).noUnknown();

    const data = {
      unknownField: 'whatever',
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(1);
      expect(err.errors[0]).toStrictEqual('Existem chaves desconhecidas: unknownField.');
    }
  });

  it('should return localized messages for array group', async () => {
    const schema = yup.object().shape({
      minFieldSingular: yup.array().min(1),
      maxFieldSingular: yup.array().max(1),
      minFieldPlural: yup.array().min(5),
      maxFieldPlural: yup.array().max(5),
    });

    const data = {
      minFieldSingular: [],
      maxFieldSingular: [1, 2],
      minFieldPlural: [1, 2, 3, 4],
      maxFieldPlural: [1, 2, 3, 4, 5, 6],
    };

    try {
      await schema.validate(data, { abortEarly: false, strict: true });
    } catch (err) {
      expect(err.errors.length).toEqual(4);
      expect(err.errors[0]).toStrictEqual('Deve ter pelo menos 1 item.');
      expect(err.errors[1]).toStrictEqual('Deve ter no máximo 1 item.');
      expect(err.errors[2]).toStrictEqual('Deve ter pelo menos 5 itens.');
      expect(err.errors[3]).toStrictEqual('Deve ter no máximo 5 itens.');
    }
  });
});
