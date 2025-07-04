import { prisma } from '@backend/prisma/client';

export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { date: 'desc' },
  });

  return Response.json(notes);
}

export async function PATCH(req: Request) {
  const { id, content } = await req.json();

  if (!id || !content) {
    return new Response('Invalid input', { status: 400 });
  }

  const updatedNote = await prisma.note.update({
    where: { id },
    data: { content },
  });

  return Response.json(updatedNote);
}

export async function POST(req: Request) {
  const { date, content } = await req.json();

  if (!date || !content) {
    return new Response('Invalid input', { status: 400 });
  }

  const newNote = await prisma.note.create({
    data: { date, content },
  });

  return Response.json(newNote);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) return new Response('ID is required', { status: 400 });

  const deleted = await prisma.note.delete({ where: { id } });
  return Response.json(deleted);
}
