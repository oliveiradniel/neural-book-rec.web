import { AIService } from '../services/ai-service';

import { makeHttpClient } from './make-http-client';

import type { IAIService } from '../contracts/ai-service';

export function makeAIService(): IAIService {
  return new AIService(makeHttpClient());
}
