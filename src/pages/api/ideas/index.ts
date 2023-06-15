import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { ideaValidationSchema } from 'validationSchema/ideas';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getIdeas();
    case 'POST':
      return createIdea();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getIdeas() {
    const data = await prisma.idea
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'idea'));
    return res.status(200).json(data);
  }

  async function createIdea() {
    await ideaValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.collaboration?.length > 0) {
      const create_collaboration = body.collaboration;
      body.collaboration = {
        create: create_collaboration,
      };
    } else {
      delete body.collaboration;
    }
    if (body?.feedback?.length > 0) {
      const create_feedback = body.feedback;
      body.feedback = {
        create: create_feedback,
      };
    } else {
      delete body.feedback;
    }
    if (body?.task?.length > 0) {
      const create_task = body.task;
      body.task = {
        create: create_task,
      };
    } else {
      delete body.task;
    }
    const data = await prisma.idea.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
