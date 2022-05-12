const { evaluateRegex } = require('./util');

class Person {
  constructor([nome, nacionalidade, estadoCivil, documento, rua, numero, bairro, estado]) {
    // ^ -> start of string
    // + -> one ore more ocurrencies
    // (\w) -> capture just first letter and let the rest to be another group

    const firstLetterExp = evaluateRegex(/^(\w)([a-zA-z]+$)/g);
    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`;
      });
    };

    this.nome = nome;
    this.nacionalidade = formatFirstLetter(nacionalidade);
    this.estadoCivil = formatFirstLetter(estadoCivil);
    this.documento = documento.replace(evaluateRegex(/\D/g), '');
    // capture the rest just after ' a '
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/), '').join();
    this.numero = numero;
    // capture the rest just after ' '
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/), '').join();
    this.estado = estado.replace(/\.$/, '');
  }
}

module.exports = Person;