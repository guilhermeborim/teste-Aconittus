export function validatePerson(person) {
  const fields = [
    { name: "name", message: "Nome é obrigatório." },
    { name: "road", message: "Rua é obrigatória." },
    { name: "number", message: "Número é obrigatório.", isNumber: true },
    { name: "neighborhood", message: "Bairro é obrigatório." },
    { name: "city", message: "Cidade é obrigatória." },
    { name: "state", message: "Estado é obrigatório." },
  ];

  for (let field of fields) {
    if (field.isNumber && typeof person[field.name] === "string") {
      return { isValid: false, message: "Apenas números." };
    }
    if (!person[field.name]) {
      return { isValid: false, message: field.message };
    }
  }

  return { isValid: true, message: "" };
}
