'use server';

/**
 * @fileOverview Implements a Genkit flow to find a product by its ID.
 *
 * - findProductById - A function that finds a product from the database string using its ID.
 * - FindProductByIdInput - The input type for the findProductById function.
 * - FindProductByIdOutput - The return type for the findProductById function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindProductByIdInputSchema = z.object({
  productId: z.string().describe('The ID of the product to find.'),
  productDatabase: z.string().describe('A JSON string of available products.'),
});
export type FindProductByIdInput = z.infer<typeof FindProductByIdInputSchema>;

const FindProductByIdOutputSchema = z.object({
  productName: z.string().describe('The name of the found product.'),
});
export type FindProductByIdOutput = z.infer<typeof FindProductByIdOutputSchema>;

export async function findProductById(input: FindProductByIdInput): Promise<FindProductByIdOutput> {
  return findProductByIdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findProductByIdPrompt',
  input: {schema: FindProductByIdInputSchema},
  output: {schema: FindProductByIdOutputSchema},
  prompt: `You are an AI assistant that finds a product by its ID from a product database.

  The product ID to find is: {{{productId}}}.
  
  Here is the product database: {{{productDatabase}}}

  Find the product with the given ID and return its name in the productName field.
  `,
});

const findProductByIdFlow = ai.defineFlow(
  {
    name: 'findProductByIdFlow',
    inputSchema: FindProductByIdInputSchema,
    outputSchema: FindProductByIdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
