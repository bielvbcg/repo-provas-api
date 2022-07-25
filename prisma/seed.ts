import { prisma } from "../src/database.js"

async function main() {
  const terms = []
  const categories = []
  const teachers = []
  const disciplines = []
  const teachersDisciplines = []

  const termsList = [1, 2, 3, 4, 5, 6]
  const categoriesList = ["Projeto", "Prática", "Recuperação"]
  const teachersList = ["Diego Pinho", "Bruna Hamori"]
  const disciplinesList = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ]
  const teachersDisciplinesList = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ]

  for (let i = 0; i < termsList.length; i++) {
    terms[i] = await prisma.term.upsert({
      where: { number: termsList[i] },
      update: {},
      create: { number: termsList[i] },
    })
  }

  for (let i = 0; i < categoriesList.length; i++) {
    categories[i] = await prisma.category.upsert({
      where: { name: categoriesList[i] },
      update: {},
      create: { name: categoriesList[i] }
    })
  }

  for (let i = 0; i < teachersList.length; i++) {
    teachers[i] = await prisma.teacher.upsert({
      where: { name: teachersList[i] },
      update: {},
      create: { name: teachersList[i] }
    })
  }

  for (let i = 0; i < disciplinesList.length; i++) {
    disciplines[i] = await prisma.discipline.upsert({
      where: { name: disciplinesList[i].name },
      update: {},
      create: {
        name: disciplinesList[i].name,
        termId: disciplinesList[i].termId
      }
    })
  }

  for (let i = 0; i < teachersDisciplinesList.length; i++) {
    teachersDisciplines[i] = await prisma.teachersDisciplines.upsert({
      where: { id: i + 1 },
      update: {},
      create: {
        teacherId: teachersDisciplinesList[i].teacherId,
        disciplineId: teachersDisciplinesList[i].disciplineId
      }
    })
  }

  console.log(
    terms,
    categories,
    teachers,
    disciplines,
    teachersDisciplines
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })