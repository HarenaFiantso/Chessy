import { type Request, type Response, Router } from 'express';
import pgnParser from 'pgn-parser';
import type { ParseRequestBody, Position, ReportRequestBody } from './lib/types';
import { Chess } from 'chess.js';
import { analyse } from './lib/analyse.ts';

const router = Router();

router.post('/parse', async (req: Request, res: Response): Promise<any> => {
  const { pgn }: ParseRequestBody = req.body;

  if (!pgn) {
    return res.status(400).json({ message: 'Enter a PGN to analyze.' });
  }

  let parsedPGN;
  try {
    [parsedPGN] = pgnParser.parse(pgn);
    if (!parsedPGN) {
      return res.status(400).json({ message: 'Enter a valid PGN to analyze.' });
    }
  } catch (error) {
    console.error('Parsing error:', error);
    return res.status(500).json({ message: 'Failed to parse invalid PGN.' });
  }

  const board = new Chess();
  const positions: Position[] = [{ fen: board.fen() }];

  for (const { move: moveSAN } of parsedPGN.moves) {
    try {
      const moveResult = board.move(moveSAN);

      if (!moveResult) {
        return res.status(400).json({ message: 'PGN contains illegal moves.' });
      }

      positions.push({
        fen: board.fen(),
        move: {
          san: moveSAN,
          uci: `${moveResult.from}${moveResult.to}`,
        },
      });
    } catch (error) {
      console.error('Illegal move error:', error);
      return res.status(400).json({ message: 'PGN contains illegal moves.' });
    }
  }

  return res.json({ positions });
});

router.post('/report', async (req: Request, res: Response): Promise<any> => {
  const { positions }: ReportRequestBody = req.body;

  if (!positions) {
    return res.status(400).json({ message: 'Missing positions parameter.' });
  }

  try {
    const results = await analyse(positions);
    return res.json({ results });
  } catch (err) {
    console.error('Error generating report:', err);
    return res.status(500).json({ message: 'Failed to generate report.' });
  }
});

export default router;
