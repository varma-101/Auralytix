import {serve} from 'inngest/nextjs';
import { inngest } from '@/lib/inngest/client';

export const { GET, POST } = serve({
  client: inngest,
  functions:[
    
  ]
})