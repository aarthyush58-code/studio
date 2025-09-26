'use server';

/**
 * @fileOverview Implements a Genkit flow to enhance product scanning with AI reasoning.
 *
 * - enhanceScanWithReasoning - A function that refines scan parameters for accurate product matching using AI.
 * - EnhanceScanInput - The input type for the enhanceScanWithReasoning function, including the initial scan result and image data.
 * - EnhanceScanOutput - The return type for the enhanceScanWithReasoning function, providing the refined product match.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceScanInputSchema = z.object({
  initialScanResult: z.string().describe('The initial product scan result, which may be inconclusive.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  productDatabase: z.string().describe('A description of the available products to choose from.'),
});
export type EnhanceScanInput = z.infer<typeof EnhanceScanInputSchema>;

const EnhanceScanOutputSchema = z.object({
  refinedProductMatch: z.string().describe('The refined product match after AI reasoning.'),
});
export type EnhanceScanOutput = z.infer<typeof EnhanceScanOutputSchema>;

export async function enhanceScanWithReasoning(input: EnhanceScanInput): Promise<EnhanceScanOutput> {
  return enhanceScanWithReasoningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceScanPrompt',
  input: {schema: EnhanceScanInputSchema},
  output: {schema: EnhanceScanOutputSchema},
  prompt: `You are an AI assistant that refines product scan results.

  The initial scan result was: {{{initialScanResult}}}.

  Here's a photo of the product: {{media url=photoDataUri}}.
  Here is a description of products that are available: {{{productDatabase}}}

  Based on the photo and the product database, provide a refined product match.  If the scan is inconclusive, use the photo and available product details to reason about the correct product.  Be as accurate as possible in the refinedProductMatch field.
  `,
});

const enhanceScanWithReasoningFlow = ai.defineFlow(
  {
    name: 'enhanceScanWithReasoningFlow',
    inputSchema: EnhanceScanInputSchema,
    outputSchema: EnhanceScanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
