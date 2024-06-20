/**
 * Validate person data.
 * @param {Object} person
 * @param {string} person.name
 * @param {string} person.road
 * @param {number} person.number
 * @param {string} person.neighborhood
 * @param {string} person.city
 * @param {string} person.state
 * @returns {Object} { isValid: boolean, message: string }
 */
export function validatePerson(person) {
  if (!person.name) return { isValid: false, message: "Nome é obrigatório." };
  if (!person.road) return { isValid: false, message: "Rua é obrigatória." };
  if (typeof person.number === "string") {
    return { isValid: false, message: "Apenas números." };
  } else if (!person.number) {
    return { isValid: false, message: "Número é obrigatório." };
  }
  if (!person.neighborhood)
    return { isValid: false, message: "Bairro é obrigatório." };
  if (!person.city) return { isValid: false, message: "Cidade é obrigatória." };
  if (!person.state)
    return { isValid: false, message: "Estado é obrigatório." };
  return { isValid: true, message: "" };
}
