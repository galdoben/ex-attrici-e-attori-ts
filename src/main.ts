// Milestone 1: Type alias Person
type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

// console.log("Type Person creato!");

async function fetchActors(): Promise<Person[]> {
  try {
    const response = await fetch('http://localhost:3333/actors');
    const data: Person[] = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nel fetch:', error);
    return [];
  }
}
// Funzione principale
async function main(): Promise<void> {
  const actors = await fetchActors();
  console.log('Attori ricevuti:', actors);
}
main();