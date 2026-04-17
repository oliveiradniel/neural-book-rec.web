import { AIService } from '../services/ai-service';

import { makeHttpClient } from './make-http-client';

import type { IAIService } from '../contracts/ai-service';

export function makeAiService(): IAIService {
  return new AIService(makeHttpClient());
}
