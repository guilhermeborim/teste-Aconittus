import { useEffect, useRef, useState } from "react";
import { api } from "./services/api";

interface PersonProps {
  id: string;
  name: string;
  road: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
}

function App() {
  const [persons, setPersons] = useState<PersonProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const roadRef = useRef<HTMLInputElement | null>(null);
  const numberRef = useRef<HTMLInputElement | null>(null);
  const neighborhoodRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    loadPersons();
  }, []);

  async function loadPersons() {
    const response = await api.get("/");

    setPersons(response.data);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (
      !nameRef.current?.value ||
      !roadRef.current?.value ||
      !numberRef.current?.value ||
      !neighborhoodRef.current?.value ||
      !cityRef.current?.value ||
      !stateRef.current?.value
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const response = await api.post("/", {
      name: nameRef.current.value,
      road: roadRef.current.value,
      number: Number(numberRef.current.value),
      neighborhood: neighborhoodRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
    });

    setPersons((allPersons) => [...allPersons, response.data]);
  }
  async function handleDelete(id: string) {
    try {
      await api.delete(`/${id}`);

      const allPersons = persons.filter((person) => person.id !== id);
      setPersons(allPersons);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="bg-slate-500 h-screen flex flex-col items-center justify-center">
      <h1 className="font-semibold text-4xl pb-4 text-center">
        Cadastro de Usuários
      </h1>

      <section className="flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              ref={nameRef}
              placeholder="Nome"
              className="border border-gray-300 w-full p-2 rounded-md"
            />
            <input
              type="text"
              ref={roadRef}
              placeholder="Rua"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="number"
              ref={numberRef}
              placeholder="Numero"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
            <input
              type="text"
              ref={neighborhoodRef}
              placeholder="Bairro"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              ref={cityRef}
              placeholder="Cidade"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
            <input
              type="text"
              ref={stateRef}
              placeholder="Estado"
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <input
            type="submit"
            value="Cadastrar"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          />
        </form>

        <section className="flex flex-col gap-4">
          {persons.map((person) => (
            <article
              className="w-full bg-white rounded p-4 relative"
              key={person.id}
            >
              <p>
                <span className="font-medium pr-1">Nome:</span>
                {person.name}
              </p>
              <p>
                <span className="font-medium pr-1">Endereço:</span>
                {person.road}, {person.number}, {person.neighborhood},
                {person.city}, {person.state}
              </p>
              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(person.id)}
              >
                X
              </button>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
