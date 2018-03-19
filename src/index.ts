import { serve } from './server';

const port = process.env.PORT ? Number(process.env.PORT) : 80;

serve(port);
