declare module 'cors' {
  import type { RequestHandler } from 'express';

  interface CorsOptions {
    origin?: boolean | string | string[];
    credentials?: boolean;
  }

  function cors(options?: CorsOptions): RequestHandler;

  export default cors;
}

declare module 'jsonwebtoken' {
  interface SignOptions {
    expiresIn?: number | string;
  }

  function sign(payload: object, secret: string, options?: SignOptions): string;
  function verify(token: string, secret: string): unknown;

  const jwt: {
    sign: typeof sign;
    verify: typeof verify;
  };

  export { sign, verify };
  export default jwt;
}

declare module 'multer' {
  import type { RequestHandler } from 'express';

  interface MulterOptions {
    limits?: {
      fileSize?: number;
    };
    storage?: unknown;
  }

  interface MulterInstance {
    single(fieldName: string): RequestHandler;
  }

  function multer(options?: MulterOptions): MulterInstance;

  namespace multer {
    function memoryStorage(): unknown;
  }

  export default multer;
}

declare module 'swagger-jsdoc' {
  function swaggerJsdoc(options: unknown): unknown;

  export default swaggerJsdoc;
}

declare module 'swagger-ui-express' {
  import type { RequestHandler } from 'express';

  const swaggerUi: {
    serve: RequestHandler[];
    setup(specs: unknown): RequestHandler;
  };

  export default swaggerUi;
}
