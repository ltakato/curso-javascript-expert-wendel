// the goal of Fluent API is to execute tasks as pipeline, step by step
// finally, call "build". very similar to Builder pattern
// the difference is that here is about "processes" and Builder is about "objects construction"
class TextProcessorFluentAPI {
  // private property!
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= extract data behind this group
    // [contratante|contratada] or another one (and have a flag at end of expression to match case-insensitive)
    // :\s{1} will match a literal character of ':' followed by space
    // all below is inside parenthesis to match "everything forward"

    // (?!s) negative look around: will ignore "contratantes" at the end of document
    // .*\n match everything until first \n
    // .*? non greety: will stop matching on first recurrence, avoiding loop

    // $ to tell that search ends in line end
    // g -> global
    // m -> multiline
    // i -> insensitive

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi;

    this.#content = this.#content.match(matchPerson);

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;