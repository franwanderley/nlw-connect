import { fastifyCors } from '@fastify/cors';
import fastify from 'fastify';
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { acessInviteLink } from './routes/acess-invite-link-route';
import { getPositionRanking } from './routes/get-position-ranking-route';
import { getSubscribdeInviteClick } from './routes/get-subscribde-invite-click-route';
import { subscribdeToEventRoute } from './routes/subscribde-route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(subscribdeToEventRoute);
app.register(acessInviteLink);
app.register(getSubscribdeInviteClick);
app.register(getPositionRanking);

app.listen({ port: 3333 }).then(() => {
  console.log('server running');
});
