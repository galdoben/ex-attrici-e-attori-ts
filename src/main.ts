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



// async function fetchActors(): Promise<Person[]> {
//   try {
//     const response = await fetch('http://localhost:3333/actors');
//     const data: Person[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Errore nel fetch:', error);
//     return [];
//   }
// }
// // Funzione principale
// async function main(): Promise<void> {
//   const actors = await fetchActors();
//   console.log('Attori ricevuti:', actors);
// }
// main();

// Milestone 2: Type alias Actress che estende Person
type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: "American" | "British" | "Australian" | "Israeli-American" |
  "South African" | "French" | "Indian" | "Israeli" |
  "Spanish" | "South Korean" | "Chinese";
};

// Funzione per fetchare attrici dal server API
// async function fetchActresses(): Promise<Actress[]> {
//   try {
//     const response = await fetch('http://localhost:3333/actresses');
//     const data: Actress[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Errore nel fetch delle attrici:', error);
//     return [];
//   }
// }

// // Funzione principale
// async function main(): Promise<void> {
//   const actresses = await fetchActresses();
//   console.log('Attrici ricevute:', actresses);
// }

// main();



// Type guard per verificare se un oggetto è una Actress
function isActress(obj: unknown): obj is Actress {
  if (!obj || typeof obj !== 'object') return false;

  const candidate = obj as Record<string, unknown>;

  return typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    typeof candidate.birth_year === 'number' &&
    (candidate.death_year === undefined || typeof candidate.death_year === 'number') &&
    Array.isArray(candidate.most_famous_movies) &&
    candidate.most_famous_movies.length === 3 &&
    typeof candidate.nationality === 'string';
}

// Funzione per ottenere una singola attrice per ID
async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();

    if (isActress(data)) {
      return data;
    } else {
      console.error('Dati ricevuti non sono una Actress valida:', data);
      return null;
    }
  } catch (error) {
    console.error('Errore nel fetch dell\'attrice:', error);
    return null;
  }
}
// Funzione principale
// async function main(): Promise<void> {
//   const actress = await getActress(23);
//   console.log('Attrice con ID 23:', actress);
// }

// main()

// Funzione per ottenere tutte le attrici
// async function getAllActresses(): Promise<Actress[]> {
//   try {
//     const response = await fetch('http://localhost:3333/actresses');
//     if (!response.ok) {
//       return [];
//     }
//     const data = await response.json();

//     if (Array.isArray(data)) {
//       return data.filter(isActress);
//     } else {
//       console.error('Risposta non è un array:', data);
//       return [];
//     }
//   } catch (error) {
//     console.error('Errore nel fetch di tutte le attrici:', error);
//     return [];
//   }
// }
// Funzione principale
// async function main(): Promise<void> {
//   const actresses = await getAllActresses();
//   console.log('Tutte le attrici:', actresses);
// }

// main();

// Funzione per ottenere multiple attrici in parallelo
async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Errore nel fetch di multiple attrici:', error);
    return [];
  }
}

// Funzione principale
async function main(): Promise<void> {
  const actressIds = [1, 3, 5, 999]; // 999 non esiste per testare null
  const actresses = await getActresses(actressIds);
  console.log('Attrici con IDs [1, 3, 5, 999]:', actresses);
}
main()
