import express, { type Express, type NextFunction, type Request, type Response } from 'express';

const app: Express = express();

const port = process.env.PORT ?? 8080;

app.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      message: 'Hurray!! we create our first server on bun js',
      success: true,
    });
  } catch (error: unknown) {
    next(new Error((error as Error).message));
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
