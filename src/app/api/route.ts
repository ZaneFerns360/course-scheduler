export const revalidate = 60;

const teachers = [
  { id: 1, name: "Alice Johnson", courseName: "Math" },
  { id: 2, name: "Bob Smith", courseName: "Math" },
  { id: 3, name: "Carol Williams", courseName: "Math" },
  { id: 4, name: "David Brown", courseName: "Science" },
  { id: 5, name: "Eve Davis", courseName: "Science" },
  { id: 6, name: "Frank Wilson", courseName: "Science" },
  { id: 7, name: "Grace Miller", courseName: "English" },
  { id: 8, name: "Henry Taylor", courseName: "English" },
  { id: 9, name: "Ivy Anderson", courseName: "English" },
  { id: 10, name: "Jack Thomas", courseName: "History" },
  { id: 11, name: "Karen Martinez", courseName: "History" },
  { id: 12, name: "Leo Jackson", courseName: "History" },
  { id: 13, name: "Mona White", courseName: "Workshop" },
  { id: 14, name: "Nathan Harris", courseName: "Workshop" },
  { id: 15, name: "Olivia Clark", courseName: "Workshop" },
  { id: 16, name: "Paul Lewis", courseName: "Extracurricular" },
  { id: 17, name: "Quincy Robinson", courseName: "Extracurricular" },
  { id: 18, name: "Rachel Walker", courseName: "Extracurricular" },
];

export async function GET() {
  return new Response(JSON.stringify(teachers), {
    status: 200,
  });
}
