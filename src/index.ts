import { serve } from './server';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

serve(port);
